// Wavelength Game Card Decks

export interface Card {
    left: string;
    right: string;
}

// FUN DECK: General, subjective, low-stakes spectra
// Quality Check: Must be a continuous spectrum, not a binary choice.
export const funDeck: Card[] = [
    // 🧠 Perception & Judgment — great for debate
    { left: "Underrated", right: "Overrated" },
    { left: "Mainstream", right: "Niche" },
    { left: "Guilty Pleasure", right: "Proudly Love" },
    { left: "Trashy", right: "Classy" },
    { left: "Unfashionable", right: "Fashionable" },
    { left: "Timeless", right: "Trendy" },
    { left: "Iconic", right: "Forgotten" },
    { left: "Ahead of Its Time", right: "Behind the Times" },
    { left: "Wholesome", right: "Edgy" },
    { left: "Pretentious", right: "Unpretentious" },
    { left: "Cringe", right: "Cool" },
    { left: "Controversial", right: "Universally Loved" },
    { left: "Acquired Taste", right: "Instantly Likeable" },

    // 🌡️ Sensation & Experience — super playable
    { left: "Relaxing", right: "Exhilarating" },
    { left: "Satisfying", right: "Frustrating" },
    { left: "Comforting", right: "Unsettling" },
    { left: "Addictive", right: "One and Done" },
    { left: "Chaotic", right: "Peaceful" },
    { left: "Nostalgic", right: "Futuristic" },
    { left: "Cozy", right: "Intense" },
    { left: "Boring", right: "Overwhelming" },
    { left: "Subtle", right: "In Your Face" },

    // 🎭 Nature of things — rich for creative clues
    { left: "Simple", right: "Complex" },
    { left: "Slow Burn", right: "Instant Hit" },
    { left: "Quantity", right: "Quality" },
    { left: "Function", right: "Form" },
    { left: "Process", right: "Result" },
    { left: "Journey", right: "Destination" },
    { left: "Rare", right: "Common" },
    { left: "Temporary", right: "Permanent" },
    { left: "Happens Slowly", right: "Happens Suddenly" },
    { left: "Easy to Start", right: "Hard to Finish" },
    { left: "Easy to Learn", right: "Takes a Lifetime to Master" },
    { left: "Better Young", right: "Better with Age" },
    { left: "Peaks Early", right: "Peaks Late" },
    { left: "Too Much", right: "Never Enough" },
    { left: "Needs Context", right: "Self-Explanatory" },
    { left: "Better in Theory", right: "Better in Practice" },

    // 🧬 Human nature & personality — great personal debate
    { left: "Introvert", right: "Extrovert" },
    { left: "Spontaneous", right: "Planned" },
    { left: "Optimistic", right: "Pessimistic" },
    { left: "Idealist", right: "Realist" },
    { left: "Traditional", right: "Modern" },
    { left: "Better Alone", right: "Better Together" },
    { left: "Head", right: "Heart" },
    { left: "Nature", right: "Nurture" },
    { left: "Talent", right: "Hard Work" },
    { left: "Luck", right: "Skill" },
    { left: "Safety", right: "Freedom" },
    { left: "Justice", right: "Mercy" },
    { left: "Create", right: "Consume" },
    { left: "Lead", right: "Follow" },
    { left: "Teach", right: "Learn" },
    { left: "Speak", right: "Listen" },

    // 🍕 Physical & Sensory — very grounded, great for clues
    { left: "Smells Terrible", right: "Smells Amazing" },
    { left: "Tastes Awful", right: "Tastes Incredible" },
    { left: "Ugly", right: "Beautiful" },
    { left: "Soft", right: "Hard" },
    { left: "Quiet", right: "Loud" },
    { left: "Rough", right: "Smooth" },
    { left: "Bright", right: "Dark" },
    { left: "Tiny", right: "Massive" },
    { left: "Freezing", right: "Scorching" },
    { left: "Wet", right: "Dry" },
    { left: "Needs Sauce", right: "Perfect Plain" },

    // 🌍 Society & culture — sparks real discussion
    { left: "Tourist", right: "Local" },
    { left: "Job", right: "Calling" },
    { left: "Overpaid", right: "Underpaid" },
    { left: "Public", right: "Private" },
    { left: "Order", right: "Chaos" },
    { left: "Utopian", right: "Dystopian" },
    { left: "Fact", right: "Opinion" },
    { left: "Physical", right: "Digital" },
    { left: "Art", right: "Commerce" },
    { left: "Fantasy", right: "Sci-Fi" },
    { left: "Small Talk", right: "Deep Conversation" },
    { left: "Meaningful", right: "Meaningless" },

    // 🎲 Wildcards — spicy, unexpected, fun
    { left: "The Opening", right: "The Ending" },
    { left: "The Sequel", right: "The Original" },
    { left: "The Rule", right: "The Exception" },
    { left: "The Villain", right: "The Hero" },
    { left: "The Warning Label", right: "The Thing Itself" },
    { left: "Monday Energy", right: "Friday Energy" },
    { left: "Main Character", right: "Background Character" },
    { left: "Red Flag", right: "Green Flag" },
    { left: "A Chore", right: "A Treat" },
    { left: "Too Real", right: "Pure Escapism" },
    { left: "Takes Over Your Life", right: "Easily Left Behind" },
    { left: "Needs an Instruction Manual", right: "Just Feels Intuitive" },
    { left: "Hits Different at 3am", right: "Hits Different at Noon" },
];

// SPICY DECK: Relationships, dating, social dynamics, red flags (NO SEX)
// Quality Check: Every card must be a genuine relationship spectrum with interesting midpoints.
export const spicyDeck: Card[] = [
    // 🚩 Dating & Attraction
    { left: "Instant Ick", right: "Instant Crush" },
    { left: "Deal Breaker", right: "Overlooked Completely" },
    { left: "Ghost Them", right: "Marry Them" },
    { left: "Rebound", right: "The One" },
    { left: "Sliding Into DMs", right: "Playing Hard to Get" },
    { left: "Too Eager", right: "Too Aloof" },
    { left: "Bad First Date", right: "Perfect First Date" },
    { left: "Love At First Sight", right: "Grows On You" },
    { left: "Butterflies", right: "Comfort" },
    { left: "Lust", right: "Love" },

    // 🧨 Relationship Red Flags vs Green Flags
    { left: "Red Flag", right: "Green Flag" },
    { left: "Toxic Trait", right: "Lovable Quirk" },
    { left: "Harmless Flirting", right: "Emotional Cheating" },
    { left: "Forgivable", right: "Unforgivable" },
    { left: "Controlling", right: "Protective" },
    { left: "Jealous", right: "Secure" },
    { left: "Clingy", right: "Distant" },
    { left: "Secretive", right: "Open Book" },
    { left: "Possessive", right: "Trusting" },
    { left: "Player", right: "Loyal" },

    // 💬 Communication & Drama
    { left: "Never Fights", right: "Fights About Everything" },
    { left: "Says Sorry First", right: "Never Apologizes" },
    { left: "Petty", right: "Unbothered" },
    { left: "Vents To Everyone", right: "Suffers In Silence" },
    { left: "Passive Aggressive", right: "Direct" },
    { left: "Bad Communicator", right: "Talks It Out" },
    { left: "Holds Grudges", right: "Forgives Easily" },
    { left: "Overshares", right: "Says Nothing" },
    { left: "Truth", right: "White Lie" },
    { left: "Just Friends", right: "Definitely More" },

    // 💍 Commitment & Lifestyle
    { left: "Too Young", right: "Too Old" },
    { left: "Soulmate", right: "Right Person, Wrong Time" },
    { left: "Wedding Obsessed", right: "Avoids the Topic" },
    { left: "Wants Kids Immediately", right: "Never Wants Kids" },
    { left: "Work First", right: "Relationship First" },
    { left: "Needs Space", right: "Inseparable" },
    { left: "Friend Zone", right: "Marriage Material" },
    { left: "Spontaneous", right: "Plans Everything" },
    { left: "High Maintenance", right: "Goes With the Flow" },
    { left: "Selfish", right: "Selfless" },

    // 🎭 Personality Vibes
    { left: "Villain Energy", right: "Main Character Energy" },
    { left: "Arrogant", right: "Quietly Confident" },
    { left: "Emotional", right: "Stoic" },
    { left: "Party Animal", right: "Homebody" },
    { left: "Impulsive Spender", right: "Budgets Everything" },
    { left: "Chaotic", right: "Grounded" },
    { left: "Adventurous", right: "Creature of Habit" },
    { left: "Idealist", right: "Cynic" },
    { left: "Funny", right: "Dead Serious" },
    { left: "Traditional", right: "Unconventional" },

    // 💡 Philosophical Relationship Questions
    { left: "Looks", right: "Personality" },
    { left: "Brain", right: "Heart" },
    { left: "Fate", right: "Choice" },
    { left: "Money", right: "Time Together" },
    { left: "Passion", right: "Stability" },
    { left: "Forgive", right: "Move On Without Forgiving" },
    { left: "Long Distance", right: "Same City" },
    { left: "Met Online", right: "Met In Real Life" },
    { left: "Love Languages: Touch", right: "Love Languages: Words" },
    { left: "Past Matters", right: "Past Doesn't Define You" },
];

// ADULT DECK (18+): Sex, kinks, explicit topics
// Quality Check: Explicit spectrums with genuine debatable midpoints.
export const adultDeck: Card[] = [
    // 🌡️ The Basics — core intensity spectra
    { left: "Vanilla", right: "Extremely Kinky" },
    { left: "Gentle", right: "Rough" },
    { left: "Silent", right: "Wakes The Neighbors" },
    { left: "Quickie", right: "All Night" },
    { left: "Lights Off", right: "Lights Blazing" },
    { left: "Planned In Advance", right: "Completely Spontaneous" },
    { left: "Romantic", right: "Pure Filth" },
    { left: "Sensual", right: "Raw" },
    { left: "Sober", right: "Drunk" },

    // 🎭 Roles & Dynamics
    { left: "Dominant", right: "Submissive" },
    { left: "Top", right: "Bottom" },
    { left: "Total Giver", right: "Total Taker" },
    { left: "Safe Word Required", right: "No Holds Barred" },
    { left: "Vanilla Roleplay", right: "Full Character Commitment" },
    { left: "Audience", right: "Performer" },

    // 📍 Setting & Situation
    { left: "In Bed", right: "Literally Anywhere" },
    { left: "Private", right: "Public Risk" },
    { left: "Morning", right: "Late Night" },
    { left: "Bedroom Only", right: "Adventurous Location" },
    { left: "Sexting", right: "In Person" },

    // 🧩 Emotional Register
    { left: "Pure Lust", right: "Deep Love" },
    { left: "Performance Mode", right: "Total Connection" },
    { left: "Cold & Calculated", right: "Lost In The Moment" },
    { left: "Eyes Closed", right: "Eye Contact Only" },
    { left: "Awkward", right: "Effortlessly Sexy" },
    { left: "Guilt After", right: "Zero Regrets" },
    { left: "Forbidden", right: "Totally Sanctioned" },
    { left: "One Night Only", right: "For Life" },

    // 🛠️ Technique & Preference
    { left: "No Props Needed", right: "Full Toy Collection" },
    { left: "Foreplay Forever", right: "Skip To The End" },
    { left: "Dirty Talk", right: "Complete Silence" },
    { left: "Going Commando", right: "Full Lingerie Spread" },
    { left: "Pain", right: "Pure Pleasure" },
    { left: "Visual Person", right: "All About Touch" },
    { left: "Instinct Only", right: "Follows A Script" },
    { left: "Experienced", right: "Total Beginner" },
    { left: "Taboo", right: "Totally Normal" },
    { left: "Fantasy", right: "Real Life Only" },
    { left: "Serious Business", right: "Laughing The Whole Time" },
    { left: "Selfish", right: "Completely Selfless" },
    { left: "Aggressive", right: "Completely Passive" },
    { left: "Head", right: "Heart" },
    { left: "Needs Prep", right: "Just Vibes" },
    { left: "One on One", right: "More The Merrier" },
    { left: "Familiar", right: "Total Stranger" },
];

// FOODIE DECK: Taste, cooking, dining
// Quality Check: Every card must be a genuine food/dining spectrum with a fun midpoint.
export const foodieDeck: Card[] = [
    // 🌶️ Taste & Flavor Spectra
    { left: "Revolting", right: "Life-Changing Delicious" },
    { left: "Dangerously Spicy", right: "Completely Bland" },
    { left: "Aggressively Sweet", right: "Deeply Savory" },
    { left: "One Flavor", right: "A Symphony of Flavors" },
    { left: "Bitter", right: "Sour" },
    { left: "Dry", right: "Dripping Wet" },
    { left: "Smells Like A Crime", right: "Smells Like Heaven" },
    { left: "Needs Hot Sauce", right: "Perfect Plain" },
    { left: "Too Salty", right: "Completely Underseasoned" },
    { left: "Tastes Like Sadness", right: "Tastes Like A Hug" },

    // 🍳 Cooking & Preparation
    { left: "Burnt Beyond Recognition", right: "Raw In The Middle" },
    { left: "Homemade With Love", right: "Ultra-Processed" },
    { left: "Takes 5 Minutes", right: "Took All Day" },
    { left: "5 Ingredients", right: "45 Ingredients" },
    { left: "Ugly Plating", right: "Looks Like Art" },
    { left: "Crunchy", right: "Mushy" },
    { left: "Smooth", right: "Aggressively Chunky" },
    { left: "Light and Airy", right: "Dense and Heavy" },
    { left: "Plain", right: "Drowning In Sauce" },
    { left: "Melted", right: "Frozen Solid" },

    // 🍽️ Dining Experience
    { left: "Roadside Stand", right: "Michelin Star Restaurant" },
    { left: "Eat In 30 Seconds", right: "3-Hour Tasting Menu" },
    { left: "Delivery At 2am", right: "Reservation 3 Months Ago" },
    { left: "Buffet Chaos", right: "Curated A La Carte" },
    { left: "Eating Alone", right: "Big Group Dinner" },
    { left: "Childhood Meal", right: "Sophisticated Adult Taste" },
    { left: "Comfort Food", right: "Avant-Garde Experiment" },
    { left: "Authentic", right: "Completely Westernized" },
    { left: "Breakfast", right: "Midnight Snack" },
    { left: "Wine Pairing", right: "Gas Station Drink" },

    // 🌍 Food Philosophy
    { left: "Strictly Vegan", right: "Eating Everything" },
    { left: "Eats For Fuel", right: "Lives To Eat" },
    { left: "Healthy", right: "Absolutely Not Healthy" },
    { left: "Sustainable", right: "Complete Waste" },
    { left: "Traditional Family Recipe", right: "Never Been Done Before" },
    { left: "Local Ingredients", right: "Flown In From Far Away" },
    { left: "Snack", right: "Full Meal Experience" },
    { left: "Cheap", right: "Absurdly Expensive" },
    { left: "A Bold Choice", right: "Crowd Pleaser" },
    { left: "Polarizing", right: "Universally Loved" },

    // 🤔 Food Debates
    { left: "Pineapple on Pizza", right: "Pineapple Belongs Nowhere Near Pizza" },
    { left: "Soup Is A Drink", right: "Soup Is A Food" },
    { left: "Hot Dogs Are Sandwiches", right: "Hot Dogs Are Not Sandwiches" },
    { left: "Well-Done Steak", right: "Barely Touched The Grill" },
    { left: "Ketchup On Eggs", right: "That Should Be Illegal" },
    { left: "Cilantro Is Delicious", right: "Cilantro Tastes Like Soap" },
    { left: "Breakfast Any Time", right: "Breakfast Only At Breakfast" },
    { left: "Cereal With Milk First", right: "Milk Then Cereal" },
    { left: "Eat The Crust", right: "Never Eat The Crust" },
    { left: "Dip It", right: "Never Dip It" },
];

// ABSURD DECK: Weird, hypothetical, philosophical nonsense
// Quality Check: Must spark debate, imagination, or confusion — in a fun way.
export const absurdDeck: Card[] = [
    // 🧟 Survival & Hypotheticals
    { left: "First To Die In A Horror Movie", right: "Last One Standing" },
    { left: "Would Survive Zombie Apocalypse", right: "Gets Bitten Day One" },
    { left: "Could Survive In Space", right: "Instantly Dies In Space" },
    { left: "Would Win In A Fight vs A Bear", right: "Zero Chance Against The Bear" },
    { left: "Useful In A Fight", right: "Completely Useless In A Fight" },
    { left: "Could Beat In A Race", right: "No Shot At Winning" },
    { left: "Could Befriend", right: "Would Immediately Run From" },
    { left: "Worth Going To Jail For", right: "Absolutely Not Worth It" },
    { left: "Brought To A Desert Island", right: "Last Thing You'd Pack" },

    // 🤪 Vibes & Classifications
    { left: "Totally Normal", right: "Deeply Unsettling" },
    { left: "Creepy", right: "Adorable" },
    { left: "Looks Dangerous", right: "Actually Quite Dangerous" },
    { left: "Tastes Like Chicken", right: "Tastes Like A Bad Decision" },
    { left: "Florida Man Headline", right: "Perfectly Normal News" },
    { left: "Conspiracy Theory", right: "Boring Documented Reality" },
    { left: "Alien Would Completely Get It", right: "Alien Would Be Baffled" },
    { left: "Should Definitely Exist", right: "Should Never Exist" },
    { left: "Good Invention", right: "Worst Invention Ever" },

    // 🐾 Animals & Nature
    { left: "Best Superpower", right: "Most Useless Superpower" },
    { left: "Scary Animal", right: "Cutest Animal" },
    { left: "Makes A Good Pet", right: "Terrible Pet Idea" },
    { left: "Horse-Sized Duck", right: "Duck-Sized Horses (100 of them)" },
    { left: "Useless Body Part", right: "Cannot Live Without It" },

    // 🎭 Naming & Identity
    { left: "Acceptable Pirate Name", right: "Terrible Pirate Name" },
    { left: "Good Last Words", right: "Worst Last Words Imaginable" },
    { left: "Would Name A Band", right: "Worst Band Name Ever" },
    { left: "Good Tattoo Idea", right: "You Will Regret That Tattoo" },
    { left: "Makes A Great Password", right: "Hacked In 2 Seconds" },
    { left: "Good Villain Name", right: "That Villain Isn't Scary At All" },

    // ⏰ Time & History
    { left: "Best Time To Travel To", right: "Worst Era To Be Alive" },
    { left: "Good Historical Era To Be Born", right: "Terrible Time To Exist" },
    { left: "Would Haunt As A Ghost", right: "Wouldn't Bother Haunting" },
    { left: "Brings To A Duel", right: "Never Appropriate For A Duel" },

    // 🌊 Physics & Logic
    { left: "Makes Sense Underwater", right: "Makes No Sense Underwater" },
    { left: "Would Survive Being Dropped", right: "Instantly Destroyed If Dropped" },
    { left: "Time Capsule Worthy", right: "Future People Would Be Confused" },
    { left: "Great Museum Exhibit", right: "No One Would Visit That Exhibit" },
    { left: "Could Start A Religion", right: "Nobody's Following That" },
];

// WORK DECK: Professional life, office politics
// Quality Check: Every card must be a genuine debatable workplace spectrum.
export const workDeck: Card[] = [
    // 💡 Work Philosophy
    { left: "Passion Project", right: "Just A Paycheck" },
    { left: "Dream Job", right: "Nightmare Job" },
    { left: "Career For Life", right: "Just Paying Bills" },
    { left: "Hard Work", right: "Smart Work" },
    { left: "Working To Live", right: "Living To Work" },
    { left: "Ambition", right: "Contentment" },
    { left: "Luck", right: "Pure Hard Work" },
    { left: "The Process", right: "The Result" },
    { left: "Failure", right: "Learning Opportunity" },
    { left: "Safe Career", right: "Big Risk" },

    // 🏢 Workplace Dynamics
    { left: "Startup", right: "Big Corporate" },
    { left: "Open Office", right: "Private Office" },
    { left: "Full Remote", right: "In Office Every Day" },
    { left: "Micromanaged", right: "Total Autonomy" },
    { left: "Strict Boss", right: "Best Friend Boss" },
    { left: "Work Friend", right: "Strictly Colleague" },
    { left: "Boss", right: "Mentor" },
    { left: "Team Player", right: "Lone Wolf" },
    { left: "Leader", right: "Individual Contributor" },
    { left: "Talking It Out", right: "Long Email Chain" },

    // 📋 Time & Output
    { left: "Workaholic", right: "Mentally Checked Out" },
    { left: "Always First In", right: "Last To Arrive" },
    { left: "Replies Instantly", right: "Seen 3 Days Ago" },
    { left: "Strict 9 to 5", right: "Works All Hours" },
    { left: "Deadline", right: "More Of A Guideline" },
    { left: "Organized", right: "Controlled Chaos" },
    { left: "Doer", right: "Over-Planner" },
    { left: "Big Picture", right: "Devil In The Details" },
    { left: "Monday Morning", right: "Friday Afternoon" },
    { left: "Proactive", right: "Reactive" },

    // 🎭 Personality at Work
    { left: "Professional", right: "Brings Their Whole Self" },
    { left: "Formal Suit", right: "Hoodie And Sweatpants" },
    { left: "Talker In Meetings", right: "Sends Thoughts Via Email Later" },
    { left: "Credit Taker", right: "Deflects All Praise" },
    { left: "Overpromises", right: "Under-promises And Overdelivers" },
    { left: "Blunt Feedback", right: "Softest Possible Delivery" },
    { left: "Creative", right: "Analytical" },
    { left: "Qualified On Paper", right: "Learns On The Job" },
    { left: "Underpaid", right: "Overpaid" },
    { left: "Stressful", right: "Genuinely Peaceful" },

    // 💰 Rewards & Culture
    { left: "Cash Bonus", right: "Company Swag" },
    { left: "Promotion", right: "Lateral Move" },
    { left: "Vacation Days", right: "Unlimited PTO That No One Uses" },
    { left: "Performance Review", right: "Vibe Check" },
    { left: "Real Culture", right: "Ping-Pong Table Culture" },
    { left: "Quiet Quitting", right: "Going Above And Beyond" },
    { left: "Negotiated Salary", right: "Took Whatever They Offered" },
    { left: "Side Hustle", right: "One Job, All In" },
    { left: "Meeting That Could Have Been An Email", right: "Email That Needed A Meeting" },
    { left: "Overqualified", right: "Just Winging It" },
];

// TRAVEL DECK: Vacation, exploration, transit
// Quality Check: Every card must be a genuine debatable travel spectrum.
export const travelDeck: Card[] = [
    // 🌍 Trip Philosophy
    { left: "Tourist Trap", right: "Hidden Local Gem" },
    { left: "Fully Planned Itinerary", right: "No Plan Whatsoever" },
    { left: "Journey Matters", right: "Just Get There" },
    { left: "Staying Home", right: "Never Stop Traveling" },
    { left: "Safe Destination", right: "Off The Beaten Path" },
    { left: "Solo", right: "Giant Tour Group" },
    { left: "Work Trip", right: "Pure Vacation" },
    { left: "Staycation", right: "Other Side Of The World" },
    { left: "Relaxing Beach", right: "Non-Stop Activities" },
    { left: "Culture Shock", right: "Feels Like Home" },

    // 🏨 Accommodation & Budget
    { left: "Five-Star Resort", right: "Hostel Dorm Bed" },
    { left: "Luxury Hotel", right: "Camping Under Stars" },
    { left: "Airbnb", right: "Traditional Hotel" },
    { left: "First Class", right: "Middle Seat Economy" },
    { left: "Renting A Car", right: "Public Transit Only" },
    { left: "Splurge Trip", right: "Shoestring Budget" },
    { left: "All-Inclusive", right: "Figure It Out Locally" },
    { left: "Book 6 Months Ahead", right: "Book The Night Before" },

    // 🚂 Transport
    { left: "Flying", right: "Slow Road Trip" },
    { left: "Train", right: "Bus" },
    { left: "Aisle Seat", right: "Window Seat" },
    { left: "Carry-On Only", right: "Checked 3 Bags" },
    { left: "Overpacker", right: "Packed In 10 Minutes" },
    { left: "Delayed 4 Hours", right: "Boarded Early" },
    { left: "Jet Lag Destroyed Me", right: "Instant Adjustment" },

    // 🗺️ Exploration Style
    { left: "Museum Day", right: "Nightclub Night" },
    { left: "History Tour", right: "Shopping District" },
    { left: "Eat Only Local Food", right: "Found A McDonald's" },
    { left: "Visit Every Landmark", right: "Just Wandered Around" },
    { left: "Guidebook", right: "Pure GPS" },
    { left: "Speaks The Language", right: "Pointing And Gesturing" },
    { left: "Blends In", right: "Clearly A Tourist" },
    { left: "Photo Every 5 Seconds", right: "Didn't Take A Single Photo" },
    { left: "Souvenir Collector", right: "Never Buys Souvenirs" },
    { left: "Tries Everything", right: "Sticks To Safe Choices" },

    // 🌅 Vibe
    { left: "City", right: "Remote Nature" },
    { left: "Beach", right: "Mountains" },
    { left: "Hot Climate", right: "Freezing Cold" },
    { left: "Crowded and Buzzing", right: "Empty and Peaceful" },
    { left: "Authentic", right: "Totally Touristy" },
    { left: "Familiar Comfort", right: "Completely Unknown" },
    { left: "Domestic", right: "International" },
    { left: "Feels Like An Adventure", right: "Extremely Stressful" },
    { left: "Changed My Life", right: "Just A Nice Break" },
    { left: "I Want To Move Here", right: "Never Coming Back" },
];

// SPORTS DECK: Athleticism, competition
// Quality Check: Every card must be a genuine sports/athletics spectrum.
export const sportsDeck: Card[] = [
    // 🧠 Skill vs Other Factors
    { left: "Pure Luck", right: "Pure Skill" },
    { left: "Raw Talent", right: "Years Of Training" },
    { left: "Physical", right: "Mostly Mental" },
    { left: "Strategy", right: "Pure Instinct" },
    { left: "Precision", right: "Brute Power" },
    { left: "Graceful", right: "Brutal" },
    { left: "Endurance", right: "Explosive Speed" },
    { left: "Consistent", right: "One Big Moment" },
    { left: "Defense", right: "Offense" },
    { left: "Comeback Artist", right: "Blows The Lead" },

    // 🏅 Competition & Stakes
    { left: "Playing For Fun", right: "Winning Is Everything" },
    { left: "Gold Medal", right: "Participation Trophy" },
    { left: "Fair Play", right: "Bending Every Rule" },
    { left: "Clean Athlete", right: "Doping Scandal" },
    { left: "Amateur", right: "Professional" },
    { left: "Hobby", right: "Career" },
    { left: "Casual Sunday League", right: "Elite Competition" },
    { left: "Team Glory", right: "Individual Records" },
    { left: "The Underdog", right: "The Favorite" },
    { left: "Trash Talker", right: "Let The Game Do The Talking" },

    // 📺 Watchability & Culture
    { left: "Incredibly Fun To Play", right: "Incredibly Boring To Play" },
    { left: "Riveting To Watch", right: "Unwatchable" },
    { left: "Cult Following", right: "Global Sport" },
    { left: "Niche", right: "Mainstream" },
    { left: "Cheap To Get Into", right: "Gear Costs A Fortune" },
    { left: "Crowd Is Loud", right: "Crowd Is Silent" },
    { left: "The Ref", right: "The Fan" },
    { left: "Old Tradition", right: "Brand New Sport" },
    { left: "Hometown Team", right: "Global Franchise" },

    // 🏋️ Format & Setting
    { left: "Individual", right: "Team" },
    { left: "Contact Sport", right: "No Contact" },
    { left: "Indoor", right: "Outdoor" },
    { left: "Summer", right: "Winter" },
    { left: "Short Sprint", right: "Multi-Hour Marathon" },
    { left: "Scored By Points", right: "Scored By Style" },
    { left: "Rain Game", right: "Perfect Conditions" },

    // 🌟 Players & Careers
    { left: "The Legend", right: "The Rookie" },
    { left: "MVP", right: "Benchwarmer" },
    { left: "The Captain", right: "The Substitute" },
    { left: "Retired Too Early", right: "Stayed Too Long" },
    { left: "Plays Through Injuries", right: "Takes The Bench" },
    { left: "Greatest Of All Time", right: "One Hit Wonder" },
    { left: "Known Worldwide", right: "Local Hero" },
    { left: "Healthy Lifestyle", right: "Takes A Serious Toll" },
    { left: "Friendly Rivalry", right: "Bitter Enemies" },
    { left: "The Hero", right: "The Villain" },
];

// Deck types
export type DeckType = "fun" | "spicy" | "adult" | "foodie" | "absurd" | "work" | "travel" | "sports";

// Deck metadata for UI
export const DECK_INFO: Record<DeckType, { name: string; count: number; emoji: string }> = {
    fun: { name: "Fun", count: 100, emoji: "🎲" },
    spicy: { name: "Spicy", count: 50, emoji: "🌶️" },
    adult: { name: "18+", count: 50, emoji: "🔞" },
    foodie: { name: "Foodie", count: 50, emoji: "🍕" },
    absurd: { name: "Absurd", count: 50, emoji: "🤪" },
    work: { name: "Work & Colleagues", count: 50, emoji: "💼" },
    travel: { name: "Travel", count: 50, emoji: "✈️" },
    sports: { name: "Sports", count: 50, emoji: "⚽" },
};

// All decks map
const DECKS: Record<DeckType, Card[]> = {
    fun: funDeck,
    spicy: spicyDeck,
    adult: adultDeck,
    foodie: foodieDeck,
    absurd: absurdDeck,
    work: workDeck,
    travel: travelDeck,
    sports: sportsDeck,
};

export function getRandomCard(deck: DeckType | "random"): Card {
    let selectedDeck: Card[];

    if (deck === "random") {
        const deckTypes = Object.keys(DECKS) as DeckType[];
        const randomDeckType = deckTypes[Math.floor(Math.random() * deckTypes.length)];
        selectedDeck = DECKS[randomDeckType];
    } else {
        selectedDeck = DECKS[deck];
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
