
import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Schedule room cleanup every hour
crons.interval(
    "cleanup-old-rooms",
    { hours: 1 },
    api.maintenance.cleanupOldRooms
);

export default crons;
