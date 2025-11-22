import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Fetch Aave Events",
  { minutes: 1 },
  internal.aaveEventWorker.fetchAndStoreEvents
);

export default crons;
