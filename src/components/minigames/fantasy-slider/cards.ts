export type DeckType = "normal" | "lust" | "bucketlist";

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
    bucketlist: {
        name: "Bucket List 🌍",
        emoji: "🌍",
        description: "Dream experiences and adventures to share together.",
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

    // ✨ Dream Dates & Simple Pleasures
    { id: "n91", question: "Getting lost together in a massive museum", deck: "normal" },
    { id: "n92", question: "Painting each other's portraits terribly on purpose", deck: "normal" },
    { id: "n93", question: "Sharing a tiny umbrella in a sudden downpour", deck: "normal" },
    { id: "n94", question: "Being the last two people on the dancefloor at a wedding", deck: "normal" },
    { id: "n95", question: "Staying up late just to watch a meteor shower", deck: "normal" },
    { id: "n96", question: "Building a ridiculous blanket fort on a rainy Sunday", deck: "normal" },
    { id: "n97", question: "Leaving a fancy party early to eat fast food in the car", deck: "normal" },
    { id: "n98", question: "Having a deeply philosophical conversation at 3 AM", deck: "normal" },
    { id: "n99", question: "Losing power during a storm and lighting candles everywhere", deck: "normal" },
    { id: "n100", question: "Curating a dedicated playlist just for road trips together", deck: "normal" },

    // 🌍 Shared Adventures & Milestones
    { id: "n101", question: "Going to a drive-in movie and sitting on the hood of the car", deck: "normal" },
    { id: "n102", question: "Renting a tandem bicycle and failing miserably but laughing", deck: "normal" },
    { id: "n103", question: "Sneaking a secret love note into their luggage before a trip", deck: "normal" },
    { id: "n104", question: "Learning a new language together just for a future vacation", deck: "normal" },
    { id: "n105", question: "Getting matching, very subtle tattoos", deck: "normal" },
    { id: "n106", question: "Singing karaoke together and being the most obnoxious duet", deck: "normal" },
    { id: "n107", question: "Spending a completely exhausting but fun day at an amusement park", deck: "normal" },
    { id: "n108", question: "Walking through a botanical garden silently holding hands", deck: "normal" },
    { id: "n109", question: "Getting completely mesmerized by jellyfish at a dark aquarium", deck: "normal" },
    { id: "n110", question: "Sharing a massive milkshake with two straws", deck: "normal" },

    // 🎨 Creative & Messy Moments
    { id: "n111", question: "Trying to bake a complex dessert, ruining it, and eating the mess", deck: "normal" },
    { id: "n112", question: "Having a perfect sunset picnic by a quiet lake", deck: "normal" },
    { id: "n113", question: "Eating way too much fried food at a local summer festival", deck: "normal" },
    { id: "n114", question: "Taking a spontaneous, blurry polaroid picture capturing a perfect moment", deck: "normal" },
    { id: "n115", question: "Waking up at dawn just to get fresh pastries from the bakery", deck: "normal" },
    { id: "n116", question: "Going thrift shopping and picking out terrible outfits for each other to wear", deck: "normal" },
    { id: "n117", question: "Taking a pottery class together and making lumpy but sentimental mugs", deck: "normal" },
    { id: "n118", question: "Taking a scenic train ride just for the view", deck: "normal" },
    { id: "n119", question: "A weekend in a cabin with absolutely zero cell service", deck: "normal" },
    { id: "n120", question: "Reading the exact same book at the exact same pace to discuss it", deck: "normal" },

    // 💖 Deep Connection
    { id: "n121", question: "A comforting hug from behind that lasts just a little longer than usual", deck: "normal" },
    { id: "n122", question: "Knowing exactly what the other person is going to order at a restaurant", deck: "normal" },
    { id: "n123", question: "Giving a knowing look across a crowded room", deck: "normal" },
    { id: "n124", question: "Falling asleep on their chest while watching a movie", deck: "normal" },
    { id: "n125", question: "Getting a completely unprompted compliment that makes your whole week", deck: "normal" },
    { id: "n126", question: "When they remember a tiny detail you mentioned months ago", deck: "normal" },
    { id: "n127", question: "Laughing so hard together that no sound comes out", deck: "normal" },
    { id: "n128", question: "A quiet morning drinking coffee without needing to say a word", deck: "normal" },
    { id: "n129", question: "That moment when you realize you're completely safe with them", deck: "normal" },
    { id: "n130", question: "When they accidentally use your catchphrase", deck: "normal" },

    // 🌙 Evening & Night
    { id: "n131", question: "Stargazing from the back of a pickup truck", deck: "normal" },
    { id: "n132", question: "A midnight grocery store run in pajamas", deck: "normal" },
    { id: "n133", question: "Falling asleep holding hands", deck: "normal" },
    { id: "n134", question: "Watching the city lights blur from a high-rise balcony", deck: "normal" },
    { id: "n135", question: "Listening to a thunderstorm roll in while safely indoors", deck: "normal" },
    { id: "n136", question: "A long, aimless drive with the windows down in summer", deck: "normal" },
    { id: "n137", question: "Waking up in the middle of the night just to pull them closer", deck: "normal" },
    { id: "n138", question: "Sharing secrets you've never told anyone else in the dark", deck: "normal" },
    { id: "n139", question: "A late-night diner visit after a concert", deck: "normal" },
    { id: "n140", question: "Dancing slowly in the living room with the lights off", deck: "normal" },

    // 🌿 Fun & Silly Vibe
    { id: "n141", question: "Having a fiercely competitive board game night", deck: "normal" },
    { id: "n142", question: "Building a ridiculous sandcastle together on the beach", deck: "normal" },
    { id: "n143", question: "Arguing over who loves the other more in a joking way", deck: "normal" },
    { id: "n144", question: "Doing a terrible synchronized dance routine in the kitchen", deck: "normal" },
    { id: "n145", question: "Accidentally wearing matching outfits and committing to it", deck: "normal" },
    { id: "n146", question: "Having an inside joke that nobody else understands but makes you crack up", deck: "normal" },
    { id: "n147", question: "Trying to assemble IKEA furniture together without breaking up", deck: "normal" },
    { id: "n148", question: "Taking terrible selfies from unflattering angles to send to each other", deck: "normal" },
    { id: "n149", question: "Going to a dog park even if you don't own a dog", deck: "normal" },
    { id: "n150", question: "Making a completely unrealistic bucket list for the future", deck: "normal" }
];

const lustDeck: FantasyCard[] = [
    // 🔥 Spontaneous & Charged Moments
    { id: "l1", question: "Being pulled into a room and kissed like they've been thinking about it all day", deck: "lust" },
    { id: "l2", question: "A quickie so urgent you don't even fully undress", deck: "lust" },
    { id: "l3", question: "Waking up to someone already wanting you", deck: "lust" },
    { id: "l4", question: "Getting a text that makes it very clear what's waiting for you at home", deck: "lust" },
    { id: "l5", question: "Sneaking off from a party and not coming back for an hour", deck: "lust" },
    { id: "l6", question: "Being pressed against a wall before you even say hello", deck: "lust" },
    { id: "l7", question: "A tension-filled car ride that leads somewhere neither of you planned", deck: "lust" },
    { id: "l8", question: "Someone not being able to wait until you get home", deck: "lust" },
    { id: "l9", question: "Sending a photo first and seeing how fast they respond", deck: "lust" },
    { id: "l10", question: "An entire evening of foreplay with no rush whatsoever", deck: "lust" },

    // 🌙 Slow Burn & Sensual
    { id: "l11", question: "A full-body massage with warm oil that slowly becomes something else", deck: "lust" },
    { id: "l12", question: "Watching each other undress without touching — just watching", deck: "lust" },
    { id: "l13", question: "Being blindfolded and not knowing what comes next", deck: "lust" },
    { id: "l14", question: "Temperature play — ice cubes tracing down your body", deck: "lust" },
    { id: "l15", question: "Being told exactly what to do and following every instruction", deck: "lust" },
    { id: "l16", question: "Dirty talk that starts hours before anything actually happens", deck: "lust" },
    { id: "l17", question: "Complete silence — just touch, no words", deck: "lust" },
    { id: "l18", question: "A slow striptease performed just for you", deck: "lust" },
    { id: "l19", question: "Being edged until you're completely at their mercy", deck: "lust" },
    { id: "l20", question: "Knowing someone is completely focused on your pleasure only", deck: "lust" },

    // 📍 Risky Locations
    { id: "l21", question: "Sex on a deserted beach at night", deck: "lust" },
    { id: "l22", question: "A fitting room rendezvous that gets out of hand", deck: "lust" },
    { id: "l23", question: "Joining the mile high club on a long-haul flight", deck: "lust" },
    { id: "l24", question: "Sex in the shower of a hotel room you just checked into", deck: "lust" },
    { id: "l25", question: "A balcony at night where anyone could look up", deck: "lust" },
    { id: "l26", question: "The back seat of a car in a parking lot", deck: "lust" },
    { id: "l27", question: "Skinny dipping that doesn't stay innocent for long", deck: "lust" },
    { id: "l28", question: "An outdoor location so remote you truly don't care", deck: "lust" },
    { id: "l29", question: "Sex in a changing room at a pool or gym", deck: "lust" },
    { id: "l30", question: "A luxury hotel suite with floor-to-ceiling windows over a city", deck: "lust" },

    // 🎭 Power & Roleplay
    { id: "l31", question: "Meeting as strangers at a bar and pretending you've never met", deck: "lust" },
    { id: "l32", question: "Full boss/employee power dynamic — completely in character", deck: "lust" },
    { id: "l33", question: "Being completely dominant for an entire night", deck: "lust" },
    { id: "l34", question: "Submitting completely and letting someone else take full control", deck: "lust" },
    { id: "l35", question: "Tying someone up with nothing but a silk scarf", deck: "lust" },
    { id: "l36", question: "Being tied up and completely at someone's mercy", deck: "lust" },
    { id: "l37", question: "Hair pulling at exactly the right moment", deck: "lust" },
    { id: "l38", question: "A playful wrestle that quickly stops being playful", deck: "lust" },
    { id: "l39", question: "Being spanked and genuinely enjoying it", deck: "lust" },
    { id: "l40", question: "Choking — just enough, with full trust", deck: "lust" },

    // 🪞 Visual & Exhibitionist
    { id: "l41", question: "Sex in front of a full-length mirror so you can watch everything", deck: "lust" },
    { id: "l42", question: "Taking spicy photos together and knowing they exist", deck: "lust" },
    { id: "l43", question: "Recording a video with total trust it stays private forever", deck: "lust" },
    { id: "l44", question: "Being watched by someone you want to watch you", deck: "lust" },
    { id: "l45", question: "Performing a striptease with actual music and full commitment", deck: "lust" },
    { id: "l46", question: "Watching your partner pleasure themselves while you're not allowed to touch", deck: "lust" },
    { id: "l47", question: "Reading erotica to each other in bed until something happens", deck: "lust" },
    { id: "l48", question: "Phone sex while one of you is traveling — so good you forget the distance", deck: "lust" },

    // 💥 Intensity & Kink
    { id: "l49", question: "Rough sex that leaves marks you actually want to have", deck: "lust" },
    { id: "l50", question: "Gentle sex so slow it becomes almost unbearable", deck: "lust" },
    { id: "l51", question: "Bringing a toy into bed for the first time together", deck: "lust" },
    { id: "l52", question: "Using a vibrator on your partner until they beg you to stop", deck: "lust" },
    { id: "l53", question: "Anal — trying it properly, with patience and trust", deck: "lust" },
    { id: "l54", question: "An oral marathon with one partner completely focused on the other", deck: "lust" },
    { id: "l55", question: "Both getting off without touching each other at all", deck: "lust" },
    { id: "l56", question: "Dripping wax or running ice — just to see how it feels", deck: "lust" },
    { id: "l57", question: "Wearing something under your clothes all day while they know", deck: "lust" },
    { id: "l58", question: "Doing it somewhere in your own home you've never tried before", deck: "lust" },

    // 🌶️ Fantasies & Scenarios
    { id: "l59", question: "A threesome — fully consented, no jealousy, just pure fun", deck: "lust" },
    { id: "l60", question: "Watching someone else while your partner watches your reaction", deck: "lust" },
    { id: "l61", question: "Having someone completely at your mercy with nowhere to be all night", deck: "lust" },
    { id: "l62", question: "Kitchen sex — starting while dinner is still on the stove", deck: "lust" },
    { id: "l63", question: "Shower sex that actually works — steam, mirrors, all of it", deck: "lust" },
    { id: "l64", question: "Sharing your most private fantasy out loud for the first time", deck: "lust" },
    { id: "l65", question: "Acting out a fantasy your partner described to you months ago", deck: "lust" },
    { id: "l66", question: "Lingerie that was picked specifically by your partner for you to wear", deck: "lust" },
    { id: "l67", question: "Middle-of-the-night sex where you're both half asleep and don't care", deck: "lust" },
    { id: "l68", question: "A massage that starts completely innocent and ends completely not", deck: "lust" },
    { id: "l69", question: "Whipped cream, strawberries, and zero dignity — fully committed to the bit", deck: "lust" },

    // ✨ Emotional-Erotic
    { id: "l70", question: "Intense eye contact the entire time — no looking away", deck: "lust" },
    { id: "l71", question: "Laughing during sex and it making everything hotter somehow", deck: "lust" },
    { id: "l72", question: "Crying from pleasure — not from pain, just pure overwhelm", deck: "lust" },
    { id: "l73", question: "Sex so good you talk about it for weeks afterward", deck: "lust" },
    { id: "l74", question: "First time with someone new — nerves and all", deck: "lust" },
    { id: "l75", question: "Being someone's absolute best ever", deck: "lust" },
    { id: "l76", question: "A morning-after so comfortable it feels like you've done this forever", deck: "lust" },
    { id: "l77", question: "Making someone lose control completely — and knowing you did that", deck: "lust" },
    { id: "l78", question: "Post-sex bath, completely tangled together, saying nothing", deck: "lust" },
    { id: "l79", question: "Being wanted so badly that someone literally shakes", deck: "lust" },
    { id: "l80", question: "Finishing and immediately wanting to go again", deck: "lust" },
];

const bucketlistDeck: FantasyCard[] = [
    { id: "bl1", question: "Watching the sunrise from a mountain top together", deck: "bucketlist" },
    { id: "bl2", question: "Renting a campervan and getting completely lost for a week", deck: "bucketlist" },
    { id: "bl3", question: "Swimming with bioluminescent plankton at midnight", deck: "bucketlist" },
    { id: "bl4", question: "Eating your way through street food markets in Tokyo", deck: "bucketlist" },
    { id: "bl5", question: "Dancing until sunrise at a festival abroad", deck: "bucketlist" },
    { id: "bl6", question: "Renting a boat with no plan and sailing for days", deck: "bucketlist" },
    { id: "bl7", question: "Watching the Northern Lights together in Iceland", deck: "bucketlist" },
    { id: "bl8", question: "Taking a cooking class in Italy and eating everything you make", deck: "bucketlist" },
    { id: "bl9", question: "Bungee jumping for the first time side by side", deck: "bucketlist" },
    { id: "bl10", question: "Staying in a treehouse hotel deep in a jungle", deck: "bucketlist" },
    { id: "bl11", question: "Driving Route 66 with no fixed itinerary", deck: "bucketlist" },
    { id: "bl12", question: "Attending a Grand Prix at Monaco or Silverstone", deck: "bucketlist" },
    { id: "bl13", question: "Going on an African safari and seeing the Big Five", deck: "bucketlist" },
    { id: "bl14", question: "Learning to surf on a remote beach somewhere tropical", deck: "bucketlist" },
    { id: "bl15", question: "Hot air balloon ride over ancient ruins at sunrise", deck: "bucketlist" },
    { id: "bl16", question: "Visiting all 7 Wonders of the World together", deck: "bucketlist" },
    { id: "bl17", question: "Skydiving over a coastline on a clear day", deck: "bucketlist" },
    { id: "bl18", question: "Staying overnight in a glass igloo under the stars", deck: "bucketlist" },
    { id: "bl19", question: "Attending Carnival in Rio or Mardi Gras in New Orleans", deck: "bucketlist" },
    { id: "bl20", question: "Backpacking through Southeast Asia with only carry-on bags", deck: "bucketlist" },
    { id: "bl21", question: "Seeing a space shuttle launch from a viewing site", deck: "bucketlist" },
    { id: "bl22", question: "Swimming in a natural cenote in Mexico", deck: "bucketlist" },
    { id: "bl23", question: "Attending the Olympics in person", deck: "bucketlist" },
    { id: "bl24", question: "Hiking to Machu Picchu and watching the fog lift", deck: "bucketlist" },
    { id: "bl25", question: "Renting a private villa in Santorini for a week", deck: "bucketlist" },
    { id: "bl26", question: "Visiting the Amalfi Coast by boat with no schedule", deck: "bucketlist" },
    { id: "bl27", question: "Flying first class together just once — fully leaning into it", deck: "bucketlist" },
    { id: "bl28", question: "Spending a full winter month in a remote snowy cabin", deck: "bucketlist" },
    { id: "bl29", question: "Learning a new language together and using it on the trip", deck: "bucketlist" },
    { id: "bl30", question: "Watching a meteor shower from the middle of a desert", deck: "bucketlist" },
    { id: "bl31", question: "Living in a foreign city for one month as locals", deck: "bucketlist" },
    { id: "bl32", question: "Spending New Year's Eve in a city neither of you has been to", deck: "bucketlist" },
    { id: "bl33", question: "Taking a long-haul train journey across a continent", deck: "bucketlist" },
    { id: "bl34", question: "Going scuba diving on the Great Barrier Reef", deck: "bucketlist" },
    { id: "bl35", question: "Joining a cooking class in Morocco and eating in a riad", deck: "bucketlist" },
    { id: "bl36", question: "White-water rafting down a major river", deck: "bucketlist" },
    { id: "bl37", question: "Visiting every continent together — even Antarctica", deck: "bucketlist" },
    { id: "bl38", question: "Slow travelling through a country for a full month with no hotels booked", deck: "bucketlist" },
    { id: "bl39", question: "Seeing cherry blossoms in Japan at peak bloom", deck: "bucketlist" },
    { id: "bl40", question: "Building or restoring something together — a house, a car, a garden", deck: "bucketlist" },
];

export function getCardsByDeck(deck: DeckType) {
    switch (deck) {
        case "normal":
            return normalDeck;
        case "lust":
            return lustDeck;
        case "bucketlist":
            return bucketlistDeck;
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
