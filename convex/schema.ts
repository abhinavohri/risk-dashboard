import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  aaveEvents: defineTable({
    type: v.string(),
    user: v.string(),
    reserve: v.string(),
    symbol: v.optional(v.string()),
    amount: v.string(),
    blockNumber: v.number(),
    timestamp: v.optional(v.number()),
    transactionHash: v.string(),
    logIndex: v.number(),
  })
    .index("by_tx_and_log", ["transactionHash", "logIndex"])
    .index("by_blockNumber", ["blockNumber"]),

  workerState: defineTable({
    lastProcessedBlock: v.number(),
  }),
});
