import moment from "moment";
import { v4 as uuid } from "uuid";
import { dxdb } from "./dexie";

export async function seed() {
  const now = moment().valueOf();
  const deckId = await dxdb.deck_table.add({
    id: uuid(),
    name: "Heredity",
    color: "#ff75c3",
    createdAt: now,
    lastModified: now,
    cardCount: 3,
    progress: 0,
    description: "Cards for the exam in heredity",
    tags: ["biology"],
  });
  console.log("creating with time: ", now);
  await dxdb.card_table.bulkAdd([
    {
      id: uuid(),
      deckId,
      front: "DNA",
      back: "Deoxyribonucleic acid",
      box: 1,
      createdAt: now,
      updatedAt: now,
      type: "new",
    },
    {
      id: uuid(),
      deckId,
      front: "Gene",
      back: "A specific segment of DNA",
      box: 1,
      createdAt: now,
      updatedAt: now,
      type: "learn",
    },
    {
      id: uuid(),
      deckId,
      front: "Allele",
      back: "One of two or more alternative forms of a gene",
      box: 1,
      createdAt: now,
      updatedAt: now,
      type: "due",
    },
  ]);
  await dxdb.session_table.add({
    id: uuid(),
    durationMs: 1000,
    createdAt: now - 1000,
  });
  await dxdb.activity_table.add({
    id: uuid(),
    message: "Heredity table created",
    timestamp: now,
  });
}
