import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { decks } from "~/server/db/schema";

const deckSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional().default(""),
  color: z.string().optional().default("#ffffff"),
  cardCount: z.number().int().nonnegative(),
  createdAt: z.number().int(),
  lastModified: z.number().int(),
  lastStudied: z.number().int().optional(),
  progress: z.number().int().nonnegative(),
  tags: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = deckSchema.parse(json);

    // Convert millisecond timestamps to JS Date for Postgres
    const toDate = (ms?: number) => (ms ? new Date(ms) : undefined);

    await db
      .insert(decks)
      .values({
        id: data.id,
        name: data.name,
        description: data.description,
        color: data.color,
        cardCount: data.cardCount,
        createdAt: toDate(data.createdAt),
        lastModified: toDate(data.lastModified),
        lastStudied: toDate(data.lastStudied),
        progress: data.progress,
        tags: data.tags,
      })
      .onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] /api/decks POST error", error);
    return NextResponse.json(
      { error: "Invalid deck payload" },
      { status: 400 },
    );
  }
}
