import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cards, decks } from "~/server/db/schema";

const cardSchema = z.object({
  id: z.string().uuid(),
  deckId: z.string().uuid(),
  front: z.string(),
  back: z.string(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  box: z.number().int().nonnegative(),
  lastReviewedAt: z.number().int().optional(),
  nextReviewedAt: z.number().int().optional(),
  createdAt: z.number().int(),
  updatedAt: z.number().int(),
  type: z.enum(["new", "learn", "due"]),
});

export const cardRouter = createTRPCRouter({
  sync: publicProcedure
    .input(z.array(cardSchema))
    .mutation(async ({ input, ctx }) => {
      if (input.length === 0) return { inserted: 0 };

      const toDate = (ms?: number) => (ms ? new Date(ms) : undefined);

      await ctx.db
        .insert(cards)
        .values(
          input.map((c) => ({
            id: c.id,
            deckId: c.deckId,
            front: c.front,
            back: c.back,
            imageUrl: c.imageUrl,
            audioUrl: c.audioUrl,
            box: c.box,
            lastReviewedAt: toDate(c.lastReviewedAt),
            nextReviewedAt: toDate(c.nextReviewedAt),
            createdAt: toDate(c.createdAt),
            updatedAt: toDate(c.updatedAt),
            type: c.type,
          })),
        )
        .onConflictDoNothing();

      const deckIds = Array.from(new Set(input.map((c) => c.deckId)));
      for (const id of deckIds) {
        const [row] = await ctx.db
          .select({ cardCount: decks.cardCount })
          .from(decks)
          .where(eq(decks.id, id));
        const newCount =
          (row?.cardCount ?? 0) + input.filter((c) => c.deckId === id).length;
        await ctx.db
          .update(decks)
          .set({ cardCount: newCount, lastModified: new Date() })
          .where(eq(decks.id, id));
      }

      return { inserted: input.length };
    }),
});
