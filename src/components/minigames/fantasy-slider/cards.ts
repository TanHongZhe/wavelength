export type DeckType = "normal" | "lust";

export interface FantasyCard {
    id: string;
    question: string;
    deck: DeckType;
}

export const DECKS: Record<DeckType, { name: string; emoji: string; description: string }> = {
    normal: {
        name: "Fantasy 😇",
        emoji: "😇",
        description: "Fun & romantic fantasies for everyone.",
    },
    lust: {
        name: "Lust 😈",
        emoji: "😈",
        description: "Spicy 18+ fantasies to heat things up.",
    },
};

const normalDeck: FantasyCard[] = [
    { id: "n1", question: "Kissing in the rain", deck: "normal" },
    { id: "n2", question: "Breakfast in bed", deck: "normal" },
    { id: "n3", question: "Road trip without a destination", deck: "normal" },
    { id: "n4", question: "Couples massage", deck: "normal" },
    { id: "n5", question: "Dancing in the living room", deck: "normal" },
    { id: "n6", question: "Writing love letters", deck: "normal" },
    { id: "n7", question: "Cooking a meal together", deck: "normal" },
    { id: "n8", question: "Stargazing", deck: "normal" },
    { id: "n9", question: "Getting a puppy", deck: "normal" },
    { id: "n10", question: "Moving to a new city together", deck: "normal" },
    { id: "n11", question: "Having a picnic in the park", deck: "normal" },
    { id: "n12", question: "Going on a surprise date", deck: "normal" },
    { id: "n13", question: "Watching the sunset on the beach", deck: "normal" },
    { id: "n14", question: "Wearing matching outfits", deck: "normal" },
    { id: "n15", question: "Taking a bubble bath together", deck: "normal" },
    { id: "n16", question: "Building a pillow fort", deck: "normal" },
    { id: "n17", question: "Singing a duet at karaoke", deck: "normal" },
    { id: "n18", question: "Going camping", deck: "normal" },
    { id: "n19", question: "Having a game night", deck: "normal" },
    { id: "n20", question: "Binge-watching a show all weekend", deck: "normal" },
    { id: "n21", question: "Going to a music festival", deck: "normal" },
    { id: "n22", question: "Traveling to Paris", deck: "normal" },
    { id: "n23", question: "Renewing vows", deck: "normal" },
    { id: "n24", question: "Getting married (again?)", deck: "normal" },
    { id: "n25", question: "Having kids/more kids", deck: "normal" },
    { id: "n26", question: "Buying a house", deck: "normal" },
    { id: "n27", question: "Starting a business together", deck: "normal" },
    { id: "n28", question: "Learning a new language together", deck: "normal" },
    { id: "n29", question: "Taking dance classes", deck: "normal" },
    { id: "n30", question: "Going skydiving", deck: "normal" },
    { id: "n31", question: "Swimming with dolphins", deck: "normal" },
    { id: "n32", question: "Falling asleep in each other's arms", deck: "normal" },
    { id: "n33", question: "Being carried", deck: "normal" },
    { id: "n34", question: "Being fed fruit", deck: "normal" },
    { id: "n35", question: "Public display of affection", deck: "normal" },
    { id: "n36", question: "Wearing partner's clothes", deck: "normal" },
    { id: "n37", question: "Whispering secrets", deck: "normal" },
    { id: "n38", question: "Slow dancing", deck: "normal" },
    { id: "n39", question: "Forehead kisses", deck: "normal" },
    { id: "n40", question: "Tickle fight", deck: "normal" },
    { id: "n41", question: "Going on a hike", deck: "normal" },
    { id: "n42", question: "Cooking class", deck: "normal" },
    { id: "n43", question: "Pottery class", deck: "normal" },
    { id: "n44", question: "Visiting a museum", deck: "normal" },
    { id: "n45", question: "Going to a theme park", deck: "normal" },
    { id: "n46", question: "Ice skating", deck: "normal" },
    { id: "n47", question: "Roller skating", deck: "normal" },
    { id: "n48", question: "Bowling date", deck: "normal" },
    { id: "n49", question: "Arcade date", deck: "normal" },
    { id: "n50", question: "Escape room", deck: "normal" },
    { id: "n51", question: "Wine tasting", deck: "normal" },
    { id: "n52", question: "Brewery tour", deck: "normal" },
    { id: "n53", question: "Going to a comedy club", deck: "normal" },
    { id: "n54", question: "Live theater/musical", deck: "normal" },
    { id: "n55", question: "Drive-in movie", deck: "normal" },
    { id: "n56", question: "Mini golf", deck: "normal" },
    { id: "n57", question: "Go-kart racing", deck: "normal" },
    { id: "n58", question: "Painting together (paint & sip)", deck: "normal" },
    { id: "n59", question: "Volunteering together", deck: "normal" },
    { id: "n60", question: "Adopting a pet", deck: "normal" },
    { id: "n61", question: "Learning to salsa dance", deck: "normal" },
    { id: "n62", question: "Couple's yoga", deck: "normal" },
    { id: "n63", question: "Running a marathon together", deck: "normal" },
    { id: "n64", question: "Building furniture together", deck: "normal" },
    { id: "n65", question: "Gardening together", deck: "normal" },
    { id: "n66", question: "Going to a farmer's market", deck: "normal" },
    { id: "n67", question: "Berry picking", deck: "normal" },
    { id: "n68", question: "Making homemade pizza", deck: "normal" },
    { id: "n69", question: "Baking cookies", deck: "normal" },
    { id: "n70", question: "Reading to each other", deck: "normal" },
    { id: "n71", question: "Solving a puzzle", deck: "normal" },
    { id: "n72", question: "Playing video games together", deck: "normal" },
    { id: "n73", question: "Watching a sunrise", deck: "normal" },
    { id: "n74", question: "Skinny dipping (private pool)", deck: "normal" },
    { id: "n75", question: "Giving each other pedicures", deck: "normal" },
    { id: "n76", question: "Drawing each other", deck: "normal" },
    { id: "n77", question: "Writing a song together", deck: "normal" },
    { id: "n78", question: "Planning a dream vacation", deck: "normal" },
    { id: "n79", question: "Looking at old photos", deck: "normal" },
    { id: "n80", question: "Creating a time capsule", deck: "normal" },
    { id: "n81", question: "Going for a long walk", deck: "normal" },
    { id: "n82", question: "Bike riding", deck: "normal" },
    { id: "n83", question: "Kayaking/Canoeing", deck: "normal" },
    { id: "n84", question: "Horseback riding", deck: "normal" },
    { id: "n85", question: "Hot air balloon ride", deck: "normal" },
    { id: "n86", question: "Helicopter tour", deck: "normal" },
    { id: "n87", question: "Staying in a cabin in the woods", deck: "normal" },
    { id: "n88", question: "Glamping", deck: "normal" },
    { id: "n89", question: "Visiting a botanical garden", deck: "normal" },
    { id: "n90", question: "Going to the zoo/aquarium", deck: "normal" },
];

const lustDeck: FantasyCard[] = [
    { id: "l1", question: "Threesome", deck: "lust" },
    { id: "l2", question: "Roleplay", deck: "lust" },
    { id: "l3", question: "Public sex", deck: "lust" },
    { id: "l4", question: "Sex on the beach", deck: "lust" },
    { id: "l5", question: "Sex in a car", deck: "lust" },
    { id: "l6", question: "Sex in an elevator", deck: "lust" },
    { id: "l7", question: "Blindfolds", deck: "lust" },
    { id: "l8", question: "Handcuffs/Restraints", deck: "lust" },
    { id: "l9", question: "Spanking", deck: "lust" },
    { id: "l10", question: "Dirty talk", deck: "lust" },
    { id: "l11", question: "Striptease", deck: "lust" },
    { id: "l12", question: "Edging", deck: "lust" },
    { id: "l13", question: "Anal play", deck: "lust" },
    { id: "l14", question: "Sex toys", deck: "lust" },
    { id: "l15", question: "Making a sex tape", deck: "lust" },
    { id: "l16", question: "Watching porn together", deck: "lust" },
    { id: "l17", question: "Shower sex", deck: "lust" },
    { id: "l18", question: "Morning sex", deck: "lust" },
    { id: "l19", question: "Quickie", deck: "lust" },
    { id: "l20", question: "Massage with happy ending", deck: "lust" },
    { id: "l21", question: "Lingerie", deck: "lust" },
    { id: "l22", question: "Rough sex", deck: "lust" },
    { id: "l23", question: "Gentle sex", deck: "lust" },
    { id: "l24", question: "Oral sex marathon", deck: "lust" },
    { id: "l25", question: "69", deck: "lust" },
    { id: "l26", question: "Phone sex/Sexting", deck: "lust" },
    { id: "l27", question: "Exhibitionism (being watched)", deck: "lust" },
    { id: "l28", question: "Voyeurism (watching others)", deck: "lust" },
    { id: "l29", question: "Food play", deck: "lust" },
    { id: "l30", question: "Mirror sex", deck: "lust" },
    { id: "l31", question: "Sex in nature", deck: "lust" },
    { id: "l32", question: "BDSM", deck: "lust" },
    { id: "l33", question: "Power play", deck: "lust" },
    { id: "l34", question: "Nipple play", deck: "lust" },
    { id: "l35", question: "Ice cubes/Temperature play", deck: "lust" },
    { id: "l36", question: "Choking (safe)", deck: "lust" },
    { id: "l37", question: "Hair pulling", deck: "lust" },
    { id: "l38", question: "Sex in a specialized mood", deck: "lust" },
    { id: "l39", question: "Costumes", deck: "lust" },
    { id: "l40", question: "Full body massage", deck: "lust" },
    { id: "l41", question: "Shower foreplay", deck: "lust" },
    { id: "l42", question: "Bath sex", deck: "lust" },
    { id: "l43", question: "Kitchen counter sex", deck: "lust" },
    { id: "l44", question: "Sex on the floor", deck: "lust" },
    { id: "l45", question: "Sex on a staircase", deck: "lust" },
    { id: "l46", question: "Sex against a wall", deck: "lust" },
    { id: "l47", question: "Sex in front of a mirror", deck: "lust" },
    { id: "l48", question: "Watching partner masturbate", deck: "lust" },
    { id: "l49", question: "Masturbating together", deck: "lust" },
    { id: "l50", question: "Mutual masturbation", deck: "lust" },
    { id: "l51", question: "Using food (e.g., whipped cream)", deck: "lust" },
    { id: "l52", question: "Body painting", deck: "lust" },
    { id: "l53", question: "Sensory deprivation (blindfold/earplugs)", deck: "lust" },
    { id: "l54", question: "Feather tickling", deck: "lust" },
    { id: "l55", question: "Impact play (light)", deck: "lust" },
    { id: "l56", question: "Breath play (light)", deck: "lust" },
    { id: "l57", question: "Wrestling/Play fighting", deck: "lust" },
    { id: "l58", question: "Dominance/Submission", deck: "lust" },
    { id: "l59", question: "Pet play", deck: "lust" },
    { id: "l60", question: "Medical play", deck: "lust" },
    { id: "l61", question: "Teacher/Student roleplay", deck: "lust" },
    { id: "l62", question: "Doctor/Patient roleplay", deck: "lust" },
    { id: "l63", question: "Boss/Employee roleplay", deck: "lust" },
    { id: "l64", question: "Strangers roleplay", deck: "lust" },
    { id: "l65", question: "Massage oil", deck: "lust" },
    { id: "l66", question: "Lubricant play", deck: "lust" },
    { id: "l67", question: "Using a vibrator on partner", deck: "lust" },
    { id: "l68", question: "Using a dildo on partner", deck: "lust" },
    { id: "l69", question: "Strap-on play", deck: "lust" },
    { id: "l70", question: "Anal beads/plugs", deck: "lust" },
    { id: "l71", question: "Cock ring", deck: "lust" },
    { id: "l72", question: "Nipple clamps", deck: "lust" },
    { id: "l73", question: "Collar/Leash", deck: "lust" },
    { id: "l74", question: "Gags", deck: "lust" },
    { id: "l75", question: "Rope bondage", deck: "lust" },
    { id: "l76", question: "Spreader bar", deck: "lust" },
    { id: "l77", question: "Sex swing", deck: "lust" },
    { id: "l78", question: "Public flashing", deck: "lust" },
    { id: "l79", question: "Risky semi-public sex", deck: "lust" },
    { id: "l80", question: "Sex in a fitting room", deck: "lust" },
    { id: "l81", question: "Sex in a cinema", deck: "lust" },
    { id: "l82", question: "Sex on a balcony", deck: "lust" },
    { id: "l83", question: "Sex in a tent", deck: "lust" },
    { id: "l84", question: "Mile high club", deck: "lust" },
    { id: "l85", question: "Recording audio", deck: "lust" },
    { id: "l86", question: "Taking spicy photos", deck: "lust" },
    { id: "l87", question: "Sharing fantasies", deck: "lust" },
    { id: "l88", question: "Reading erotica together", deck: "lust" },
    { id: "l89", question: "Watching hot movie scenes", deck: "lust" },
    { id: "l90", question: "Period sex", deck: "lust" },
];

export function getCardsByDeck(deck: DeckType) {
    switch (deck) {
        case "normal":
            return normalDeck;
        case "lust":
            return lustDeck;
        default:
            return normalDeck;
    }
}

// Simple seeded random number generator
function mulberry32(a: number) {
    return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function getDeckCards(deckType: DeckType, count: number, seed: number): FantasyCard[] {
    const allDeckCards = getCardsByDeck(deckType);
    const random = mulberry32(seed);

    const shuffled = [...allDeckCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
}
