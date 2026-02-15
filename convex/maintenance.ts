
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Delete rooms not updated in the last 6 hours
export const cleanupOldRooms = mutation({
    args: {},
    handler: async (ctx) => {
        const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;

        // Scan all rooms
        const allRooms = await ctx.db.query("rooms").collect();

        let archivedRooms = 0;

        for (const room of allRooms) {
            const lastActive = room.updated_at ?? room._creationTime;

            if (lastActive < sixHoursAgo) {
                // Archive the room by renaming it
                // We add a suffix to hide it from standard lookups but keep the data
                // The room remains in the 'rooms' table, so fetching stats via 'rooms' table will still work.

                if (!room.room_code.includes("_archived")) {
                    // Update room code to "CODE_archived_TIMESTAMP"
                    await ctx.db.patch(room._id, {
                        room_code: `${room.room_code}_archived_${Date.now()}`
                    });

                    // We DO NOT delete players or the room itself.
                    archivedRooms++;
                }
            }
        }

        console.log(`Cleanup complete: Archived (renamed) ${archivedRooms} rooms.`);
    },
});
