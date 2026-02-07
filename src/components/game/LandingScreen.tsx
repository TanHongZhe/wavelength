"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioWaveform, Users, Sparkles, ChevronDown, Gamepad2, PartyPopper, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MiniGamesModal } from "@/components/minigames/MiniGamesModal";

interface LandingScreenProps {
    onCreateGame: (mode: "classic" | "party", name: string, avatar: string) => void;
    onJoinGame: (code: string, name: string, avatar: string) => void;
    isLoading: boolean;
    error: string | null;
}

// 17 animal avatars
const AVATARS = ["🐼", "🐯", "🐶", "🐱", "🐷", "🐰", "🦊", "🐻", "🐨", "🦁", "🐮", "🐵", "🐸", "🦄", "🐧", "🐳", "🦉"];
const INITIAL_AVATAR_COUNT = 5;

export function LandingScreen({ onCreateGame, onJoinGame, isLoading, error }: LandingScreenProps) {
    const [roomCode, setRoomCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [mode, setMode] = useState<"initial" | "wavelength" | "create" | "join">("initial");
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);
    const [showMiniGames, setShowMiniGames] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
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
                            onClick={() => setMode("wavelength")}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-wedge-teal to-wedge-orange text-white transition-all">
                                    <AudioWaveform className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                        Wavelength
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Signature telepathic game • 2-6 players
                                    </p>
                                </div>
                            </div>
                        </motion.button>

                        <motion.button
                            className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                            onClick={() => setShowMiniGames(true)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-purple-500 group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all">
                                    <Dices className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                        Mini Games 🎲
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Quick 2-player games to play together
                                    </p>
                                </div>
                            </div>
                        </motion.button>
                    </>
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

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <Button
                                className="h-14 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] hover:from-[#0284C7] hover:to-[#1D4ED8] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => onCreateGame("classic", playerName, selectedAvatar)}
                                disabled={!playerName.trim() || isLoading}
                            >
                                <Gamepad2 className="w-5 h-5" />
                                <span className="font-bold">Classic (2P)</span>
                            </Button>

                            <Button
                                className="h-14 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#F43F5E] to-[#E11D48] hover:from-[#E11D48] hover:to-[#BE123C] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => onCreateGame("party", playerName, selectedAvatar)}
                                disabled={!playerName.trim() || isLoading}
                            >
                                <PartyPopper className="w-5 h-5" />
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

            {/* Footer */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-sm text-muted-foreground"
            >
                Crafted with ❤️ by Hong Zhe
            </motion.p>

            {/* Mini Games Modal */}
            <MiniGamesModal
                isOpen={showMiniGames}
                onClose={() => setShowMiniGames(false)}
            />
        </div>
    );
}
