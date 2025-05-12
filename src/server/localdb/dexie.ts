import Dexie, { type Table } from "dexie";
import { seed } from "./seed";

export interface Card {
	id?: number;
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
	difficulty: string;
}

export interface Deck {
	id?: number;
	name: string;
	description?: string;
	color: string;
	cardCount: number;
	createdAt: number;
	updatedAt: number;
	lastStudied?: number;
	progress: number;
}

export class RecallyDB extends Dexie {
	deck_table!: Table<Deck, string>;
	card_table!: Table<Card, string>;
	constructor() {
		super("RecallyDB");
		this.version(1).stores({
			deck_table: "++id",
			card_table: "++id, deckId",
		});
	}

	deleteDeck(deckId: string) {
		return this.transaction("rw", this.card_table, this.deck_table, () => {
			this.card_table.where({ deckId }).delete();
			this.deck_table.delete(deckId);
		});
	}
}

export const db = new RecallyDB();

db.on("populate", seed);

export function resetDatabase() {
	return db.transaction("rw", db.deck_table, db.card_table, async () => {
		await Promise.all(db.tables.map((table) => table.clear()));
		await seed();
	});
}
