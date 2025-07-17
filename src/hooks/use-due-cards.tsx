"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { type Card, dxdb } from "~/localdb/dexie";

export interface DueDeck {
  deckId: string;
  title: string;
  count: number;
}

export interface DueDecksData {
  today: DueDeck[];
  tomorrow: DueDeck[];
  week: DueDeck[];
}

/*
 * Buckets:
 * - today     : 00:00-23:59 of the current day
 * - tomorrow  : 00:00-23:59 of the next day
 * - week      : 2-7 days from now (inclusive)
 */
export function useDueDecks(): DueDecksData {
  return useLiveQuery<DueDecksData>(
    async () => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date(todayStart);
      todayEnd.setHours(23, 59, 59, 999);

      const tomorrowStart = new Date(todayStart);
      tomorrowStart.setDate(tomorrowStart.getDate() + 1);

      const tomorrowEnd = new Date(tomorrowStart);
      tomorrowEnd.setHours(23, 59, 59, 999);

      const weekStart = new Date(todayStart);
      weekStart.setDate(weekStart.getDate() + 2); // day after tomorrow

      const weekEnd = new Date(todayEnd);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const cardsInRange = (from: Date, to: Date) =>
        dxdb.card_table
          .where(["type", "nextReviewedAt"])
          .between(["due", from], ["due", to], true, true)
          .toArray();

      const [cardsToday, cardsTomorrow, cardsWeek] = await Promise.all([
        cardsInRange(todayStart, todayEnd),
        cardsInRange(tomorrowStart, tomorrowEnd),
        cardsInRange(weekStart, weekEnd),
      ]);

      const deckIds = new Set<string>();
      const collectIds = (arr: Card[]) =>
        arr.forEach((c) => deckIds.add(c.deckId));
      collectIds(cardsToday);
      collectIds(cardsTomorrow);
      collectIds(cardsWeek);

      // fetch titles
      const decks = await dxdb.deck_table
        .where("id")
        .anyOf(Array.from(deckIds))
        .toArray();
      const titleMap = new Map(decks.map((d) => [d.id, d.name as string]));

      const aggregate = (cards: Card[]): DueDeck[] => {
        const counts: Record<string, number> = {};
        for (const c of cards) {
          counts[c.deckId] = (counts[c.deckId] ?? 0) + 1;
        }
        return Object.entries(counts)
          .map(([deckId, count]) => ({
            deckId,
            title: titleMap.get(deckId) ?? "Untitled deck",
            count,
          }))
          .sort((a, b) => a.title.localeCompare(b.title));
      };

      return {
        today: aggregate(cardsToday),
        tomorrow: aggregate(cardsTomorrow),
        week: aggregate(cardsWeek),
      };
    },
  ) ?? {
    today: [],
    tomorrow: [],
    week: [],
  };
}
