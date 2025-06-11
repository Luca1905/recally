"use client";

import { useParams } from "next/navigation";
import StudyPage from "../study-deck";

export default function DeckStudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  return <StudyPage deckId={deckId} />;
}
