import moment from "moment";
import { dxdb } from "./dexie";

export async function seed() {
  const deckId = await dxdb.deck_table.add({
    name: "Heredity",
    color:
      "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    createdAt: moment().format(),
    lastModified: moment().format(),
    cardCount: 3,
    progress: 0,
    description: "Cards for the exam in heredity",
    tags: ["biology"],
  });
  await dxdb.card_table.bulkAdd([
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
