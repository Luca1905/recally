"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft, Pencil, Play, Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card as UICard } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { dxdb } from "~/localdb/dexie";

export default function DeckOverviewPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const router = useRouter();

  // deck & cards
  const deck = useLiveQuery(() => dxdb.deck_table.get(deckId), [deckId]);
  const cards = useLiveQuery(
    () => dxdb.card_table.where({ deckId }).toArray(),
    [deckId],
  );

  if (deck === undefined || cards === undefined) {
    return <div className="p-4">Loading...</div>;
  }
  if (!deck) return <div className="p-4">Deck not found</div>;

  const newCount = cards.filter((c) => c.type === "new").length;
  const learnCount = cards.filter((c) => c.type === "learn").length;
  const dueCount = cards.filter((c) => c.type === "due").length; // mock due today

  const lastStudied = deck.lastStudied
    ? moment(deck.lastStudied).fromNow()
    : "Never";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 border-border border-b bg-background p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="flex-1 truncate font-semibold text-lg">{deck.name}</h1>
        <Button size="sm" asChild>
          <Link href={`/deck/${deckId}/study`}>
            <Play className="mr-1 h-4 w-4" /> Study
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/deck/${deckId}/add`}>
            <Plus className="mr-1 h-4 w-4" /> Add Card
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/deck/${deckId}/edit`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      </header>

      {/* Deck info */}
      <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
        <UICard className="p-4">
          <h2 className="mb-2 font-semibold text-xl">Deck details</h2>
          <p className="mb-4 text-muted-foreground">
            {deck.description || "No description"}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <span className="font-medium">Cards</span>
              <p>{cards.length}</p>
            </div>
            <div>
              <span className="font-medium">New</span>
              <p>{newCount}</p>
            </div>
            <div>
              <span className="font-medium">Review</span>
              <p>{learnCount}</p>
            </div>
            <div>
              <span className="font-medium">Due today</span>
              <p>{dueCount}</p>
            </div>
            <div>
              <span className="font-medium">Last studied</span>
              <p>{lastStudied}</p>
            </div>
          </div>
        </UICard>

        {/* Cards table */}
        <UICard className="p-4">
          <h2 className="mb-4 font-semibold text-xl">Cards</h2>
          {cards.length === 0 ? (
            <p className="text-muted-foreground">No cards in this deck.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Front</TableHead>
                  <TableHead>Back</TableHead>
                  <TableHead className="w-24">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="max-w-xs whitespace-pre-wrap break-words">
                      {card.front}
                    </TableCell>
                    <TableCell className="max-w-xs whitespace-pre-wrap break-words">
                      {card.back}
                    </TableCell>
                    <TableCell>{card.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </UICard>
      </main>
    </div>
  );
}
