"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { formatDuration } from "~/lib/utils";
import { dxdb } from "~/localdb/dexie";

export function useStats() {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  // 1) total counts
  const totalDecks = useLiveQuery(() => dxdb.deck_table.count(), []) ?? 0;
  const totalCards = useLiveQuery(() => dxdb.card_table.count(), []) ?? 0;

  // 2) sum of all deck.progress via streaming .each()
  const totalProgress =
    useLiveQuery<number>(async () => {
      let sum = 0;
      await dxdb.deck_table.each((d) => {
        sum += d.progress;
      });
      return sum;
    }, []) ?? 0;

  // mastery = ⌊ totalProgress / totalDecks ⌋
  const mastery = totalDecks > 0 ? Math.floor(totalProgress / totalDecks) : 0;

  // 3) new decks/cards in last 7 days (indexed .count())
  const decksDelta =
    useLiveQuery(
      () =>
        dxdb.deck_table
          .where("createdAt")
          .between(sevenDaysAgo, now, true, true)
          .count(),
      [],
    ) ?? 0;

  const cardsDelta =
    useLiveQuery(
      () =>
        dxdb.card_table
          .where("createdAt")
          .between(sevenDaysAgo, now, true, true)
          .count(),
      [],
    ) ?? 0;

  // 4) total study time (ms) via streaming .each()
  const totalStudyTimeMs =
    useLiveQuery<number>(async () => {
      let sum = 0;
      await dxdb.session_table.each((s) => {
        sum += s.durationMs;
      });
      return sum;
    }, []) ?? 0;
  const studyTime = formatDuration(totalStudyTimeMs);

  // 5) study time in last 7 days (ms)
  const studyTimeDeltaMs =
    useLiveQuery<number>(async () => {
      let sum = 0;
      await dxdb.session_table
        .where("createdAt")
        .between(sevenDaysAgo, now, true, true)
        .each((s) => {
          sum += s.durationMs;
        });
      return sum;
    }, []) ?? 0;
  const studyTimeDelta = formatDuration(studyTimeDeltaMs);

  // 6) masteryDelta, TODO
  const masteryDelta = 0;

  return {
    totalDecks,
    decksDelta,
    totalCards,
    cardsDelta,
    studyTime,
    studyTimeDelta,
    mastery,
    masteryDelta,
  };
}
