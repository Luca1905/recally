import moment from "moment";
import { v4 as uuid } from "uuid";
import { dxdb } from "./dexie";

export async function seed() {
  const now = moment().milliseconds();
  const deckId = await dxdb.deck_table.add({
    id: uuid(),
    name: "Heredity",
    color:
      "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    createdAt: now,
    lastModified: now,
    cardCount: 3,
    progress: 0,
    description: "Cards for the exam in heredity",
    tags: ["biology"],
  });
  await dxdb.card_table.bulkAdd([
    {
      id: uuid(),
      deckId,
      front: "DNA",
      back: "Deoxyribonucleic acid",
      box: 1,
      createdAt: now,
      updatedAt: now,
      difficulty: "Easy",
    },
    {
      id: uuid(),
      deckId,
      front: "Gene",
      back: "A specific segment of DNA",
      box: 1,
      createdAt: now,
      updatedAt: now,
      difficulty: "Easy",
    },
    {
      id: uuid(),
      deckId,
      front: "Allele",
      back: "One of two or more alternative forms of a gene",
      box: 1,
      createdAt: now,
      updatedAt: now,
      difficulty: "Easy",
    },
  ]);
}
