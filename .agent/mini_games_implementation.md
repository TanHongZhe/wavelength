# Mini Games Implementation Plan

## Overview
Add a "Mini Games" section to the main landing screen with a dice emoji. Start with "Rapid Fire: This or That" game.

## Requirements
1. **Mini Games Button** - Visible on all 3 main game pages (/, /valentines-games, /relationship-games, /long-distance-games)
2. **Modal with Game Selection** - Opens when "Mini Games" is clicked (placeholder for 5-6 games eventually)
3. **Rapid Fire: This or That Game** - First mini game implementation

## Rapid Fire Game Specs
- **Game Type**: 2-player binary choice game
- **Rounds**: 10 rounds per game
- **Timer**: 10-second countdown per round
- **Options**: 8 decks with ~100 cards each
- **Deck Options**: Couples, Food, Travel, Entertainment, Lifestyle, Random, Deep Questions, Fun
- **Card Count**: Player can choose 20, 50, or 100 cards
- **Scoring**: Match = +1 point, Clash = 0 points, Timeout = "Too Slow! 🐌"
- **Mode**: 2-person only (no party mode)

## Database Schema Changes
Need to add a new table for mini game rooms:

```sql
CREATE TABLE mini_game_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code VARCHAR(4) UNIQUE NOT NULL,
  game_type VARCHAR(50) NOT NULL, -- 'rapid-fire'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Game configuration
  deck_type VARCHAR(50) NOT NULL,
  total_cards INTEGER NOT NULL,
  current_round INTEGER DEFAULT 1,
  
  -- Players
  player1_id VARCHAR(255),
  player1_name VARCHAR(50),
  player1_avatar VARCHAR(10),
  player1_score INTEGER DEFAULT 0,
  player1_choice VARCHAR(50),
  
  player2_id VARCHAR(255),
  player2_name VARCHAR(50),
  player2_avatar VARCHAR(10),
  player2_score INTEGER DEFAULT 0,
  player2_choice VARCHAR(50),
  
  -- Game state
  phase VARCHAR(50) DEFAULT 'waiting', -- waiting, choosing, reveal, game_over
  current_card JSONB,
  round_end_time TIMESTAMP
);
```

## File Structure
```
src/
├── components/
│   ├── minigames/
│   │   ├── MiniGamesModal.tsx          // Main modal to select game
│   │   ├── rapid-fire/
│   │   │   ├── RapidFireGameEngine.tsx // Main game engine
│   │   │   ├── RapidFireSetup.tsx      // Deck & card count selection
│   │   │   ├── RapidFireGameScreen.tsx // Playing screen
│   │   │   ├── RapidFireWaiting.tsx    // Waiting room
│   │   │   └── cards.ts                // Card data for all decks
├── hooks/
│   └── useRapidFireRoom.ts             // Real-time game state hook
```

## Implementation Steps

### Step 1: Add Mini Games Button to Landing Screens
- Add a button below "Create Room" and "Join Room" on LandingScreen.tsx
- Style with dice emoji 🎲
- Opens MiniGamesModal

### Step 2: Create Mini Games Modal
- Show list of mini games (initially just "Rapid Fire")
- Each game card shows name, description, and player count
- Click to start game setup

### Step 3: Database Setup
- Create mini_game_rooms table in Supabase
- Add RLS policies

### Step 4: Create Card Decks
- Create 8 decks with ~100 cards each:
  - Couples
  - Food
  - Travel
  - Entertainment
  - Lifestyle
  - Random
  - Deep Questions
  - Fun

### Step 5: Rapid Fire Setup Screen
- Select deck (dropdown or cards)
- Select card count (20, 50, 100)
- Show player name and avatar
- Create Game or Join Game flow

### Step 6: Rapid Fire Game Engine
- Similar structure to ClassicGameEngine
- Handle room creation/joining
- Real-time sync with Supabase

### Step 7: Rapid Fire Game Screen
- Show timer countdown (10 seconds)
- Show two option buttons
- Lock in choice for player
- Wait for both players or timeout
- Show reveal animation
- Update scores
- Next round button

### Step 8: Game Over Screen
- Show final scores
- Show match statistics
- Play Again or Home buttons

## Notes
- Use existing game infrastructure as reference
- Follow similar patterns to Classic/Party game modes
- Maintain consistent styling with rest of app
