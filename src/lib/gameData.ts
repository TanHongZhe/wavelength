// Wavelength Game Card Decks

export interface Card {
    left: string;
    right: string;
}

// FUN DECK: General, subjective, low-stakes spectra
// Quality Check: Must be a continuous spectrum, not a binary choice.
export const funDeck: Card[] = [
    { left: "Useless Superpower", right: "Useful Superpower" },
    { left: "Boring Hobby", right: "Interesting Hobby" },
    { left: "Bad Movie", right: "Good Movie" },
    { left: "Ugly Animal", right: "Cute Animal" },
    { left: "Waste of Time", right: "Good Use of Time" },
    { left: "Happens Slowly", right: "Happens Suddenly" },
    { left: "Temporary", right: "Permanent" },
    { left: "Local Problem", right: "Global Problem" },
    { left: "Uncool", right: "Cool" },
    { left: "Scary", right: "Funny" },
    { left: "Mainstream", right: "Niche" },
    { left: "Underrated", right: "Overrated" },
    { left: "Nature", right: "Nurture" },
    { left: "Talent", right: "Skill" },
    { left: "Sad Song", right: "Happy Song" },
    { left: "Easy to Do", right: "Hard to Do" },
    { left: "Cheap", right: "Expensive" },
    { left: "Guilty Pleasure", right: "Openly Love" },
    { left: "Unfashionable", right: "Fashionable" },
    { left: "Healthy", right: "Unhealthy" },
    { left: "Tastes Bad", right: "Tastes Good" },
    { left: "Smells Bad", right: "Smells Good" },
    { left: "Short", right: "Long" },
    { left: "Soft", right: "Hard" },
    { left: "Normal", right: "Weird" },
    { left: "Known", right: "Unknown" },
    { left: "Safe", right: "Dangerous" },
    { left: "Clean", right: "Dirty" },
    { left: "Wet", right: "Dry" },
    { left: "Quiet", right: "Loud" },
    { left: "Rough", right: "Smooth" },
    { left: "Bright", right: "Dark" },
    { left: "Round", right: "Pointy" },
    { left: "Weak", right: "Strong" },
    { left: "Old", right: "New" },
    { left: "Simple", right: "Complex" },
    { left: "Dumb", right: "Smart" },
    { left: "Lazy", right: "Hardworking" },
    { left: "Cowardly", right: "Brave" },
    { left: "Calm", right: "Angry" },
    { left: "Polite", right: "Rude" },
    { left: "Mature", right: "Immature" },
    { left: "Optimistic", right: "Pessimistic" },
    { left: "Idealist", right: "Realist" },
    { left: "Forgiving", right: "Vengeful" },
    { left: "Generous", right: "Greedy" },
    { left: "Serious", right: "Funny" },
    { left: "Traditional", right: "Modern" },
    { left: "Art", right: "Commerce" },
    { left: "Fantasy", right: "Sci-Fi" },
    // New cards to reach 100
    { left: "Meaningless", right: "Meaningful" },
    { left: "Small Talk", right: "Deep Conversation" },
    { left: "Better Alone", right: "Better Together" },
    { left: "Overpaid", right: "Underpaid" },
    { left: "Brain", right: "Brawn" },
    { left: "Book", right: "Movie" },
    { left: "Cat", right: "Dog" },
    { left: "Text", right: "Call" },
    { left: "Morning", right: "Night" },
    { left: "Introvert", right: "Extrovert" },
    { left: "Spontaneous", right: "Planned" },
    { left: "Needs Sauce", right: "Good Plain" }, // Foodie crossover
    { left: "Trashy", right: "Classy" }, // Spicy crossover
    { left: "Job", right: "Career" }, // Work crossover
    { left: "Tourist", right: "Local" }, // Travel crossover
    { left: "Luck", right: "Skill" }, // Sports crossover
    { left: "Utopian", right: "Dystopian" },
    { left: "Order", right: "Chaos" },
    { left: "Fact", right: "Opinion" },
    { left: "Physical", right: "Digital" },
    { left: "Function", right: "Form" },
    { left: "Need", right: "Want" },
    { left: "Practical", right: "Theoretical" },
    { left: "Process", right: "Result" },
    { left: "Journey", right: "Destination" },
    { left: "Quality", right: "Quantity" },
    { left: "Public", right: "Private" },
    { left: "Optional", right: "Mandatory" },
    { left: "Rare", right: "Common" },
    { left: "Easy to Learn", right: "Hard to Master" },
    { left: "Subjective", right: "Objective" },
    { left: "Active", right: "Passive" },
    { left: "Create", right: "Consume" },
    { left: "Lead", right: "Follow" },
    { left: "Teach", right: "Learn" },
    { left: "Speak", right: "Listen" },
    { left: "Question", right: "Answer" },
    { left: "Problem", right: "Solution" },
    { left: "Part", right: "Whole" },
    { left: "Start", right: "Finish" },
    { left: "Cause", right: "Effect" },
    { left: "Freedom", right: "Security" },
    { left: "Justice", right: "Mercy" },
    { left: "Truth", right: "Happiness" },
    { left: "Knowledge", right: "Ignorance" },
    { left: "Wisdom", right: "Intelligence" },
    { left: "Power", right: "Responsibility" },
    { left: "Love", right: "Respect" },
    { left: "Friend", right: "Enemy" },
    { left: "Win", right: "Lose" }
];

// SPICY DECK: Relationships, dating, social dynamics, red flags (NO SEX)
// Quality Check: Relationship spectrums.
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
    { left: "Not Cheating", right: "Cheating" },
    { left: "Harmless Flirting", right: "Emotional Cheating" },
    { left: "Forgivable", right: "Unforgivable" },
    { left: "Just Friends", right: "More Than Friends" },
    { left: "Jealous", right: "Secure" },
    { left: "High Maintenance", right: "Low Maintenance" },
    { left: "Clingy", right: "Distant" },
    { left: "Controlling", right: "Supportive" },
    { left: "Toxic", right: "Healthy" },
    { left: "Friend Zone", right: "Marriage Material" },
    { left: "Player", right: "Loyal" },
    { left: "Too Young", right: "Too Old" },
    { left: "Rebound", right: "The One" },
    { left: "Emotional", right: "Logical" },
    { left: "Spontaneous", right: "Planner" },
    { left: "Secretive", right: "Open Book" },
    { left: "Bad Communicator", right: "Good Communicator" },
    { left: "Selfish", right: "Selfless" },
    { left: "Arrogant", right: "Confident" },
    { left: "Funny", right: "Serious" },
    { left: "Party Animal", right: "Homebody" },
    { left: "Spendthrift", right: "Frugal" },
    { left: "Messy", right: "Neat Freak" },
    { left: "Dependent", right: "Independent" },
    { left: "Possessive", right: "Trusting" },
    { left: "Idealist", right: "Cynic" },
    { left: "Traditional", right: "Unconventional" },
    { left: "Adventurous", right: "Safe" },
    { left: "Passionate", right: "Steady" },
    { left: "Physical Touch", right: "Words of Affirmation" },
    { left: "Introvert", right: "Extrovert" },
    { left: "Morning Person", right: "Night Owl" },
    { left: "Cat Person", right: "Dog Person" },
    { left: "Indoors", right: "Outdoors" },
    { left: "City", right: "Country" },
    { left: "Summer", right: "Winter" },
    { left: "Tea", right: "Coffee" },
    { left: "Sweet", right: "Spicy" },
    { left: "Looks", right: "Personality" },
    { left: "Brain", right: "Heart" },
    { left: "Forgive", right: "Forget" },
    { left: "Lust", right: "Love" },
    { left: "Fate", right: "Choice" },
    { left: "Soulmate", right: "Partner" },
    { left: "Wedding", right: "Marriage" },
    { left: "Kids", right: "No Kids" },
    { left: "Work", right: "Family" },
    { left: "Money", right: "Time" },
    { left: "Past", right: "Future" },
    { left: "Truth", right: "White Lie" }
];

// ADULT DECK (18+): Sex, kinks, explicit topics
// Quality Check: Explicit spectrums.
export const adultDeck: Card[] = [
    { left: "Vanilla", right: "Kinky" },
    { left: "Rough", right: "Gentle" },
    { left: "Quiet", right: "Loud" },
    { left: "Fast", right: "Slow" },
    { left: "Lights Off", right: "Lights On" },
    { left: "Private", right: "Public" },
    { left: "Top", right: "Bottom" },
    { left: "Dominant", right: "Submissive" },
    { left: "Giver", right: "Taker" },
    { left: "Planned", right: "Spontaneous" },
    { left: "Emotional", right: "Physical" },
    { left: "Sober", right: "Drunk/High" },
    { left: "Roleplay", right: "Real" },
    { left: "Toys", right: "No Toys" },
    { left: "Foreplay", right: "Main Event" },
    { left: "Morning", right: "Night" },
    { left: "Bed", right: "Anywhere Else" },
    { left: "Quickie", right: "Marathon" },
    { left: "Romantic", right: "Dirty" },
    { left: "Sensual", right: "Sexual" },
    { left: "Oral", right: "Tantric" }, // Vibe spectrum
    { left: "Solo", right: "Group" },
    { left: "Experienced", right: "Inexperienced" },
    { left: "Taboo", right: "Mainstream" },
    { left: "Digital", right: "Physical" }, // Sexting vs Sex
    { left: "Love", right: "Lust" },
    { left: "Restrained", right: "Wild" },
    { left: "Safe Word", right: "No Limits" },
    { left: "Performance", right: "Connection" },
    { left: "Watching", right: "Doing" },
    { left: "Teaching", right: "Learning" },
    { left: "Awkward", right: "Sexy" },
    { left: "Pain", right: "Pleasure" },
    { left: "Serious", right: "Playful" },
    { left: "Dirty Talk", right: "Silence" },
    { left: "Visual", right: "Tactile" },
    { left: "Instinct", right: "Instruction" },
    { left: "Aggressive", right: "Passive" },
    { left: "Selfish", right: "Generous" },
    { left: "Thinking", right: "Feeling" },
    { left: "Mind", right: "Body" },
    { left: "Eyes Open", right: "Eyes Closed" },
    { left: "Clothing", right: "Nudity" }, // Lingerie vs Naked
    { left: "Fantasy", right: "Reality" },
    { left: "Forbidden", right: "Allowed" },
    { left: "Guilt", right: "Satisfaction" },
    { left: "Regret", right: "Memory" },
    { left: "Strange", right: "Familiar" },
    { left: "One Night", right: "Forever" },
    { left: "Friend", right: "Lover" }
];

// FOODIE DECK: Taste, cooking, dining
// Quality Check: Food spectrums.
export const foodieDeck: Card[] = [
    { left: "Disgusting", right: "Delicious" },
    { left: "Healthy", right: "Unhealthy" },
    { left: "Spicy", right: "Mild" },
    { left: "Sweet", right: "Savory" },
    { left: "Crunchy", right: "Soft" },
    { left: "Hot", right: "Cold" },
    { left: "Raw", right: "Cooked" },
    { left: "Fresh", right: "Processed" },
    { left: "Cheap Eats", right: "Fine Dining" },
    { left: "Street Food", right: "Michelin Star" },
    { left: "Snack", right: "Meal" },
    { left: "Appetizer", right: "Entree" },
    { left: "Breakfast", right: "Dinner" },
    { left: "Undercooked", right: "Overcooked" },
    { left: "Too Salty", right: "Too Sweet" },
    { left: "Authentic", right: "Americanized" },
    { left: "Vegan", right: "Carnivore" },
    { left: "Gluten Free", right: "Full Gluten" },
    { left: "Comfort Food", right: "Experimental Food" },
    { left: "Homemade", right: "Store Bought" },
    { left: "Messy", right: "Clean" },
    { left: "Smells Bad", right: "Smells Good" },
    { left: "Texture", right: "Flavor" }, // Which is worse/better aspect
    { left: "Filling", right: "Light" },
    { left: "Beverage", right: "Food" }, // e.g. Soup or Smoothie ambiguity
    { left: "Fruit", right: "Vegetable" }, // Tomato debate
    { left: "Pizza Topping", right: "Salad Ingredient" },
    { left: "Dip", right: "Sauce" },
    { left: "Spoon", right: "Fork" },
    { left: "Plate", right: "Bowl" },
    { left: "Coffee", right: "Dessert" },
    { left: "Wine", right: "Beer" },
    { left: "Cocktail", right: "Mocktail" },
    { left: "Eat Alone", right: "Social Dining" },
    { left: "Fast", right: "Slow" },
    { left: "Buffet", right: "A La Carte" },
    { left: "Delivery", right: "Dine In" },
    { left: "Melted", right: "Solid" },
    { left: "Smooth", right: "Chunky" },
    { left: "Plain", right: "Seasoned" },
    { left: "Traditional", right: "Fusion" },
    { left: "Local", right: "Exotic" },
    { left: "Sustainable", right: "Wasteful" },
    { left: "Essential", right: "Indulgent" },
    { left: "Basic", right: "Gourmet" },
    { left: "Ugly", right: "Beautiful" }, // Presentation
    { left: "Hard", right: "Chewy" },
    { left: "Bitter", right: "Sour" },
    { left: "Burnt", right: "Raw" }, // Worse cooking error
    { left: "Dry", right: "Moist" }
];

// ABSURD DECK: Weird, hypothetical, philosophical nonsense
export const absurdDeck: Card[] = [
    { left: "Totally Normal", right: "Extremely Weird" },
    { left: "Useless Body Part", right: "Essential Body Part" },
    { left: "Creepy", right: "Cute" },
    { left: "Would Survive Zombie Apocalypse", right: "First To Die" },
    { left: "Useful In A Fight", right: "Useless In A Fight" },
    { left: "Horse-Sized Duck", right: "100 Duck-Sized Horses" },
    { left: "Scary Animal", right: "Cute Animal" },
    { left: "Best Superpower", right: "Worst Superpower" },
    { left: "Would Float", right: "Would Sink" },
    { left: "Brought To A Desert Island", right: "Leave Behind Forever" },
    { left: "Time Travel Destination", right: "Avoid At All Costs" },
    { left: "Could Beat In A Race", right: "Would Lose Badly" },
    { left: "Makes A Good Pet", right: "Terrible Pet" },
    { left: "Tastes Like Chicken", right: "Tastes Nothing Like Chicken" },
    { left: "Looks Dangerous", right: "Is Actually Dangerous" },
    { left: "Would Fit In A Blender", right: "Would Not Fit" },
    { left: "Could Survive In Space", right: "Instant Death" },
    { left: "Good Last Words", right: "Terrible Last Words" },
    { left: "Brings To A Duel", right: "Never Brings To A Duel" },
    { left: "Would Name A Band", right: "Terrible Band Name" },
    { left: "Makes Sense Underwater", right: "Makes No Sense Underwater" },
    { left: "Florida Man Headline", right: "Normal News" },
    { left: "Conspiracy Theory Material", right: "Boring Reality" },
    { left: "Alien Would Understand", right: "Alien Would Be Confused" },
    { left: "Good Tattoo", right: "Bad Tattoo" },
    { left: "Worth Going To Jail For", right: "Not Worth It" },
    { left: "Would Haunt As A Ghost", right: "Would Not Haunt" },
    { left: "Acceptable Pirate Name", right: "Unacceptable Pirate Name" },
    { left: "Could Befriend", right: "Would Run Away From" },
    { left: "Makes A Good Password", right: "Terrible Password" },
    { left: "Should Exist", right: "Should Not Exist" },
    { left: "Good Invention", right: "Bad Invention" },
    { left: "Truly Happy", right: "Optimistic" },
    { left: "Better to have", right: "No Elbows" }, // No Knees
    { left: "Scarier", right: "Ocean" }, // Space
    { left: "Trustworthy", right: "Dog with Mustache" }, // Cat with Monocle
    { left: "Worse Home", right: "Inside Volcano" }, // Inside Whale
    { left: "Better Pet", right: "Mini Dragon" }, // Giant Hamster
    { left: "Likely Alien", right: "Elon Musk" }, // Mark Zuckerberg
    { left: "Better Meal", right: "100 Year Old Egg" }, // Fresh Raw Onion
    { left: "Harder Fight", right: "Ghost" }, // Skeleton
    { left: "Confusing", right: "Time Travel" }, // Multiverse
    { left: "Apocalypse Weapon", right: "Chainsaw" }, // Flamethrower
    { left: "Suspicious", right: "Suit in Park" }, // Clown in Bank
    { left: "Hand Replacement", right: "Hook" }, // Lobster Claw
    { left: "Embarrassing", right: "Tripping in Public" }, // Waving at Wrong Person
    { left: "Scarier Sound", right: "Child Laughing" }, // Footsteps Upstairs
    { left: "Power", right: "Fire" }, // Ice
    { left: "Annoying", right: "Wet Socks" }, // Sand in Bed
    { left: "Transport", right: "Teleportation" }, // Flying
    { left: "Cursed", right: "Blessed" },
    { left: "Round", right: "Flat" },
    { left: "Infinite", right: "Finite" },
    { left: "Simulation", right: "Reality" },
    { left: "Chicken", right: "Egg" },
    { left: "Half Full", right: "Half Empty" },
    { left: "Utopia", right: "Dystopia" },
    { left: "Waking Up", right: "Falling Asleep" }
];

// WORK DECK: Professional life, office politics
export const workDeck: Card[] = [
    { left: "Professional", right: "Unprofessional" },
    { left: "Productive", right: "Waste of Time" },
    { left: "Hard Work", right: "Smart Work" },
    { left: "Leader", right: "Follower" },
    { left: "Team Player", right: "Lone Wolf" },
    { left: "Micromanage", right: "Laissez-faire" },
    { left: "Strict", right: "Lenient" },
    { left: "Fair", right: "Unfair" },
    { left: "Underpaid", right: "Overpaid" },
    { left: "Qualified", right: "Unqualified" },
    { left: "Stressful", right: "Relaxing" },
    { left: "Boring", right: "Exciting" },
    { left: "Career", right: "Job" },
    { left: "Passion", right: "Paycheck" },
    { left: "Office", right: "Remote" },
    { left: "Meeting", right: "Email" },
    { left: "Talker", right: "Listener" },
    { left: "Doer", right: "Planner" },
    { left: "Creative", right: "Analytical" },
    { left: "Art", right: "Science" },
    { left: "Big Picture", right: "Details" },
    { left: "Startup", right: "Corporate" },
    { left: "Risky", right: "Safe" },
    { left: "Friend", right: "Colleague" },
    { left: "Boss", right: "Mentor" },
    { left: "Criticism", right: "Feedback" },
    { left: "Failure", right: "Learning Opportunity" },
    { left: "Success", right: "Luck" },
    { left: "Ambitions", right: "Contentment" },
    { left: "Workaholic", right: "Slacker" },
    { left: "Early Bird", right: "Night Owl" },
    { left: "Organized", right: "Messy" },
    { left: "Formal", right: "Casual" },
    { left: "Suit", right: "Hoodie" },
    { left: "Slack", right: "Zoom" },
    { left: "To Do List", right: "Calendar" },
    { left: "Deadline", right: "Guideline" },
    { left: "Rule", right: "Suggestion" },
    { left: "Policy", right: "Culture" },
    { left: "Hiring", right: "Firing" },
    { left: "Raise", right: "Promotion" },
    { left: "Bonus", right: "Perk" },
    { left: "Vacation", right: "Sick Day" },
    { left: "Monday", right: "Friday" }, // Mood
    { left: "9 to 5", right: "Flexible" },
    { left: "Desk", right: "Couch" },
    { left: "Coffee", right: "Water" },
    { left: "Silence", right: "Noise" },
    { left: "Open Office", right: "Private Office" },
    { left: "Dream Job", right: "Nightmare Job" }
];

// TRAVEL DECK: Vacation, exploration, transit
export const travelDeck: Card[] = [
    { left: "Tourist Trap", right: "Hidden Gem" },
    { left: "Relaxing", right: "Adventurous" },
    { left: "Planned", right: "Spontaneous" },
    { left: "Luxury", right: "Budget" },
    { left: "Hotel", right: "Camping" },
    { left: "Beach", right: "Mountains" },
    { left: "City", right: "Nature" },
    { left: "Hot", right: "Cold" },
    { left: "Summer", right: "Winter" },
    { left: "Domestic", right: "International" },
    { left: "Near", right: "Far" },
    { left: "Safe", right: "Dangerous" },
    { left: "Comfortable", right: "Uncomfortable" },
    { left: "Fast", right: "Slow" }, // Mode of transport
    { left: "Journey", right: "Destination" },
    { left: "Solo", right: "Group" },
    { left: "Quiet", right: "Loud" },
    { left: "Clean", right: "Dirty" },
    { left: "Empty", right: "Crowded" },
    { left: "Local", right: "Foreign" },
    { left: "Authentic", right: "Artificial" },
    { left: "Museum", right: "Nightclub" },
    { left: "History", right: "Modernity" },
    { left: "Active", right: "Lazy" },
    { left: "Walking", right: "Driving" },
    { left: "Flying", right: "Sailing" },
    { left: "Train", right: "Bus" },
    { left: "Aisle", right: "Window" },
    { left: "Carry-on", right: "Checked Bag" },
    { left: "Overpacker", right: "Minimalist" },
    { left: "Souvenir", right: "Photo" },
    { left: "Guide", right: "Explorer" },
    { left: "Map", right: "GPS" },
    { left: "Lost", right: "Found" },
    { left: "Arrival", right: "Departure" },
    { left: "Hello", right: "Goodbye" },
    { left: "Home", right: "Away" },
    { left: "Work Trip", right: "Vacation" },
    { left: "Staycation", right: "Excursion" },
    { left: "Resort", right: "Hostel" },
    { left: "First Class", right: "Economy" },
    { left: "Upgrade", right: "Downgrade" },
    { left: "Delay", right: "On Time" },
    { left: "Jet Lag", right: "Adrenaline" },
    { left: "Passport", right: "Driver's License" }, // Importance
    { left: "Customs", right: "Duty Free" },
    { left: "Currency", right: "Credit Card" },
    { left: "Language Barrier", right: "Fluent" },
    { left: "Culture Shock", right: "Familiarity" },
    { left: "Memory", right: "Experience" }
];

// SPORTS DECK: Athleticism, competition
export const sportsDeck: Card[] = [
    { left: "Luck", right: "Skill" },
    { left: "Individual", right: "Team" },
    { left: "Physical", right: "Mental" },
    { left: "Defense", right: "Offense" },
    { left: "Winning", right: "Playing" },
    { left: "Fair", right: "Unfair" },
    { left: "Fun", right: "Serious" },
    { left: "Amateur", right: "Professional" },
    { left: "Easy", right: "Hard" },
    { left: "Safe", right: "Dangerous" },
    { left: "Slow", right: "Fast" },
    { left: "Weak", right: "Strong" },
    { left: "Short", right: "Long" }, // Game duration
    { left: "Cheap", right: "Expensive" }, // Equipment/Entry
    { left: "Popular", right: "Niche" },
    { left: "Boring to Watch", right: "Exciting to Watch" },
    { left: "Boring to Play", right: "Exciting to Play" },
    { left: "Summer", right: "Winter" },
    { left: "Indoor", right: "Outdoor" },
    { left: "Ball", right: "No Ball" },
    { left: "Contact", right: "Non-Contact" },
    { left: "Target", right: "Race" },
    { left: "Score", right: "Style" }, // Objective score vs Judges
    { left: "Graceful", right: "Powerful" },
    { left: "Endurance", right: "Explosive" },
    { left: "Practice", right: "Talent" },
    { left: "Coach", right: "Player" },
    { left: "Captain", right: "Rookie" },
    { left: "MVP", right: "Benchwarmer" },
    { left: "Gold Medal", right: "Participation Trophy" },
    { left: "Winner", right: "Loser" },
    { left: "Hero", right: "Villain" },
    { left: "Fair Play", right: "Cheating" },
    { left: "Doping", right: "Clean" },
    { left: "Ref", right: "Fan" },
    { left: "Loud", right: "Quiet" },
    { left: "Wet", right: "Dry" }, // Water sports vs Land
    { left: "Clean", right: "Dirty" },
    { left: "Rough", right: "Gentle" },
    { left: "Precision", right: "Power" },
    { left: "Strategy", right: "Instinct" },
    { left: " Tradition", right: "Innovation" },
    { left: "Local", right: "Global" },
    { left: "Game", right: "Sport" },
    { left: "Hobby", right: "Career" },
    { left: "Healthy", right: "Injurious" },
    { left: "Relaxing", right: "Exhausting" },
    { left: "Friendly", right: "Aggressive" },
    { left: "Casual", right: "Competitive" },
    { left: "Legend", right: "Unknown" }
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
