import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
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

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = cardSchema.parse(json);

    const toDate = (ms?: number) => (ms ? new Date(ms) : undefined);

    await db
      .insert(cards)
      .values({
        id: data.id,
        deckId: data.deckId,
        front: data.front,
        back: data.back,
        imageUrl: data.imageUrl,
        audioUrl: data.audioUrl,
        box: data.box,
        lastReviewedAt: toDate(data.lastReviewedAt),
        nextReviewedAt: toDate(data.nextReviewedAt),
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
        type: data.type,
      })
      .onConflictDoNothing();

    const [deckRow] = await db
      .select({ cardCount: decks.cardCount })
      .from(decks)
      .where(eq(decks.id, data.deckId));

    const newCount = (deckRow?.cardCount ?? 0) + 1;

    await db
      .update(decks)
      .set({ cardCount: newCount, lastModified: new Date() })
      .where(eq(decks.id, data.deckId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] /api/cards POST error", error);
    return NextResponse.json(
      { error: "Invalid card payload" },
      { status: 400 },
    );
  }
}
