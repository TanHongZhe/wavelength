"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AudioWaveform, Users, Sparkles, ChevronDown, Gamepad2, PartyPopper, Lock, SlidersVertical, Zap, Flag, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { DECK_INFO, DeckType } from "@/lib/gameData";

interface LandingScreenProps {
    onCreateGame: (mode: "classic" | "party", name: string, avatar: string, deckType: DeckType, maxRounds: number) => void;
    onJoinGame: (code: string, name: string, avatar: string) => void;
    isLoading: boolean;
    error: string | null;
}

// 17 animal avatars
const AVATARS = ["🐼", "🐯", "🐶", "🐱", "🐷", "🐰", "🦊", "🐻", "🐨", "🦁", "🐮", "🐵", "🐸", "🦄", "🐧", "🐳", "🦉"];
const INITIAL_AVATAR_COUNT = 5;

// Game Definitions
const GAMES = [
    {
        id: "wavelength",
        name: "Wavelength",
        description: "Signature telepathic game",
        players: "2-6 players",
        icon: AudioWaveform,
        style: "bg-gradient-to-br from-wedge-teal to-wedge-orange text-white",
        iconStyle: "text-white",
        isMultiplayer: true,
        isTwoPlayer: true,
        action: "mode",
        path: "",
        tags: [
            { label: "18+ Mode Available", emoji: "🔞", style: "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-sm" }
        ]
    },
    {
        id: "fantasy-slider",
        name: "Fantasy Slider",
        description: "Rate your interest in various fantasies on a scale of 0-10.",
        players: "2 players",
        icon: SlidersVertical,
        style: "bg-gradient-to-br from-blue-400/20 to-cyan-400/20 text-cyan-500 group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:text-white",
        iconStyle: "",
        isMultiplayer: false,
        isTwoPlayer: true,
        action: "navigate",
        path: "/games/fantasy-slider",
        tags: [
            { label: "New", emoji: "✨", style: "bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-sm" },
            { label: "18+ Mode Available", emoji: "🔞", style: "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-sm" }
        ]
    },
    {
        id: "whos-most-likely",
        name: "Who's Most Likely?",
        description: "Point fingers! Who is most likely to do what? 10s to decide.",
        players: "2 players",
        icon: Users,
        style: "bg-gradient-to-br from-purple-400/20 to-pink-400/20 text-pink-500 group-hover:from-purple-400 group-hover:to-pink-400 group-hover:text-white",
        iconStyle: "",
        isMultiplayer: false,
        isTwoPlayer: true,
        action: "navigate",
        path: "/games/whos-most-likely",
        tags: [
            { label: "New", emoji: "✨", style: "bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-sm" },
            { label: "Rapid Fire", emoji: "🔥", style: "bg-orange-500/10 text-orange-600 border-orange-500/20 shadow-sm" },
            { label: "18+ Mode Available", emoji: "🔞", style: "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-sm" }
        ]
    },
    {
        id: "this-or-that",
        name: "This or That",
        description: "10 seconds to choose between two options. Are you in sync?",
        players: "2 players",
        icon: Zap,
        style: "bg-gradient-to-br from-yellow-400/20 to-orange-400/20 text-orange-500 group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:text-white",
        iconStyle: "",
        isMultiplayer: false,
        isTwoPlayer: true,
        action: "navigate",
        path: "/games/this-or-that",
        tags: [
            { label: "Rapid Fire", emoji: "🔥", style: "bg-orange-500/10 text-orange-600 border-orange-500/20 shadow-sm" },
            { label: "18+ Mode Available", emoji: "🔞", style: "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-sm" }
        ]
    },
    {
        id: "flag-game",
        name: "Red, Green, Beige",
        description: "Rate dating behaviors as red, green, or beige flags.",
        players: "2 players",
        icon: Flag,
        style: "bg-gradient-to-br from-red-400/20 to-green-400/20 text-red-500 group-hover:from-red-400 group-hover:to-green-400 group-hover:text-white",
        iconStyle: "",
        isMultiplayer: false,
        isTwoPlayer: true,
        action: "navigate",
        path: "/games/flag-game",
        tags: [
            { label: "Rapid Fire", emoji: "🔥", style: "bg-orange-500/10 text-orange-600 border-orange-500/20 shadow-sm" }
        ]
    },
    {
        id: "general-knowledge",
        name: "General Knowledge",
        description: "Test your smarts across 8 topics. 10s to answer!",
        players: "2-6 players",
        icon: GraduationCap,
        style: "bg-gradient-to-br from-blue-400/20 to-indigo-400/20 text-indigo-500 group-hover:from-blue-400 group-hover:to-indigo-400 group-hover:text-white",
        iconStyle: "",
        isMultiplayer: true,
        isTwoPlayer: true,
        action: "navigate",
        path: "/games/general-knowledge",
        tags: [
            { label: "Rapid Fire", emoji: "🔥", style: "bg-orange-500/10 text-orange-600 border-orange-500/20 shadow-sm" }
        ]
    }
];

export function LandingScreen({ onCreateGame, onJoinGame, isLoading, error }: LandingScreenProps) {
    const router = useRouter();
    const myUser = useQuery(api.rooms.getMyUser);
    const isPro = myUser?.isPro ?? false;

    const [roomCode, setRoomCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [selectedDeck, setSelectedDeck] = useState<DeckType>("fun");
    const [selectedRounds, setSelectedRounds] = useState(4);
    const [mode, setMode] = useState<"initial" | "wavelength" | "create" | "join">("initial");
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

    // Filter State: "2P" -> 2 Players (Everything), "MP" -> Multiplayer (Subset)
    const [filter, setFilter] = useState<"2P" | "MP">("2P");

    // Auto-fill room code from URL
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const codeParam = params.get("code");
            if (codeParam && codeParam !== roomCode) {
                setRoomCode(codeParam);
                setMode("join");
            }
        }
    }, []);

    const filteredGames = GAMES.filter(game => {
        if (filter === "2P") return true; // Show all games for 2 Players
        if (filter === "MP") return game.isMultiplayer; // Show only multiplayer games
        return true;
    });

    const handleGameClick = (game: typeof GAMES[0]) => {
        if (game.action === "mode") {
            setMode("wavelength");
        } else if (game.action === "navigate") {
            router.push(game.path);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-24 pb-12 px-6 sm:py-24 bg-background text-foreground transition-colors duration-300">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-wedge-teal/20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-wedge-orange/20 blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Logo & Title */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
            >
                <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-6"
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        default: { type: "spring", stiffness: 400 }
                    }}
                >
                    <AudioWaveform className="w-10 h-10 text-primary-foreground" />
                </motion.div>

                <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                    Wavelength
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                    Are you on the same wavelength?
                </p>
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-md"
            >
                {mode === "initial" ? (
                    <div className="space-y-4">
                        {/* Filter Toggle */}
                        <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50 mb-4">
                            <button
                                onClick={() => setFilter("2P")}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${filter === "2P"
                                    ? "bg-background shadow-sm text-primary"
                                    : "text-muted-foreground hover:text-primary"
                                    }`}
                            >
                                2 Players
                            </button>
                            <button
                                onClick={() => setFilter("MP")}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${filter === "MP"
                                    ? "bg-background shadow-sm text-primary"
                                    : "text-muted-foreground hover:text-primary"
                                    }`}
                            >
                                Multiplayer
                            </button>
                        </div>

                        {/* Games List */}
                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {filteredGames.map((game) => (
                                    <motion.button
                                        key={game.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                                        onClick={() => handleGameClick(game)}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl transition-all ${game.style}`}>
                                                <game.icon className={`w-6 h-6 ${game.iconStyle}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-display text-lg font-semibold text-primary mb-1">
                                                    {game.name}
                                                </h3>
                                                <div className="flex items-center flex-wrap gap-2 mb-1">
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary text-primary border border-border">
                                                        {game.players}
                                                    </span>
                                                    {game.tags?.map((tag, i) => (
                                                        <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${tag.style}`}>
                                                            <span>{tag.emoji}</span>
                                                            <span>{tag.label}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-snug">
                                                    {game.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : mode === "wavelength" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-3"
                    >
                        <motion.button
                            className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                            onClick={() => setMode("create")}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-wedge-teal/20 text-wedge-teal group-hover:bg-wedge-teal group-hover:text-white transition-colors">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                        Create Room
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Start a new game (Classic or Party)
                                    </p>
                                </div>
                            </div>
                        </motion.button>

                        <motion.button
                            className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                            onClick={() => setMode("join")}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-wedge-orange/20 text-wedge-orange group-hover:bg-wedge-orange group-hover:text-white transition-colors">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                        Join Room
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Enter a room code to join
                                    </p>
                                </div>
                            </div>
                        </motion.button>

                        <Button
                            variant="ghost"
                            className="w-full text-muted-foreground"
                            onClick={() => setMode("initial")}
                        >
                            Back
                        </Button>
                    </motion.div>
                ) : mode === "create" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="game-card"
                    >
                        <h3 className="font-display text-xl font-semibold text-primary mb-4">
                            Create New Room
                        </h3>



                        <div className="flex gap-2 mb-4">
                            <Input
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Your name"
                                maxLength={20}
                                className="text-lg h-12 bg-secondary border-2 border-primary/20 focus:border-primary flex-1"
                                autoFocus
                            />
                            <div className="flex items-center justify-center bg-secondary border-2 border-primary/20 rounded-md w-12 h-12 text-2xl">
                                {selectedAvatar}
                            </div>
                        </div>

                        {/* Avatar Picker */}
                        <div className="flex flex-col items-center gap-2 mb-6">
                            <div className="flex gap-2 justify-center items-center">
                                {AVATARS.slice(0, INITIAL_AVATAR_COUNT).map((avatar) => (
                                    <button
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={`w-10 h-10 text-2xl rounded-full transition-transform hover:scale-110 ${selectedAvatar === avatar
                                            ? "bg-primary/20 ring-2 ring-primary scale-110"
                                            : "bg-secondary hover:bg-secondary/80"
                                            }`}
                                    >
                                        {avatar}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setIsAvatarExpanded(!isAvatarExpanded)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-all"
                                >
                                    <motion.div
                                        animate={{ rotate: isAvatarExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    </motion.div>
                                </button>
                            </div>

                            <AnimatePresence>
                                {isAvatarExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-2 pt-2">
                                            <div className="flex gap-2 justify-center">
                                                {AVATARS.slice(5, 11).map((avatar) => (
                                                    <button
                                                        key={avatar}
                                                        onClick={() => setSelectedAvatar(avatar)}
                                                        className={`w-10 h-10 text-2xl rounded-full transition-transform hover:scale-110 ${selectedAvatar === avatar
                                                            ? "bg-primary/20 ring-2 ring-primary scale-110"
                                                            : "bg-secondary hover:bg-secondary/80"
                                                            }`}
                                                    >
                                                        {avatar}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex gap-2 justify-center">
                                                {AVATARS.slice(11, 17).map((avatar) => (
                                                    <button
                                                        key={avatar}
                                                        onClick={() => setSelectedAvatar(avatar)}
                                                        className={`w-10 h-10 text-2xl rounded-full transition-transform hover:scale-110 ${selectedAvatar === avatar
                                                            ? "bg-primary/20 ring-2 ring-primary scale-110"
                                                            : "bg-secondary hover:bg-secondary/80"
                                                            }`}
                                                    >
                                                        {avatar}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {error && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {error}
                            </p>
                        )}

                        {/* Deck Selection */}
                        <div className="mb-6">
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Choose a Deck:</label>
                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                {(Object.entries(DECK_INFO) as [DeckType, typeof DECK_INFO[DeckType]][]).map(([key, info]) => {
                                    const isLocked = !isPro && key !== "fun";
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => !isLocked && setSelectedDeck(key)}
                                            className={`p-2 rounded-lg border text-left transition-all relative ${selectedDeck === key
                                                ? "border-primary bg-primary/10 ring-1 ring-primary ring-inset"
                                                : isLocked
                                                    ? "border-border/50 bg-muted/40 opacity-60 cursor-not-allowed"
                                                    : "border-border hover:bg-secondary"
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="text-lg">{info.emoji}</span>
                                                {isLocked && <Lock className="w-3 h-3 text-orange-500" />}
                                            </div>
                                            <div className="font-semibold text-xs truncate">{info.name} <span className="text-muted-foreground font-normal">({Math.floor(info.count / 10) * 10}+)</span></div>
                                        </button>
                                    );
                                })}
                            </div>
                            {!isPro && selectedDeck !== "fun" && (
                                <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Upgrade to Pro to unlock all decks
                                </p>
                            )}
                        </div>

                        {/* Round Count Selection */}
                        <div className="mb-6">
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Rounds per Game:</label>
                            <div className="grid grid-cols-5 gap-2">
                                {[4, 10, 20, 50, 0].map((count) => {
                                    const isLocked = !isPro && count !== 4;
                                    const label = count === 0 ? "∞" : count.toString();
                                    const sublabel = count === 4 ? "free" : count === 0 ? "unlimited" : "rounds";
                                    return (
                                        <button
                                            key={count}
                                            disabled={isLocked}
                                            onClick={() => !isLocked && setSelectedRounds(count)}
                                            className={`p-2 rounded-lg border text-center transition-all relative ${selectedRounds === count
                                                ? "border-primary bg-primary/10 ring-1 ring-primary ring-inset"
                                                : isLocked
                                                    ? "border-border/50 bg-muted/40 opacity-60 cursor-not-allowed"
                                                    : "border-border hover:bg-secondary cursor-pointer"
                                                }`}
                                        >
                                            <div className="text-lg font-bold flex items-center justify-center gap-0.5">
                                                {label}
                                                {isLocked && <Lock className="w-3 h-3 text-orange-500" />}
                                            </div>
                                            <div className="text-[10px] text-muted-foreground">{sublabel}</div>
                                        </button>
                                    );
                                })}
                            </div>
                            {!isPro && selectedRounds !== 4 && (
                                <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Upgrade to Pro for more rounds
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <Button
                                className="h-14 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] hover:from-[#0284C7] hover:to-[#1D4ED8] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => onCreateGame("classic", playerName, selectedAvatar, selectedDeck, selectedRounds)}
                                disabled={!playerName.trim() || isLoading}
                            >
                                <Gamepad2 className="w-5 h-5" />
                                <span className="font-bold">Classic (2P)</span>
                            </Button>

                            <Button
                                className={`h-14 flex flex-col items-center justify-center gap-1 text-white border-0 shadow-lg transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-[#F43F5E] to-[#E11D48] hover:from-[#E11D48] hover:to-[#BE123C] hover:shadow-xl`}
                                onClick={() => onCreateGame("party", playerName, selectedAvatar, selectedDeck, selectedRounds)}
                                disabled={!playerName.trim() || isLoading}
                            >

                                <PartyPopper className="w-5 h-5 mt-1" />
                                <span className="font-bold">Party (2-6P)</span>
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full text-muted-foreground"
                            onClick={() => { setMode("initial"); setPlayerName(""); }}
                        >
                            Cancel
                        </Button>

                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="game-card"
                    >
                        {/* Join Room UI - Almost same as before */}
                        <h3 className="font-display text-xl font-semibold text-primary mb-4">
                            Join Room
                        </h3>

                        <div className="flex gap-2 mb-3">
                            <Input
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Your name"
                                maxLength={20}
                                className="text-lg h-12 bg-secondary border-2 border-primary/20 focus:border-primary flex-1"
                                autoFocus
                            />
                            <div className="flex items-center justify-center bg-secondary border-2 border-primary/20 rounded-md w-12 h-12 text-2xl">
                                {selectedAvatar}
                            </div>
                        </div>

                        {/* Avatar Picker (Copied logic) */}
                        <div className="flex flex-col items-center gap-2 mb-6">
                            <div className="flex gap-2 justify-center items-center">
                                {AVATARS.slice(0, INITIAL_AVATAR_COUNT).map((avatar) => (
                                    <button
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={`w-10 h-10 text-2xl rounded-full transition-transform hover:scale-110 ${selectedAvatar === avatar
                                            ? "bg-primary/20 ring-2 ring-primary scale-110"
                                            : "bg-secondary hover:bg-secondary/80"
                                            }`}
                                    >
                                        {avatar}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setIsAvatarExpanded(!isAvatarExpanded)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-all"
                                >
                                    <motion.div animate={{ rotate: isAvatarExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    </motion.div>
                                </button>
                            </div>
                            <AnimatePresence>
                                {isAvatarExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-2 pt-2">
                                            {/* Row 1 */}
                                            <div className="flex gap-2 justify-center">
                                                {AVATARS.slice(5, 11).map((avatar) => (
                                                    <button key={avatar} onClick={() => setSelectedAvatar(avatar)} className={`w-10 h-10 text-2xl rounded-full transition-transform hover:scale-110 ${selectedAvatar === avatar ? "bg-primary/20 ring-2 ring-primary scale-110" : "bg-secondary hover:bg-secondary/80"}`}>{avatar}</button>
                                                ))}
                                            </div>
                                            {/* Row 2 */}
                                            <div className="flex gap-2 justify-center">
                                                {AVATARS.slice(11, 17).map((avatar) => (
                                                    <button key={avatar} onClick={() => setSelectedAvatar(avatar)} className={`w-10 h-10 text-2xl rounded-full transition-transform hover:scale-110 ${selectedAvatar === avatar ? "bg-primary/20 ring-2 ring-primary scale-110" : "bg-secondary hover:bg-secondary/80"}`}>{avatar}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>


                        <Input
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="Enter 4-letter code"
                            maxLength={4}
                            className="text-lg h-12 bg-secondary border-2 border-primary/20 focus:border-primary uppercase text-center tracking-widest font-mono font-bold"
                        />

                        {error && (
                            <p className="text-destructive text-sm mt-2 text-center">
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3 mt-4">
                            <Button
                                variant="outline"
                                className="flex-1 h-12"
                                onClick={() => { setMode("initial"); setPlayerName(""); setRoomCode(""); }}
                            >
                                Back
                            </Button>
                            <Button
                                className="flex-1 h-12 btn-game"
                                onClick={() => onJoinGame(roomCode, playerName, selectedAvatar)}
                                disabled={roomCode.length !== 4 || !playerName.trim() || isLoading}
                            >
                                {isLoading ? "Joining..." : "Join Game"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
