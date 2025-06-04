import { Plus } from "lucide-react";
import { DeckGrid } from "~/components/deck/deck-grid";
import { DeckList } from "~/components/deck/deck-list";
import { Button } from "~/components/ui/button";
import type { Deck as LocalDeck } from "~/server/localdb/dexie";

export default function DecksContent({
  decks,
  viewMode,
  onDeleteDeck,
  onCreateDeck,
  hasFilters,
  searchQuery,
}: {
  decks: LocalDeck[];
  viewMode: "grid" | "list";
  onDeleteDeck: (id: string) => void;
  onCreateDeck: () => void;
  hasFilters: boolean;
  searchQuery: string;
}) {
  if (decks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <Plus className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mb-2 font-medium text-foreground text-lg">
          No decks found
        </h3>
        <p className="mb-4 text-muted-foreground text-sm">
          {searchQuery || hasFilters
            ? "Try adjusting your search or filters"
            : "Create your first deck to get started"}
        </p>
        <Button onClick={onCreateDeck}>
          <Plus className="mr-2 h-4 w-4" />
          Create Deck
        </Button>
      </div>
    );
  }

  return viewMode === "grid" ? (
    <DeckGrid decks={decks} onDeleteDeckAction={onDeleteDeck} />
  ) : (
    <DeckList decks={decks} onDeleteDeckAction={onDeleteDeck} />
  );
}
