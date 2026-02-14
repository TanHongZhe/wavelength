
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Delete rooms not updated in the last 6 hours
export const cleanupOldRooms = mutation({
    args: {},
    handler: async (ctx) => {
        const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;

        // Scan all rooms
        // Note: For large datasets, this should be paginated or indexed by updated_at
        // But for this scale, a full scan is accepted for now.
        const allRooms = await ctx.db.query("rooms").collect();

        let deletedRooms = 0;
        let deletedPlayers = 0;

        for (const room of allRooms) {
            const lastActive = room.updated_at ?? room._creationTime;

            if (lastActive < sixHoursAgo) {
                // Delete associated party players
                const players = await ctx.db
                    .query("party_players")
                    .withIndex("by_room", (q) => q.eq("room_id", room._id))
                    .collect();

                for (const player of players) {
                    await ctx.db.delete(player._id);
                    deletedPlayers++;
                }

                // Delete the room
                await ctx.db.delete(room._id);
                deletedRooms++;
            }
        }

        console.log(`Cleanup complete: Deleted ${deletedRooms} rooms and ${deletedPlayers} players.`);
    },
});
