import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { decks } from "~/server/db/schema";

const deckSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional().default(""),
  color: z.string().optional().default("#ffffff"),
  cardCount: z.number().int().nonnegative(),
  createdAt: z.number().int(), // ms timestamp
  lastModified: z.number().int(),
  lastStudied: z.number().int().optional(),
  progress: z.number().int().nonnegative(),
  tags: z.array(z.string()),
});

export const deckRouter = createTRPCRouter({
  sync: publicProcedure
    .input(z.array(deckSchema))
    .mutation(async ({ input, ctx }) => {
      if (input.length === 0) return { inserted: 0 };

      const toDate = (ms?: number) => (ms ? new Date(ms) : undefined);

      await ctx.db
        .insert(decks)
        .values(
          input.map((d) => ({
            id: d.id,
            name: d.name,
            description: d.description,
            color: d.color,
            cardCount: d.cardCount,
            createdAt: toDate(d.createdAt),
            lastModified: toDate(d.lastModified),
            lastStudied: toDate(d.lastStudied),
            progress: d.progress,
            tags: d.tags,
          })),
        )
        .onConflictDoNothing();

      return { inserted: input.length };
    }),
});
