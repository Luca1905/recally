import Dexie, { type Table } from "dexie";
import { seed } from "./seed";

export interface Card {
	id?: string;
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
}

export interface Deck {
	id?: string;
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
	decks!: Table<Deck, string>;
	cards!: Table<Card, string>;
	constructor() {
		super("RecallyDB");
		this.version(1).stores({
			decks: "++id",
			cards: "++id, todoListId",
		});
	}

	deleteDeck(deckId: string) {
		return this.transaction("rw", this.cards, this.decks, () => {
			this.cards.where({ deckId }).delete();
			this.decks.delete(deckId);
		});
	}
}

export const db = new RecallyDB();

db.on("populate", seed);

export function resetDatabase() {
	return db.transaction("rw", db.decks, db.cards, async () => {
		await Promise.all(db.tables.map((table) => table.clear()));
		await seed();
	});
}
