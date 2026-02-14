# Supabase to Convex Migration Plan

## Why We're Migrating
- **Issue**: Hitting 5GB egress limit on Supabase due to aggressive polling (every 1 second)
- **Solution**: Convex with built-in reactive queries (WebSocket-based, minimal egress)

## Migration Strategy

### Phase 1: Setup ✅
- [x] Install Convex
- [x] Create Convex schema (schema.ts)
- [x] Create Convex functions (rooms.ts, auth.ts, feedback.ts)
- [x] Add ConvexClientProvider to app layout
- [x] Start Convex dev server

### Phase 2: Hook Migration (IN PROGRESS)
Replace polling-based hooks with Convex reactive queries:

#### Files to Update:
1. **useGameRoom.ts** - Classic mode
2. **usePartyRoom.ts** - Party mode
3. **useFlagRoom.ts** - Flag minigame
4. **useRapidFireRoom.ts** - Rapid Fire minigame

#### Key Changes:
- Remove `setInterval` polling (lines with `setInterval(poll, 1000)`)
- Replace with `useQuery` for reads
- Replace with `useMutation` for writes
- Keep same logic and state management

### Phase 3: Keep Feedback on Supabase
- Feedback form stays on Supabase (low traffic, simpler)
- Only game logic moves to Convex

## Data Flow Changes

### Before (Supabase):
```typescript
// Poll every second
useEffect(() => {
  const poll = async () => {
    const { data } = await supabase.from("rooms").select("*");
    setRoom(data);
  };
  const interval = setInterval(poll, 1000);
  return () => clearInterval(interval);
}, [roomId]);
```

### After (Convex):
```typescript
// Reactive subscription - auto-updates!
const room = useQuery(api.rooms.getRoom, { roomId });
```

## Benefits

1. **90% reduction in egress** - only initial load + user actions
2. **Real-time updates** - instant, not 1-second delayed
3. **Simpler code** - no manual polling logic
4. **Better UX** - faster, more responsive
5. **Cost savings** - stay in free tier longer

## Testing Checklist

After migration, test all game modes:
- [ ] Classic mode - create, join, play full game
- [ ] Party mode - multiplayer game with 3+ players
- [ ] Flag minigame - both players complete game
- [ ] Rapid Fire minigame - both players complete game
- [ ] Room codes work correctly
- [ ] Scoring updates properly
- [ ] Game state syncs across clients
- [ ] Error handling works
