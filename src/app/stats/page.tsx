"use client";

import { useConvex } from "convex/react";
import { api } from "convex/_generated/api";
import { useState, useEffect } from "react";
import { Loader2, BarChart3, TrendingUp, Gamepad2, Users, Lock, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StatsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [days, setDays] = useState(7);
    const convex = useConvex();
    const [stats, setStats] = useState<any[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStats = async () => {
        setIsLoading(true);
        const data = await convex.query(api.stats.getDailyStats, { days });
        setStats(data);
        setIsLoading(false);
    };

    // Initial fetch on mount or days change
    useEffect(() => {
        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated, days]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "20060407Hz") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-md space-y-4 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Admin Only</h1>
                    <p className="text-muted-foreground">Please enter the password to view stats.</p>
                    <form onSubmit={handleLogin} className="flex gap-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit">
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    // Compute totals
    const totals = stats?.reduce(
        (acc, row) => ({
            games_played: acc.games_played + row.games_played,
            rooms_open: acc.rooms_open + row.rooms_open,
            total_rounds: acc.total_rounds + row.total_rounds,
            classic_rounds: acc.classic_rounds + row.classic_rounds,
            party_rounds: acc.party_rounds + row.party_rounds,
            green_flag_rounds: acc.green_flag_rounds + row.green_flag_rounds,
            this_or_that_rounds: acc.this_or_that_rounds + row.this_or_that_rounds,
            fantasy_slider_rounds: acc.fantasy_slider_rounds + row.fantasy_slider_rounds,
            whos_most_likely_rounds: acc.whos_most_likely_rounds + row.whos_most_likely_rounds,
            general_knowledge_rounds: acc.general_knowledge_rounds + row.general_knowledge_rounds,
        }),
        {
            games_played: 0,
            rooms_open: 0,
            total_rounds: 0,
            classic_rounds: 0,
            party_rounds: 0,
            green_flag_rounds: 0,
            this_or_that_rounds: 0,
            fantasy_slider_rounds: 0,
            whos_most_likely_rounds: 0,
            general_knowledge_rounds: 0,
        }
    );

    const totalConversion =
        totals && totals.rooms_open > 0
            ? Math.round((totals.games_played / totals.rooms_open) * 10000) / 100
            : 0;

    return (
        <div className="min-h-screen bg-background p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-primary flex items-center gap-3">
                            <BarChart3 className="w-8 h-8" />
                            Game Stats
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Daily breakdown of game activity
                        </p>
                    </div>

                    {/* Day Selector */}
                    <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1">
                        {[7, 14, 30].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDays(d)}
                                className={`px-4 py-2 rounded-lg font-display font-semibold text-sm transition-all cursor-pointer ${days === d
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-primary hover:bg-secondary"
                                    }`}
                            >
                                {d}d
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary Cards */}
                {totals && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-card border border-border rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                <Gamepad2 className="w-4 h-4" />
                                Games Played
                            </div>
                            <div className="font-display text-3xl font-bold text-primary">
                                {totals.games_played}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                <Users className="w-4 h-4" />
                                Rooms Opened
                            </div>
                            <div className="font-display text-3xl font-bold text-primary">
                                {totals.rooms_open}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                <TrendingUp className="w-4 h-4" />
                                Conversion
                            </div>
                            <div className="font-display text-3xl font-bold text-primary">
                                {totalConversion}%
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                <BarChart3 className="w-4 h-4" />
                                Total Rounds
                            </div>
                            <div className="font-display text-3xl font-bold text-primary">
                                {totals.total_rounds}
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {(stats === undefined && isLoading) && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                )}

                {/* Table */}
                {stats && (
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-secondary/50">
                                        <th className="text-left px-4 py-3 font-display font-bold text-primary">Date</th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-primary">Played</th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-primary">Opened</th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-primary">Conv %</th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-primary">Rounds</th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-wedge-teal">
                                            <span className="hidden sm:inline">Classic</span>
                                            <span className="sm:hidden">🎯</span>
                                        </th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-wedge-orange">
                                            <span className="hidden sm:inline">Party</span>
                                            <span className="sm:hidden">🎉</span>
                                        </th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-green-500">
                                            <span className="hidden sm:inline">Flag</span>
                                            <span className="sm:hidden">🚩</span>
                                        </th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-purple-400">
                                            <span className="hidden sm:inline">Rapid</span>
                                            <span className="sm:hidden">⚡</span>
                                        </th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-blue-400">
                                            <span className="hidden sm:inline">Fantasy</span>
                                            <span className="sm:hidden">🧚</span>
                                        </th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-pink-400">
                                            <span className="hidden sm:inline">Likely</span>
                                            <span className="sm:hidden">🤔</span>
                                        </th>
                                        <th className="text-right px-4 py-3 font-display font-bold text-yellow-500">
                                            <span className="hidden sm:inline">Trivia</span>
                                            <span className="sm:hidden">💡</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.map((row, i) => {
                                        const isToday = i === 0;
                                        const hasData = row.total_rounds > 0;
                                        return (
                                            <tr
                                                key={row.stat_date}
                                                className={`border-b border-border/50 last:border-0 transition-colors ${isToday ? "bg-primary/5" : "hover:bg-secondary/30"
                                                    }`}
                                            >
                                                <td className="px-4 py-3 font-mono text-primary whitespace-nowrap">
                                                    {row.stat_date}
                                                    {isToday && (
                                                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-display font-bold">
                                                            Today
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono font-bold">
                                                    {row.games_played}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-muted-foreground">
                                                    {row.rooms_open}
                                                </td>
                                                <td className={`text-right px-4 py-3 font-mono font-bold ${row.conversion_rate >= 50
                                                    ? "text-wedge-teal"
                                                    : row.conversion_rate > 0
                                                        ? "text-wedge-orange"
                                                        : "text-muted-foreground"
                                                    }`}>
                                                    {row.conversion_rate}%
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono font-bold text-primary">
                                                    {row.total_rounds}
                                                </td>

                                                {/* Game mode columns: show rounds (pct) */}
                                                <td className="text-right px-4 py-3 font-mono text-wedge-teal">
                                                    {hasData ? (
                                                        <span>
                                                            {row.classic_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.classic_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-wedge-orange">
                                                    {hasData ? (
                                                        <span>
                                                            {row.party_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.party_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-green-500">
                                                    {hasData ? (
                                                        <span>
                                                            {row.green_flag_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.green_flag_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-purple-400">
                                                    {hasData ? (
                                                        <span>
                                                            {row.this_or_that_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.this_or_that_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-blue-400">
                                                    {hasData ? (
                                                        <span>
                                                            {row.fantasy_slider_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.fantasy_slider_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-pink-400">
                                                    {hasData ? (
                                                        <span>
                                                            {row.whos_most_likely_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.whos_most_likely_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="text-right px-4 py-3 font-mono text-yellow-500">
                                                    {hasData ? (
                                                        <span>
                                                            {row.general_knowledge_rounds}
                                                            <span className="text-xs text-muted-foreground ml-1">
                                                                ({row.general_knowledge_pct}%)
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                                {/* Totals Row */}
                                {totals && (
                                    <tfoot>
                                        <tr className="bg-secondary/50 border-t-2 border-border font-bold">
                                            <td className="px-4 py-3 font-display text-primary">TOTAL</td>
                                            <td className="text-right px-4 py-3 font-mono">{totals.games_played}</td>
                                            <td className="text-right px-4 py-3 font-mono text-muted-foreground">{totals.rooms_open}</td>
                                            <td className={`text-right px-4 py-3 font-mono ${totalConversion >= 50 ? "text-wedge-teal" : "text-wedge-orange"
                                                }`}>{totalConversion}%</td>
                                            <td className="text-right px-4 py-3 font-mono text-primary">{totals.total_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-wedge-teal">{totals.classic_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-wedge-orange">{totals.party_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-green-500">{totals.green_flag_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-purple-400">{totals.this_or_that_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-blue-400">{totals.fantasy_slider_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-pink-400">{totals.whos_most_likely_rounds}</td>
                                            <td className="text-right px-4 py-3 font-mono text-yellow-500">{totals.general_knowledge_rounds}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <Button
                        variant="outline"
                        onClick={fetchStats}
                        disabled={isLoading}
                        className="gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <RefreshCw className="w-4 h-4" />
                        )}
                        Refresh Stats
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                    Stats based on room creation time • Click refresh to update
                </p>
            </div>
        </div>
    );
}
