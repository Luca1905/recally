import { db } from "./dexie";

export async function seed() {
	const deckId = await db.decks.add({
		name: "Heredity",
		color: "from-[#FF6B6B] to-[#FF9E9E]",
		createdAt: Date.now(),
		updatedAt: Date.now(),
		cardCount: 3,
		progress: 0,
	});
	await db.cards.bulkAdd([
		{
			deckId,
			front: "DNA",
			back: "Deoxyribonucleic acid",
			box: 1,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			difficulty: "Easy",
		},
		{
			deckId,
			front: "Gene",
			back: "A specific segment of DNA",
			box: 1,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			difficulty: "Easy",
		},
		{
			deckId,
			front: "Allele",
			back: "One of two or more alternative forms of a gene",
			box: 1,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			difficulty: "Easy",
		},
	]);
}
