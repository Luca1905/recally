"use client";

import { useParams } from "next/navigation";
import posthog from "posthog-js";
import { updateStreak } from "~/localdb/streak";
import StudyPage from "./study-deck";

export default function DeckStudyPage() {
  const { deckId } = useParams<{ deckId: string }>();

  posthog.capture("Study");
  updateStreak();

  return <StudyPage deckId={deckId} />;
}
