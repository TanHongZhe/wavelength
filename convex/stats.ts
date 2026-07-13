import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get game statistics grouped by date.
 * Equivalent to the old Supabase SQL stats query.
 *
 * Since Convex has no `updated_at`, we use `_creationTime` instead.
 * If you need update-time-based grouping, you can add an `updated_at`
 * field to the schema and update it in the `updateRoom` mutation.
 *
 * Run from the Convex Dashboard → Functions → stats:getDailyStats
 */
export const getDailyStats = query({
    args: {
        days: v.optional(v.number()), // default: 7. Pass 0 for all-time.
        all: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const isAll = args.all === true || args.days === 0;
        const days = args.days ?? 7;

        // Fetch all rooms
        // Note: This fetches renamed "archived" rooms too, preserving stats!
        const allRooms = await ctx.db.query("rooms").collect();

        let rooms;
        let rangeDays;
        if (isAll) {
            rooms = allRooms;
            if (rooms.length === 0) {
                rangeDays = 1;
            } else {
                const earliest = Math.min(...rooms.map((r) => r._creationTime));
                const earliestDate = new Date(earliest).toISOString().split("T")[0];
                const todayDate = new Date().toISOString().split("T")[0];
                const msPerDay = 24 * 60 * 60 * 1000;
                rangeDays = Math.floor(
                    (Date.parse(todayDate) - Date.parse(earliestDate)) / msPerDay
                ) + 1;
            }
        } else {
            const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
            rooms = allRooms.filter((r) => r._creationTime >= cutoff);
            rangeDays = days;
        }

        // Group by date (YYYY-MM-DD)
        const byDate: Record<
            string,
            {
                rooms: typeof rooms;
            }
        > = {};

        for (const room of rooms) {
            const date = new Date(room._creationTime).toISOString().split("T")[0];
            if (!byDate[date]) {
                byDate[date] = { rooms: [] };
            }
            byDate[date].rooms.push(room);
        }

        // Compute stats per day
        const statsMap = new Map<string, {
            stat_date: string;
            games_played: number;
            rooms_open: number;
            conversion_rate: number;
            total_rounds: number;
            classic_pct: number;
            party_pct: number;
            green_flag_pct: number;
            this_or_that_pct: number;
            fantasy_slider_pct: number;
            whos_most_likely_pct: number;
            general_knowledge_pct: number;
            classic_rounds: number;
            party_rounds: number;
            green_flag_rounds: number;
            this_or_that_rounds: number;
            fantasy_slider_rounds: number;
            whos_most_likely_rounds: number;
            general_knowledge_rounds: number;
        }>();

        for (const [date, { rooms: dayRooms }] of Object.entries(byDate)) {
            const roomCodes = new Set(dayRooms.map((r) => r.room_code));
            const playedCodes = new Set(
                dayRooms
                    .filter((r) => (r.round_number ?? 0) > 1)
                    .map((r) => r.room_code)
            );

            const roomsOpen = roomCodes.size;
            const gamesPlayed = playedCodes.size;
            const conversionRate =
                roomsOpen > 0
                    ? Math.round((gamesPlayed / roomsOpen) * 10000) / 100
                    : 0;

            const totalRounds = dayRooms.reduce(
                (sum, r) => sum + (r.round_number ?? 0),
                0
            );

            const classicRounds = dayRooms
                .filter((r) => r.game_mode === "classic")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);
            const partyRounds = dayRooms
                .filter((r) => r.game_mode === "party")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);
            const greenFlagRounds = dayRooms
                .filter((r) => r.game_mode === "mini_flag_game")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);
            const thisOrThatRounds = dayRooms
                .filter((r) => r.game_mode === "mini_rapid_fire")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);
            const fantasySliderRounds = dayRooms
                .filter((r) => r.game_mode === "mini_fantasy_slider")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);
            const whosMostLikelyRounds = dayRooms
                .filter((r) => r.game_mode === "mini_whos_most_likely")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);
            const generalKnowledgeRounds = dayRooms
                .filter((r) => r.game_mode === "mini_general_knowledge")
                .reduce((sum, r) => sum + (r.round_number ?? 0), 0);

            const pct = (n: number) =>
                totalRounds > 0
                    ? Math.round((n / totalRounds) * 10000) / 100
                    : 0;

            statsMap.set(date, {
                stat_date: date,
                games_played: gamesPlayed,
                rooms_open: roomsOpen,
                conversion_rate: conversionRate,
                total_rounds: totalRounds,
                classic_pct: pct(classicRounds),
                party_pct: pct(partyRounds),
                green_flag_pct: pct(greenFlagRounds),
                this_or_that_pct: pct(thisOrThatRounds),
                fantasy_slider_pct: pct(fantasySliderRounds),
                whos_most_likely_pct: pct(whosMostLikelyRounds),
                general_knowledge_pct: pct(generalKnowledgeRounds),
                classic_rounds: classicRounds,
                party_rounds: partyRounds,
                green_flag_rounds: greenFlagRounds,
                this_or_that_rounds: thisOrThatRounds,
                fantasy_slider_rounds: fantasySliderRounds,
                whos_most_likely_rounds: whosMostLikelyRounds,
                general_knowledge_rounds: generalKnowledgeRounds,
            });
        }

        // Fill in missing days so every day in the range appears
        const result = [];
        for (let i = 0; i < rangeDays; i++) {
            const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            const dateStr = d.toISOString().split("T")[0];
            result.push(
                statsMap.get(dateStr) ?? {
                    stat_date: dateStr,
                    games_played: 0,
                    rooms_open: 0,
                    conversion_rate: 0,
                    total_rounds: 0,
                    classic_pct: 0,
                    party_pct: 0,
                    green_flag_pct: 0,
                    this_or_that_pct: 0,
                    fantasy_slider_pct: 0,
                    whos_most_likely_pct: 0,
                    general_knowledge_pct: 0,
                    classic_rounds: 0,
                    party_rounds: 0,
                    green_flag_rounds: 0,
                    this_or_that_rounds: 0,
                    fantasy_slider_rounds: 0,
                    whos_most_likely_rounds: 0,
                    general_knowledge_rounds: 0,
                }
            );
        }

        return result; // Already sorted DESC (today first)
    },
});

/**
 * Get game statistics grouped by calendar month (YYYY-MM).
 * Used for month-over-month comparison, not rolling windows.
 */
export const getMonthlyStats = query({
    args: {},
    handler: async (ctx) => {
        const allRooms = await ctx.db.query("rooms").collect();

        // Group by month key (YYYY-MM)
        const byMonth: Record<string, typeof allRooms> = {};
        for (const room of allRooms) {
            const monthKey = new Date(room._creationTime)
                .toISOString()
                .slice(0, 7);
            if (!byMonth[monthKey]) byMonth[monthKey] = [];
            byMonth[monthKey].push(room);
        }

        const rows = Object.entries(byMonth).map(([monthKey, monthRooms]) => {
            const roomCodes = new Set(monthRooms.map((r) => r.room_code));
            const playedCodes = new Set(
                monthRooms
                    .filter((r) => (r.round_number ?? 0) > 1)
                    .map((r) => r.room_code)
            );

            const roomsOpen = roomCodes.size;
            const gamesPlayed = playedCodes.size;
            const conversionRate =
                roomsOpen > 0
                    ? Math.round((gamesPlayed / roomsOpen) * 10000) / 100
                    : 0;

            const roundsBy = (mode: string) =>
                monthRooms
                    .filter((r) => r.game_mode === mode)
                    .reduce((sum, r) => sum + (r.round_number ?? 0), 0);

            const totalRounds = monthRooms.reduce(
                (sum, r) => sum + (r.round_number ?? 0),
                0
            );
            const classicRounds = roundsBy("classic");
            const partyRounds = roundsBy("party");
            const greenFlagRounds = roundsBy("mini_flag_game");
            const thisOrThatRounds = roundsBy("mini_rapid_fire");
            const fantasySliderRounds = roundsBy("mini_fantasy_slider");
            const whosMostLikelyRounds = roundsBy("mini_whos_most_likely");
            const generalKnowledgeRounds = roundsBy("mini_general_knowledge");

            const pct = (n: number) =>
                totalRounds > 0
                    ? Math.round((n / totalRounds) * 10000) / 100
                    : 0;

            return {
                month: monthKey, // e.g. "2026-07"
                games_played: gamesPlayed,
                rooms_open: roomsOpen,
                conversion_rate: conversionRate,
                total_rounds: totalRounds,
                classic_rounds: classicRounds,
                party_rounds: partyRounds,
                green_flag_rounds: greenFlagRounds,
                this_or_that_rounds: thisOrThatRounds,
                fantasy_slider_rounds: fantasySliderRounds,
                whos_most_likely_rounds: whosMostLikelyRounds,
                general_knowledge_rounds: generalKnowledgeRounds,
                classic_pct: pct(classicRounds),
                party_pct: pct(partyRounds),
                green_flag_pct: pct(greenFlagRounds),
                this_or_that_pct: pct(thisOrThatRounds),
                fantasy_slider_pct: pct(fantasySliderRounds),
                whos_most_likely_pct: pct(whosMostLikelyRounds),
                general_knowledge_pct: pct(generalKnowledgeRounds),
            };
        });

        // Sort DESC (most recent month first)
        rows.sort((a, b) => (a.month < b.month ? 1 : -1));
        return rows;
    },
});
