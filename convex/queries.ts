import { internalQuery } from "./_generated/server";

export const getLastProcessedBlock = internalQuery({
  handler: async (ctx) => {
    const workerState = await ctx.db.query("workerState").first();
    return workerState?.lastProcessedBlock;
  },
});
