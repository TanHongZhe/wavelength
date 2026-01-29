# Wavelength Online (Next.js Version)

A real-time social guessing game built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Real-time Gameplay**: Instant synchronization across all players using Supabase Realtime.
- **Hybrid Architecture**: 
  - **SSG (Static Site Generation)**: SEO-optimized landing pages (Home, Rules, About).
  - **CSR (Client-Side Rendering)**: Interactive Game Engine lazy-loaded for performance.
- **Responsive Design**: Mobile-first UI with smooth animations (Framer Motion).
- **Static Export**: Configured for deployment on platforms like Cloudflare Pages, Vercel, or Netlify.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Backend/Realtime**: Supabase
- **Icons**: Lucide React
- **Animations**: Framer Motion, Canvas Confetti

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to play.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The static output will be in the `out` directory.

## Project Structure

- `src/app/`: App Router pages (Home, Rules, About).
- `src/components/game/`: Core game logic components (GameEngine, Dial, GameScreen).
- `src/hooks/useGameRoom.ts`: Main game state management hook.
- `src/lib/`: Utilities and Supabase client configuration.

## Deployment

This project uses `output: "export"` in `next.config.ts`.
To deploy, simply upload the `out` folder to any static hosting provider.
