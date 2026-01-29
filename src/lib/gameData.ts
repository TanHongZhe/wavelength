// Wavelength Game Card Decks

export interface Card {
    left: string;
    right: string;
}

export const funDeck: Card[] = [
    { left: "Cheap", right: "Expensive" },
    { left: "Bad Pizza Topping", right: "Good Pizza Topping" },
    { left: "Useless Superpower", right: "Useful Superpower" },
    { left: "Boring", right: "Exciting" },
    { left: "Overrated", right: "Underrated" },
    { left: "Guilty Pleasure", right: "Genuine Pleasure" },
    { left: "Bad Movie", right: "Great Movie" },
    { left: "Forgettable", right: "Unforgettable" },
    { left: "Necessity", right: "Luxury" },
    { left: "Cold", right: "Hot" },
    { left: "Old Fashioned", right: "Modern" },
    { left: "Easy", right: "Difficult" },
    { left: "Ugly", right: "Beautiful" },
    { left: "Sad Song", right: "Happy Song" },
    { left: "Morning Activity", right: "Night Activity" },
    { left: "Indoor Activity", right: "Outdoor Activity" },
    { left: "Bad Smell", right: "Good Smell" },
    { left: "Weird Pet", right: "Normal Pet" },
    { left: "Short Vacation", right: "Long Vacation" },
    { left: "Fantasy", right: "Reality" },
];

export const spicyDeck: Card[] = [
    { left: "Red Flag", right: "Green Flag" },
    { left: "Bad Date", right: "Great Date" },
    { left: "Childish", right: "Mature" },
    { left: "Ick", right: "Turn On" },
    { left: "Cringe", right: "Based" },
    { left: "Deal Breaker", right: "Deal Maker" },
    { left: "Embarrassing Secret", right: "Humble Brag" },
    { left: "Toxic Trait", right: "Green Flag" },
    { left: "Never Tell Anyone", right: "Tell Everyone" },
    { left: "Regret", right: "Best Decision" },
    { left: "Trashy", right: "Classy" },
    { left: "Bad Influence", right: "Good Influence" },
    { left: "Chaotic", right: "Peaceful" },
    { left: "Sus", right: "Trustworthy" },
    { left: "Petty", right: "Mature" },
    { left: "Keeping It", right: "Throwing It Away" },
    { left: "Ghost Them", right: "Marry Them" },
    { left: "Weird Flex", right: "Actual Flex" },
    { left: "Villain Energy", right: "Hero Energy" },
    { left: "Problematic", right: "Unproblematic" },
];

export function getRandomCard(deck: "fun" | "spicy" | "random"): Card {
    let selectedDeck: Card[];

    if (deck === "random") {
        selectedDeck = Math.random() > 0.5 ? funDeck : spicyDeck;
    } else {
        selectedDeck = deck === "fun" ? funDeck : spicyDeck;
    }

    return selectedDeck[Math.floor(Math.random() * selectedDeck.length)];
}

export function generateRoomCode(): string {
    // Database constraint requires exactly 4 uppercase letters (^[A-Z]{4}$)
    // We exclude confusing letters like I, O, Q, but ensure we ONLY use [A-Z]
    const chars = "ABCDEFGHJKLMNPRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export function calculatePoints(targetAngle: number, guessAngle: number): number {
    const difference = Math.abs(targetAngle - guessAngle);

    if (difference <= 5) return 4;  // Center 10° (±5)
    if (difference <= 13) return 3; // Next 8° (±5 + 8 = ±13)
    if (difference <= 19) return 2; // Next 6° (±13 + 6 = ±19)
    return 0; // Miss
}

export function generateRandomTarget(): number {
    // Generate a random angle between 0 and 180 (inclusive)
    return Math.floor(Math.random() * 181);
}
