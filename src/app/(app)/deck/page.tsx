"use client";

import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { CreateDeckDialog } from "~/components/deck/create-deck-dialog";
import DecksContent from "~/components/deck/decks-content";
import DecksFilterBar from "~/components/deck/decks-filter-bar";
import DecksHeader from "~/components/deck/decks-header";
import DecksTagChips from "~/components/deck/decks-tag-chips";
import { dxdb } from "~/server/localdb/dexie";

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const decks = useLiveQuery(() => dxdb.deck_table.toArray());
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "lastModified" | "cardCount">(
    "lastModified",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [createDeckOpen, setCreateDeckOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  if (decks === undefined) {
    return <div>Error loading decks</div>;
  }

  const allTags = Array.from(new Set(decks.flatMap((d) => d.tags || [])));

  // filter
  const filtered = decks.filter((deck) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      deck.name.toLowerCase().includes(q) ||
      deck.description.toLowerCase().includes(q);
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => deck.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // sort
  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortBy === "lastModified") {
      cmp = a.lastModified - b.lastModified;
    } else {
      cmp = a.cardCount - b.cardCount;
    }
    return sortOrder === "asc" ? cmp : -cmp;
  });

  const handleDelete = async (id: string) => {
    await dxdb.card_table.where({ deckId: id }).delete();
    return await dxdb.deck_table.where({ id }).delete();
  };

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("lastModified");
    setSortOrder("desc");
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <DecksHeader
          onCreate={() => setCreateDeckOpen(true)}
          username={user.firstName ?? ""}
        />
        <DecksFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          clearFilters={clearFilters}
        />
        {selectedTags.length > 0 && (
          <DecksTagChips
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            clearFilters={clearFilters}
          />
        )}
        <DecksContent
          decks={sorted}
          viewMode={viewMode}
          onDeleteDeck={handleDelete}
          onCreateDeck={() => setCreateDeckOpen(true)}
          hasFilters={selectedTags.length > 0}
          searchQuery={searchQuery}
        />
      </main>

      <CreateDeckDialog
        open={createDeckOpen}
        onOpenChangeAction={setCreateDeckOpen}
        createDeckAction={async (newDeck) => {
          await dxdb.deck_table.add(newDeck);
          setCreateDeckOpen(false);
        }}
      />
    </div>
  );
}
