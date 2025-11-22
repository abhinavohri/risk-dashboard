import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const storeEvent = internalMutation({
  args: {
    type: v.string(),
    user: v.string(),
    reserve: v.string(),
    symbol: v.string(),
    amount: v.string(),
    blockNumber: v.number(),
    timestamp: v.number(),
    transactionHash: v.string(),
    logIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("aaveEvents")
      .withIndex("by_tx_and_log", (q) =>
        q.eq("transactionHash", args.transactionHash).eq("logIndex", args.logIndex)
      )
      .first();

    if (!existing) {
      await ctx.db.insert("aaveEvents", args);
    }
  },
});

export const setLastProcessedBlock = internalMutation({
  args: { blockNumber: v.number() },
  handler: async (ctx, { blockNumber }) => {
    const workerState = await ctx.db.query("workerState").first();
    if (workerState) {
      await ctx.db.patch(workerState._id, { lastProcessedBlock: blockNumber });
    } else {
      await ctx.db.insert("workerState", { lastProcessedBlock: blockNumber });
    }
  },
});
