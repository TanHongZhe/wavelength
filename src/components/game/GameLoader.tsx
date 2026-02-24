"use client";

import dynamic from "next/dynamic";

const GameEngine = dynamic(
    () => import("./GameEngine").then((mod) => mod.GameEngine)
);

export function GameLoader() {
    return <GameEngine />;
}
