"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioWaveform, Users, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LandingScreenProps {
    onCreateRoom: (name: string, avatar: string) => void;
    onJoinRoom: (code: string, name: string, avatar: string) => void;
    isLoading: boolean;
    error: string | null;
}

// 17 animal avatars - first 5 shown by default, rest in expandable section (6 per row)
const AVATARS = ["🐼", "🐯", "🐶", "🐱", "🐷", "🐰", "🦊", "🐻", "🐨", "🦁", "🐮", "🐵", "🐸", "🦄", "🐧", "🐳", "🦉"];
const INITIAL_AVATAR_COUNT = 5;

export function LandingScreen({ onCreateRoom, onJoinRoom, isLoading, error }: LandingScreenProps) {
    const [roomCode, setRoomCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [mode, setMode] = useState<"initial" | "create" | "join">("initial");
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-wedge-teal/20 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-wedge-orange/20 blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Logo & Title */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
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

                <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mb-3">
                    Wavelength
                </h1>
                <p className="text-xl text-muted-foreground font-medium">
                    Are you on the same wavelength?
                </p>
            </motion.div>

            {/* Action Cards */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-md space-y-4"
            >
                {mode === "initial" ? (
                    <>
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
                                        Start a new game and invite friends
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
                    </>
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

                        <div className="flex flex-col items-center gap-2 mb-6">
                            {/* Initial 5 avatars + expand button */}
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
                                {/* Expand button in 6th position */}
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

                            {/* Expanded avatars - 2 rows of 6 */}
                            <AnimatePresence>
                                {isAvatarExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-2 pt-2">
                                            {/* Row 1: avatars 6-11 (6 avatars) */}
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
                                            {/* Row 2: avatars 12-17 (6 avatars) */}
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

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 h-12"
                                onClick={() => { setMode("initial"); setPlayerName(""); }}
                            >
                                Back
                            </Button>
                            <Button
                                className="flex-1 h-12 btn-game"
                                onClick={() => onCreateRoom(playerName, selectedAvatar)}
                                disabled={!playerName.trim() || isLoading}
                            >
                                {isLoading ? "Creating..." : "Create Room"}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="game-card"
                    >
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

                        <div className="flex flex-col items-center gap-2 mb-6">
                            {/* Initial 5 avatars + expand button */}
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
                                {/* Expand button in 6th position */}
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

                            {/* Expanded avatars - 2 rows of 5 */}
                            <AnimatePresence>
                                {isAvatarExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-2 pt-2">
                                            {/* Row 1: avatars 6-10 + empty space for alignment */}
                                            <div className="flex gap-2 justify-center">
                                                {AVATARS.slice(5, 10).map((avatar) => (
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
                                                {/* Empty 6th space for alignment */}
                                                <div className="w-10 h-10" />
                                            </div>
                                            {/* Row 2: avatars 11-15 + empty space for alignment */}
                                            <div className="flex gap-2 justify-center">
                                                {AVATARS.slice(10, 15).map((avatar) => (
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
                                                {/* Empty 6th space for alignment */}
                                                <div className="w-10 h-10" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Input
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="Enter code"
                            maxLength={4}
                            className="text-lg h-12 bg-secondary border-2 border-primary/20 focus:border-primary uppercase"
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
                                onClick={() => onJoinRoom(roomCode, playerName, selectedAvatar)}
                                disabled={roomCode.length !== 4 || !playerName.trim() || isLoading}
                            >
                                {isLoading ? "Joining..." : "Join"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Footer */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-sm text-muted-foreground"
            >
                Crafted with ❤️ by Hong Zhe
            </motion.p>
        </div>
    );
}
