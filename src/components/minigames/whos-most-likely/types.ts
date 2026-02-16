import { DeckType } from "./cards";

export interface GameConfig {
    playerName: string;
    playerAvatar: string;
    deckType: DeckType;
    cardCount: number;
    roomCode?: string;
}
