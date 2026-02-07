export interface FlagCard {
    id: string;
    scenario: string;
}

// 100+ flag scenarios - mix of potential red, green, and beige flags
export const flagCards: FlagCard[] = [
    // Relationship & Dating
    { id: "f1", scenario: "They remember your coffee order exactly" },
    { id: "f2", scenario: "They still talk about their ex in the first 5 minutes" },
    { id: "f3", scenario: "They talk to their plants like they are people" },
    { id: "f4", scenario: "They only eat the crust of the pizza" },
    { id: "f5", scenario: "They don't like music" },
    { id: "f6", scenario: "They treat waiters like best friends" },
    { id: "f7", scenario: "They check their phone during dinner" },
    { id: "f8", scenario: "They plan dates weeks in advance" },
    { id: "f9", scenario: "They're still friends with all their exes" },
    { id: "f10", scenario: "They say 'I love you' on the first date" },

    // Communication
    { id: "f11", scenario: "They double text without waiting for a reply" },
    { id: "f12", scenario: "They take 3 days to respond to texts" },
    { id: "f13", scenario: "They only communicate through memes" },
    { id: "f14", scenario: "They send good morning texts every single day" },
    { id: "f15", scenario: "They leave voicemails instead of texting" },
    { id: "f16", scenario: "They use 'we' after knowing you for a week" },
    { id: "f17", scenario: "They never use emojis" },
    { id: "f18", scenario: "They respond with 'K' to long messages" },
    { id: "f19", scenario: "They call instead of texting" },
    { id: "f20", scenario: "They screenshot conversations" },

    // Lifestyle
    { id: "f21", scenario: "They wake up at 5am to work out" },
    { id: "f22", scenario: "They've never made their bed in their life" },
    { id: "f23", scenario: "They have 47 unread emails" },
    { id: "f24", scenario: "They meal prep for the entire week" },
    { id: "f25", scenario: "They shower at night, not in the morning" },
    { id: "f26", scenario: "They sleep with socks on" },
    { id: "f27", scenario: "They don't own a TV" },
    { id: "f28", scenario: "They have a skincare routine with 12 steps" },
    { id: "f29", scenario: "They never charge their phone past 80%" },
    { id: "f30", scenario: "They iron their underwear" },

    // Social Media
    { id: "f31", scenario: "They post couple photos on day one" },
    { id: "f32", scenario: "They have no social media at all" },
    { id: "f33", scenario: "They still have photos with their ex online" },
    { id: "f34", scenario: "They like posts from 3 years ago" },
    { id: "f35", scenario: "They have a finsta" },
    { id: "f36", scenario: "They check your following list regularly" },
    { id: "f37", scenario: "They post every meal they eat" },
    { id: "f38", scenario: "They have more followers than friends" },
    { id: "f39", scenario: "They unfollow if you don't follow back" },
    { id: "f40", scenario: "They comment on all your posts immediately" },

    // Food & Eating
    { id: "f41", scenario: "They put ketchup on everything" },
    { id: "f42", scenario: "They eat pizza with a fork and knife" },
    { id: "f43", scenario: "They don't like chocolate" },
    { id: "f44", scenario: "They order the same thing every time" },
    { id: "f45", scenario: "They take photos of food before eating" },
    { id: "f46", scenario: "They mix all their food together on the plate" },
    { id: "f47", scenario: "They chew with their mouth open" },
    { id: "f48", scenario: "They season food before tasting it" },
    { id: "f49", scenario: "They dip fries in their milkshake" },
    { id: "f50", scenario: "They eat dessert before the main course" },

    // Money & Spending
    { id: "f51", scenario: "They split the bill down to the cent" },
    { id: "f52", scenario: "They always offer to pay" },
    { id: "f53", scenario: "They have no savings at 30" },
    { id: "f54", scenario: "They use spreadsheets for personal budgets" },
    { id: "f55", scenario: "They buy luxury items but live in a tiny apartment" },
    { id: "f56", scenario: "They tip exactly 15%, no more, no less" },
    { id: "f57", scenario: "They still use cash for everything" },
    { id: "f58", scenario: "They have 5 different investment apps" },
    { id: "f59", scenario: "They borrow money and forget to pay back" },
    { id: "f60", scenario: "They keep receipts for everything" },

    // Home & Living
    { id: "f61", scenario: "Their plants are all fake" },
    { id: "f62", scenario: "They have a shoe-free home policy" },
    { id: "f63", scenario: "They still live with their parents at 35" },
    { id: "f64", scenario: "They have LED lights in every room" },
    { id: "f65", scenario: "Their bathroom has no hand towels" },
    { id: "f66", scenario: "They have a 'chair' for clothes instead of a closet" },
    { id: "f67", scenario: "They own more candles than furniture" },
    { id: "f68", scenario: "They have an air purifier in every room" },
    { id: "f69", scenario: "They don't own a single book" },
    { id: "f70", scenario: "They have a dedicated gaming setup" },

    // Personality
    { id: "f71", scenario: "They're always 10 minutes early" },
    { id: "f72", scenario: "They're always 10 minutes late" },
    { id: "f73", scenario: "They've never watched a Marvel movie" },
    { id: "f74", scenario: "They cry during every movie" },
    { id: "f75", scenario: "They remember everyone's birthday" },
    { id: "f76", scenario: "They apologize too much" },
    { id: "f77", scenario: "They never apologize" },
    { id: "f78", scenario: "They laugh at their own jokes before finishing" },
    { id: "f79", scenario: "They correct people's grammar" },
    { id: "f80", scenario: "They have a podcast about their life" },

    // Quirks
    { id: "f81", scenario: "They name their car" },
    { id: "f82", scenario: "They believe in astrology unironically" },
    { id: "f83", scenario: "They've memorized their credit card number" },
    { id: "f84", scenario: "They have a collection of something weird" },
    { id: "f85", scenario: "They still watch cartoons as an adult" },
    { id: "f86", scenario: "They narrate their life in third person" },
    { id: "f87", scenario: "They dance in elevators" },
    { id: "f88", scenario: "They wave at dogs but not their owners" },
    { id: "f89", scenario: "They read the terms and conditions" },
    { id: "f90", scenario: "They have lucky underwear" },

    // Red Flags
    { id: "f91", scenario: "They don't have any close friends" },
    { id: "f92", scenario: "They badmouth every ex they've had" },
    { id: "f93", scenario: "They never take responsibility for mistakes" },
    { id: "f94", scenario: "They get angry at small inconveniences" },
    { id: "f95", scenario: "They keep score in the relationship" },
    { id: "f96", scenario: "They make fun of your hobbies" },
    { id: "f97", scenario: "They compare you to their ex" },
    { id: "f98", scenario: "They're rude to service workers" },
    { id: "f99", scenario: "They check your phone when you're asleep" },
    { id: "f100", scenario: "They gaslight you about things you said" },

    // Additional scenarios
    { id: "f101", scenario: "They have a stuffed animal on their bed at 28" },
    { id: "f102", scenario: "They've never been to a concert" },
    { id: "f103", scenario: "They drink orange juice after brushing teeth" },
    { id: "f104", scenario: "They put milk before cereal" },
    { id: "f105", scenario: "They clap when the plane lands" },
    { id: "f106", scenario: "They use speakerphone in public" },
    { id: "f107", scenario: "They know all the words to every song" },
    { id: "f108", scenario: "They haven't changed their passwords in 5 years" },
    { id: "f109", scenario: "They still quote Vines in 2024" },
    { id: "f110", scenario: "They pretend to text to avoid conversations" },
    { id: "f111", scenario: "They take notes during arguments" },
    { id: "f112", scenario: "They romanticize their own life" },
    { id: "f113", scenario: "They create Spotify playlists for every mood" },
    { id: "f114", scenario: "They have a vision board" },
    { id: "f115", scenario: "They journal every single day" },
    { id: "f116", scenario: "They've seen The Office 10+ times" },
    { id: "f117", scenario: "They refer to celebrities by first name only" },
    { id: "f118", scenario: "They don't make eye contact during conversations" },
    { id: "f119", scenario: "They have opinions on font choices" },
    { id: "f120", scenario: "They correct you in public" },
];

// Seeded random number generator for consistent shuffle across clients
function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function getFlagCards(count: number, seed?: number): FlagCard[] {
    const shuffled = [...flagCards];
    let currentSeed = seed ?? Math.random() * 10000;

    // Fisher-Yates shuffle with seeded random
    for (let i = shuffled.length - 1; i > 0; i--) {
        currentSeed = seededRandom(currentSeed * (i + 1));
        const j = Math.floor(currentSeed * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return exactly the requested number of cards (no repeats)
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
