import Dexie, { type Table } from "dexie";
import { seed } from "./seed";

export interface Card {
  id: string;
  deckId: string;
  front: string;
  back: string;
  imageUrl?: string;
  audioUrl?: string;
  box: number;
  lastReviewedAt?: number;
  nextReviewedAt?: number;
  createdAt: number;
  updatedAt: number;
  type: "new" | "learn" | "due";
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  color: string;
  cardCount: number;
  createdAt: number;
  lastModified: number;
  lastStudied?: number;
  progress: number;
  tags: string[];
}

export class RecallyDB extends Dexie {
  deck_table!: Table<Deck, string>;
  card_table!: Table<Card, string>;
  constructor() {
    super("RecallyDB");
    this.version(1).stores({
      deck_table: "&id",
      card_table: "&id, deckId",
    });
  }

  deleteDeck(deckId: string) {
    return this.transaction("rw", this.card_table, this.deck_table, () => {
      this.card_table.where({ deckId }).delete();
      this.deck_table.delete(deckId);
    });
  }
}

export const dxdb = new RecallyDB();

dxdb.on("populate", seed);

export function resetDatabase() {
  return dxdb.transaction("rw", dxdb.deck_table, dxdb.card_table, async () => {
    await Promise.all(dxdb.tables.map((table) => table.clear()));
    await seed();
  });
}
