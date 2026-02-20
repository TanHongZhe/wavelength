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
    // 🌧️ Romantic Classics — iconic for a reason
    { id: "n1", question: "Kissing in the rain", deck: "normal" },
    { id: "n2", question: "Slow dancing with no music", deck: "normal" },
    { id: "n3", question: "Being carried to bed", deck: "normal" },
    { id: "n4", question: "Forehead kisses every morning", deck: "normal" },
    { id: "n5", question: "Falling asleep mid-conversation", deck: "normal" },
    { id: "n6", question: "Someone playing with your hair until you fall asleep", deck: "normal" },
    { id: "n7", question: "Being held from behind while cooking", deck: "normal" },
    { id: "n8", question: "Waking up to breakfast already made", deck: "normal" },
    { id: "n9", question: "A hand-written love letter left on the pillow", deck: "normal" },
    { id: "n10", question: "Dancing in the kitchen at midnight", deck: "normal" },

    // ✈️ Escape & Adventure
    { id: "n11", question: "Road trip with no destination, just driving", deck: "normal" },
    { id: "n12", question: "Renting a cabin in the middle of nowhere for a week", deck: "normal" },
    { id: "n13", question: "Watching the sunset from a rooftop in Italy", deck: "normal" },
    { id: "n14", question: "A spontaneous flight booked the night before", deck: "normal" },
    { id: "n15", question: "Staying in an overwater bungalow in the Maldives", deck: "normal" },
    { id: "n16", question: "Watching the Northern Lights wrapped in blankets", deck: "normal" },
    { id: "n17", question: "Stargazing in the middle of a desert", deck: "normal" },
    { id: "n18", question: "Slow train ride through the countryside", deck: "normal" },
    { id: "n19", question: "Hot air balloon ride at sunrise", deck: "normal" },
    { id: "n20", question: "Swimming in a hidden waterfall", deck: "normal" },
    { id: "n21", question: "Sleeping under the stars on a beach", deck: "normal" },
    { id: "n22", question: "Exploring a city where nobody knows your name", deck: "normal" },
    { id: "n23", question: "Going skydiving together", deck: "normal" },
    { id: "n24", question: "Sailing with nowhere to be", deck: "normal" },

    // 🕯️ Intimacy & Presence
    { id: "n25", question: "A whole Sunday in bed with nowhere to be", deck: "normal" },
    { id: "n26", question: "Sharing a bath by candlelight", deck: "normal" },
    { id: "n27", question: "Giving each other a full massage at home", deck: "normal" },
    { id: "n28", question: "Reading to each other before bed", deck: "normal" },
    { id: "n29", question: "Watching the sunrise after staying up all night talking", deck: "normal" },
    { id: "n30", question: "Skinny dipping at night", deck: "normal" },
    { id: "n31", question: "Slow morning with coffee and no phones", deck: "normal" },
    { id: "n32", question: "Couple's spa day — full treatment", deck: "normal" },
    { id: "n33", question: "Whispering secrets under the covers", deck: "normal" },
    { id: "n34", question: "Getting lost somewhere beautiful with no map", deck: "normal" },
    { id: "n35", question: "Looking at old photos of your relationship", deck: "normal" },
    { id: "n36", question: "Wearing each other's clothes all day", deck: "normal" },

    // 🎭 Indulgent & Playful
    { id: "n37", question: "Checking into a fancy hotel for no reason", deck: "normal" },
    { id: "n38", question: "A surprise date where you don't know where you're going", deck: "normal" },
    { id: "n39", question: "Getting dressed up and going somewhere way too fancy", deck: "normal" },
    { id: "n40", question: "Having a private chef cook dinner just for you two", deck: "normal" },
    { id: "n41", question: "Being serenaded in public", deck: "normal" },
    { id: "n42", question: "Slow dancing at your own private dinner", deck: "normal" },
    { id: "n43", question: "Recreating your first date exactly", deck: "normal" },
    { id: "n44", question: "Having a tickle fight that ends in exhausted laughter", deck: "normal" },
    { id: "n45", question: "Pillow fort and movies all day", deck: "normal" },
    { id: "n46", question: "Singing a duet at karaoke with full commitment", deck: "normal" },
    { id: "n47", question: "Matching outfits in public, owning it completely", deck: "normal" },
    { id: "n48", question: "Going to a drive-in movie and barely watching it", deck: "normal" },
    { id: "n49", question: "Painting each other", deck: "normal" },
    { id: "n50", question: "Making a playlist together that takes all night", deck: "normal" },

    // 🌱 Dreams & Future Fantasies
    { id: "n51", question: "Moving somewhere neither of you have ever been", deck: "normal" },
    { id: "n52", question: "Building your dream home from scratch", deck: "normal" },
    { id: "n53", question: "Starting a business together that actually works", deck: "normal" },
    { id: "n54", question: "Living abroad for a year with no plan", deck: "normal" },
    { id: "n55", question: "Renewing vows on a beach with just the two of you", deck: "normal" },
    { id: "n56", question: "Growing old in a house with a porch you sit on every evening", deck: "normal" },
    { id: "n57", question: "Swimming with dolphins in the wild", deck: "normal" },
    { id: "n58", question: "Going to a music festival and dancing all weekend", deck: "normal" },
    { id: "n59", question: "Learning a language just to speak it on a trip together", deck: "normal" },
    { id: "n60", question: "Writing a book together", deck: "normal" },

    // 💬 Emotional & Deep
    { id: "n61", question: "Sitting in comfortable silence for hours and loving it", deck: "normal" },
    { id: "n62", question: "Crying together over something beautiful", deck: "normal" },
    { id: "n63", question: "Telling each other everything — no filter night", deck: "normal" },
    { id: "n64", question: "Making up after a real fight and feeling closer", deck: "normal" },
    { id: "n65", question: "Being the person someone calls when things go wrong", deck: "normal" },
    { id: "n66", question: "Slow kissing with nowhere to be afterward", deck: "normal" },
    { id: "n67", question: "Holding hands without saying anything", deck: "normal" },
    { id: "n68", question: "Being looked at like you're the only person in the room", deck: "normal" },
    { id: "n69", question: "Someone choosing you again, every single day", deck: "normal" },
    { id: "n70", question: "Laughing so hard together you can't breathe", deck: "normal" },

    // 🔥 A Little Spicier (still safe for normal deck)
    { id: "n71", question: "Public display of affection that makes people uncomfortable", deck: "normal" },
    { id: "n72", question: "Being pulled in for a kiss out of nowhere", deck: "normal" },
    { id: "n73", question: "A spontaneous weekend where anything goes", deck: "normal" },
    { id: "n74", question: "Sneaking off from a party to be alone together", deck: "normal" },
    { id: "n75", question: "Being the couple everyone is jealous of", deck: "normal" },
    { id: "n76", question: "Staying in bed all day without guilt", deck: "normal" },
    { id: "n77", question: "Being completely undistracted by anyone else in a room full of people", deck: "normal" },
    { id: "n78", question: "A night where you both just say yes to everything", deck: "normal" },
    { id: "n79", question: "Being carried over the threshold", deck: "normal" },
    { id: "n80", question: "A midnight swim somewhere you probably shouldn't be", deck: "normal" },

    // ✨ Wildcard & Unique
    { id: "n81", question: "Having a signature song that's actually yours", deck: "normal" },
    { id: "n82", question: "Cooking a full fancy meal dressed up with candles", deck: "normal" },
    { id: "n83", question: "Getting caught in the rain with nowhere to go", deck: "normal" },
    { id: "n84", question: "Finding a hidden spot that becomes 'your place'", deck: "normal" },
    { id: "n85", question: "Riding a motorbike through mountain roads together", deck: "normal" },
    { id: "n86", question: "Having a food fight that gets completely out of hand", deck: "normal" },
    { id: "n87", question: "Horseback riding on a beach at golden hour", deck: "normal" },
    { id: "n88", question: "Getting snowed in together with no responsibilities", deck: "normal" },
    { id: "n89", question: "Having a stranger think you just fell in love", deck: "normal" },
    { id: "n90", question: "Creating something together that outlasts you both", deck: "normal" },
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
