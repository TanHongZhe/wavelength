import Link from "next/link";

const GAMES = [
    {
        href: "/",
        emoji: "🌊",
        title: "Wavelength",
        desc: "The original mind-reading game."
    },
    {
        href: "/games/fantasy-slider",
        emoji: "🎚️",
        title: "Fantasy Slider",
        desc: "Rate spicy fantasies 0-10."
    },
    {
        href: "/games/whos-most-likely",
        emoji: "👈",
        title: "Who's Most Likely",
        desc: "Point fingers at your partner."
    },
    {
        href: "/games/this-or-that",
        emoji: "⚡",
        title: "Rapid Fire: This or That",
        desc: "Rapid fire choices."
    },
    {
        href: "/games/flag-game",
        emoji: "🚩",
        title: "Rapid Fire: Red Flag",
        desc: "Red, Green, or Beige?"
    },
    {
        href: "/games/general-knowledge",
        emoji: "🎓",
        title: "Rapid Fire: General Knowledge",
        desc: "Trivia quiz for geniuses."
    }
];

export function MoreGamesSidebar({ currentGame }: { currentGame: string }) {
    // Basic normalization to ensure we match correctly
    const currentPath = currentGame.endsWith('/') ? currentGame.slice(0, -1) : currentGame;
    const gamesToShow = GAMES.filter(g => g.href !== currentPath);

    return (
        <div className="bg-card border border-border/50 rounded-2xl p-6 sticky top-24 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.25)] transition-shadow duration-300">
            <h3 className="font-bold text-lg mb-4 text-foreground">More Mini Games</h3>
            <div className="space-y-3">
                {gamesToShow.map((game) => (
                    <Link
                        key={game.href}
                        href={game.href}
                        className="block p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{game.emoji}</span>
                            <div>
                                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                    {game.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {game.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
