export type DeckType = "classic" | "pop-culture" | "history" | "science" | "geography" | "literature" | "sports" | "random";

interface Question {
    question: string;
    options: string[]; // 4 options
    answer: number; // 0-3 index of correct answer
}

interface Deck {
    name: string;
    emoji: string;
    description: string;
    cards: Question[];
}

export const GENERAL_KNOWLEDGE_DECKS: Record<DeckType, Deck> = {
    "classic": {
        name: "Classic",
        emoji: "🧠",
        description: "Standard general knowledge questions for everyone.",
        cards: [
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                answer: 1
            },
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Madrid", "Paris"],
                answer: 3
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                answer: 1
            },
            {
                question: "What represents the letter 'O' in the periodic table?",
                options: ["Gold", "Silver", "Oxygen", "Osmium"],
                answer: 2
            },
            {
                question: "Which animal is known as the 'King of the Jungle'?",
                options: ["Tiger", "Lion", "Elephant", "Gorilla"],
                answer: 1
            },
            {
                question: "How many continents are there?",
                options: ["5", "6", "7", "8"],
                answer: 2
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                answer: 3
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
                answer: 1
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
                answer: 1
            },
            {
                question: "How many sides does a hexagon have?",
                options: ["5", "6", "7", "8"],
                answer: 1
            },
            {
                question: "What is the capital of Japan?",
                options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
                answer: 2
            },
            {
                question: "Which element has the chemical symbol 'Au'?",
                options: ["Silver", "Gold", "Aluminum", "Argon"],
                answer: 1
            },
            {
                question: "How many bones are in the adult human body?",
                options: ["186", "206", "226", "246"],
                answer: 1
            },
            {
                question: "What year did World War II end?",
                options: ["1943", "1944", "1945", "1946"],
                answer: 2
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                answer: 1
            },
            {
                question: "Who invented the telephone?",
                options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Benjamin Franklin"],
                answer: 2
            },
            {
                question: "What is the speed of light?",
                options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "99,792 km/s"],
                answer: 0
            },
            {
                question: "Which country is home to the kangaroo?",
                options: ["New Zealand", "Australia", "South Africa", "Brazil"],
                answer: 1
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Platinum"],
                answer: 2
            },
            {
                question: "How many players are on a soccer team?",
                options: ["9", "10", "11", "12"],
                answer: 2
            }
        ]
    },
    "pop-culture": {
        name: "Pop Culture",
        emoji: "🎬",
        description: "Movies, music, celebrities, and viral trends.",
        cards: [
            {
                question: "Who played Jack in the movie 'Titanic'?",
                options: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
                answer: 2
            },
            {
                question: "Which artist released the album 'Midnights' in 2022?",
                options: ["Taylor Swift", "Adele", "Beyoncé", "Ariana Grande"],
                answer: 0
            },
            // Add more questions...
        ]
    },
    "history": {
        name: "History Buff",
        emoji: "📜",
        description: "Events, figures, and dates from the past.",
        cards: [
            {
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
                answer: 2
            },
            // Add more questions...
        ]
    },
    "science": {
        name: "Tech & Science",
        emoji: "🔬",
        description: "Discoveries, inventions, and natural phenomena.",
        cards: [
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
                answer: 2
            },
            // Add more questions...
        ]
    },
    "geography": {
        name: "Geography",
        emoji: "🌍",
        description: "Countries, capitals, landmarks, and maps.",
        cards: [
            {
                question: "Which is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: 3
            },
            // Add more questions...
        ]
    },
    "literature": {
        name: "Literature",
        emoji: "📚",
        description: "Books, authors, poetry, and plays.",
        cards: [
            {
                question: "Who wrote 'Harry Potter'?",
                options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "C.S. Lewis"],
                answer: 1
            },
            // Add more questions...
        ]
    },
    "sports": {
        name: "Sports",
        emoji: "⚽",
        description: "Athletes, teams, rules, and records.",
        cards: [
            {
                question: "In which sport would you perform a slam dunk?",
                options: ["Basketball", "Tennis", "Golf", "Soccer"],
                answer: 0
            },
            // Add more questions...
        ]
    },
    "random": {
        name: "Random Facts",
        emoji: "🎲",
        description: "A mix of everything unpredictable.",
        cards: [
            {
                question: "How many hearts does an octopus have?",
                options: ["One", "Two", "Three", "Four"],
                answer: 2
            },
            // Add more questions...
        ]
    }
};
