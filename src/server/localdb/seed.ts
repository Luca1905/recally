import moment from "moment";
import { db } from "./dexie";

export async function seed() {
  const deckId = await db.deck_table.add({
    name: "Heredity",
    color:
      "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    createdAt: moment().format(),
    updatedAt: moment().format(),
    cardCount: 3,
    progress: 0,
  });
  await db.card_table.bulkAdd([
    {
      deckId,
      front: "DNA",
      back: "Deoxyribonucleic acid",
      box: 1,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      difficulty: "Easy",
    },
    {
      deckId,
      front: "Gene",
      back: "A specific segment of DNA",
      box: 1,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      difficulty: "Easy",
    },
    {
      deckId,
      front: "Allele",
      back: "One of two or more alternative forms of a gene",
      box: 1,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      difficulty: "Easy",
    },
  ]);
}
