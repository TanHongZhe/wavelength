"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 17 animal avatars - same as main game
export const AVATARS = ["🐼", "🐯", "🐶", "🐱", "🐷", "🐰", "🦊", "🐻", "🐨", "🦁", "🐮", "🐵", "🐸", "🦄", "🐧", "🐳", "🦉"];
const INITIAL_AVATAR_COUNT = 5;

interface MiniGameSetupProps {
    /** Title displayed at top of setup screen */
    title: string;
    /** Called when user submits create game */
    onCreateGame: (playerName: string, avatar: string) => void;
    /** Called when user submits join game */
    onJoinGame: (playerName: string, avatar: string, roomCode: string) => void;
    /** Called when user clicks back/close */
    onClose: () => void;
    /** Optional additional content to show in create mode (e.g., deck picker) */
    createGameOptions?: ReactNode;
    /** Loading state */
    isLoading?: boolean;
    /** Error message to display */
    error?: string | null;
}

export function MiniGameSetup({
    title,
    onCreateGame,
    onJoinGame,
    onClose,
    createGameOptions,
    isLoading,
    error
}: MiniGameSetupProps) {
    const [mode, setMode] = useState<"initial" | "create" | "join">("initial");
    const [playerName, setPlayerName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);
    const [roomCode, setRoomCode] = useState("");

    const handleCreateGame = () => {
        if (!playerName.trim()) return;
        onCreateGame(playerName.trim(), selectedAvatar);
    };

    const handleJoinGame = () => {
        if (!playerName.trim() || roomCode.trim().length !== 4) return;
        onJoinGame(playerName.trim(), selectedAvatar, roomCode.toUpperCase());
    };

    // Avatar picker component (reused in both create and join modes)
    const AvatarPicker = () => (
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
    );

    return (
        <div className="fixed inset-0 bg-background z-50 flex items-start justify-center overflow-y-auto py-6 px-4">
            <div className="max-w-md w-full my-auto">
                <AnimatePresence mode="wait">
                    {mode === "initial" ? (
                        <motion.div
                            key="initial"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="game-card border border-white/10"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h2 className="font-display text-2xl font-semibold text-primary">
                                    {title}
                                </h2>
                            </div>

                            {/* Create/Join buttons */}
                            <div className="space-y-3">
                                <motion.button
                                    className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
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
                                            <p className="text-muted-foreground text-sm">
                                                Start a new game
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
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
                                            <p className="text-muted-foreground text-sm">
                                                Enter a room code to join
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : mode === "create" ? (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="game-card border border-white/10"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <button
                                    onClick={() => setMode("initial")}
                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h3 className="font-display text-xl font-semibold text-primary">
                                    Create New Room
                                </h3>
                            </div>

                            {/* Name input with avatar display */}
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
                            <AvatarPicker />

                            {/* Optional game-specific options (e.g., deck picker) */}
                            {createGameOptions}

                            {/* Error message */}
                            {error && (
                                <p className="text-destructive text-sm mb-4 text-center">
                                    {error}
                                </p>
                            )}

                            {/* Play button */}
                            <Button
                                onClick={handleCreateGame}
                                disabled={!playerName.trim() || isLoading}
                                className="w-full h-14 text-lg font-bold btn-game"
                            >
                                {isLoading ? "Creating..." : "Play"}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="join"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="game-card border border-white/10"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <button
                                    onClick={() => setMode("initial")}
                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h3 className="font-display text-xl font-semibold text-primary">
                                    Join Room
                                </h3>
                            </div>

                            {/* Name input with avatar display */}
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
                            <AvatarPicker />

                            {/* Room code input */}
                            <Input
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="Enter 4-letter code"
                                maxLength={4}
                                className="text-lg h-12 bg-secondary border-2 border-primary/20 focus:border-primary uppercase text-center tracking-widest font-mono font-bold mb-4"
                            />

                            {/* Error message */}
                            {error && (
                                <p className="text-destructive text-sm mb-4 text-center">
                                    {error}
                                </p>
                            )}

                            {/* Join button */}
                            <Button
                                onClick={handleJoinGame}
                                disabled={!playerName.trim() || roomCode.trim().length !== 4 || isLoading}
                                className="w-full h-14 text-lg font-bold btn-game"
                            >
                                {isLoading ? "Joining..." : "Join Game"}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
