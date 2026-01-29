"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/lib/gameData";

interface DialProps {
    targetAngle: number;
    guessAngle: number;
    showTarget: boolean;
    isPsychic: boolean;
    canInteract: boolean;
    currentCard: Card | null;
    onAngleChange?: (angle: number) => void;
}

export function Dial({
    targetAngle,
    guessAngle,
    showTarget,
    isPsychic,
    canInteract,
    currentCard,
    onAngleChange,
}: DialProps) {
    const dialRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const calculateAngle = useCallback((clientX: number, clientY: number) => {
        if (!dialRef.current) return guessAngle;

        const rect = dialRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.bottom;

        const dx = clientX - centerX;
        const dy = centerY - clientY;

        // atan2 gives angle from positive X axis
        // When clicking LEFT: dx < 0, atan2 gives ~180°
        // When clicking RIGHT: dx > 0, atan2 gives ~0°
        // We want: LEFT = 0°, RIGHT = 180°
        // So we invert: result = 180 - atan2_result
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Invert so clicking left gives 0°, clicking right gives 180°
        let angle = 180 - rawAngle;

        // Clamp to valid range 0-180
        angle = Math.max(0, Math.min(180, angle));

        return angle;
    }, [guessAngle]);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (!canInteract) return;
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);

        const angle = calculateAngle(e.clientX, e.clientY);
        onAngleChange?.(angle);
    }, [canInteract, calculateAngle, onAngleChange]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging || !canInteract) return;

        const angle = calculateAngle(e.clientX, e.clientY);
        onAngleChange?.(angle);
    }, [isDragging, canInteract, calculateAngle, onAngleChange]);

    const handlePointerUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const segmentWidths = [6, 8, 10, 8, 6];
    const wedgeWidth = segmentWidths.reduce((a, b) => a + b, 0); // Should be 38
    const segmentColors = ["#fde047", "#fb923c", "#2dd4bf", "#fb923c", "#fde047"];
    const segmentPoints = [2, 3, 4, 3, 2];

    // Needle rotation: 
    // guessAngle 0° = needle points LEFT = rotate -90°
    // guessAngle 90° = needle points UP = rotate 0°
    // guessAngle 180° = needle points RIGHT = rotate +90°
    const needleRotation = guessAngle - 90;

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Dial Container */}
            <div
                ref={dialRef}
                className={`relative aspect-[2/1] w-full select-none ${canInteract ? "cursor-pointer" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* Outer Frame */}
                <div className="absolute inset-0 rounded-t-full bg-dial-navy dial-shadow overflow-hidden">
                    {/* Inner Dial Face */}
                    <div className="absolute inset-3 rounded-t-full bg-dial-cream overflow-hidden">
                        {/* Target Wedge */}
                        <AnimatePresence>
                            {(showTarget || isPsychic) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <svg
                                        viewBox="0 0 200 100"
                                        className="w-full h-full"
                                        style={{ overflow: "visible" }}
                                    >
                                        {segmentWidths.map((width, index) => {
                                            let startOffset = -wedgeWidth / 2;
                                            for (let i = 0; i < index; i++) {
                                                startOffset += segmentWidths[i];
                                            }

                                            const startAngle = targetAngle + startOffset;
                                            const endAngle = startAngle + width;

                                            const innerRadius = 10;
                                            const outerRadius = 95;

                                            // SVG rendering with our angle convention (0=left, 180=right)
                                            const startRad = (startAngle) * (Math.PI / 180);
                                            const endRad = (endAngle) * (Math.PI / 180);

                                            const x1 = 100 - outerRadius * Math.cos(startRad);
                                            const y1 = 100 - outerRadius * Math.sin(startRad);
                                            const x2 = 100 - outerRadius * Math.cos(endRad);
                                            const y2 = 100 - outerRadius * Math.sin(endRad);
                                            const x3 = 100 - innerRadius * Math.cos(endRad);
                                            const y3 = 100 - innerRadius * Math.sin(endRad);
                                            const x4 = 100 - innerRadius * Math.cos(startRad);
                                            const y4 = 100 - innerRadius * Math.sin(startRad);

                                            return (
                                                <path
                                                    key={index}
                                                    d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                                                    fill={segmentColors[index]}
                                                    stroke="hsl(220, 50%, 18%)"
                                                    strokeWidth="0.5"
                                                />
                                            );
                                        })}

                                        {isPsychic && !showTarget && (
                                            <>
                                                {segmentPoints.map((points, index) => {
                                                    let angleOffset = -wedgeWidth / 2;
                                                    for (let i = 0; i < index; i++) {
                                                        angleOffset += segmentWidths[i];
                                                    }
                                                    angleOffset += segmentWidths[index] / 2;

                                                    const angle = targetAngle + angleOffset;
                                                    const rad = (angle) * (Math.PI / 180);
                                                    const r = 60;
                                                    const x = 100 - r * Math.cos(rad);
                                                    const y = 100 - r * Math.sin(rad);

                                                    return (
                                                        <text
                                                            key={index}
                                                            x={x}
                                                            y={y}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                            className="font-display font-bold text-[8px]"
                                                            fill="hsl(220, 50%, 18%)"
                                                        >
                                                            {points}
                                                        </text>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tick marks */}
                        <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full">
                            {Array.from({ length: 19 }).map((_, i) => {
                                const angle = i * 10; // 0, 10, 20, ... 180
                                const rad = (angle) * (Math.PI / 180);
                                const isMajor = i % 2 === 0;
                                const innerR = isMajor ? 85 : 88;
                                const outerR = 95;

                                const x1 = 100 - innerR * Math.cos(rad);
                                const y1 = 100 - innerR * Math.sin(rad);
                                const x2 = 100 - outerR * Math.cos(rad);
                                const y2 = 100 - outerR * Math.sin(rad);

                                return (
                                    <line
                                        key={i}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="hsl(220, 50%, 18%)"
                                        strokeWidth={isMajor ? 1.5 : 0.5}
                                        strokeOpacity={isMajor ? 0.8 : 0.4}
                                    />
                                );
                            })}
                        </svg>

                        {/* Needle */}
                        <motion.div
                            className="absolute left-1/2 bottom-0 origin-bottom"
                            style={{
                                width: 4,
                                height: "90%",
                                marginLeft: -2,
                            }}
                            animate={{
                                rotate: needleRotation,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        >
                            <div className="w-full h-full bg-accent rounded-t-full needle-glow" />
                            <div
                                className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full"
                            />
                        </motion.div>

                        {/* Center pivot */}
                        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-dial-navy shadow-lg border-4 border-dial-cream z-10" />
                    </div>
                </div>
            </div>

            {/* Card Labels - positioned BELOW the dial */}
            {currentCard && (
                <div className="flex justify-between items-start mt-2 px-2">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-sm md:text-base font-bold text-primary max-w-[100px] text-left"
                    >
                        {currentCard.left}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-sm md:text-base font-bold text-primary max-w-[100px] text-right"
                    >
                        {currentCard.right}
                    </motion.span>
                </div>
            )}

            {/* Interaction hint */}
            {canInteract && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-3 text-muted-foreground font-medium"
                >
                    Click on the dial to move the needle
                </motion.p>
            )}
        </div>
    );
}
