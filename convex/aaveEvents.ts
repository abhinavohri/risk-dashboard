import { query } from "./_generated/server";

export const getRecentEvents = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("aaveEvents")
      .withIndex("by_blockNumber")
      .order("desc")
      .take(50);
  },
});
