"use client";

import {
  LayoutGrid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CreateDeckDialog } from "~/components/deck/create-deck-dialog";
import { DeckGrid } from "~/components/deck/deck-grid";
import { DeckList } from "~/components/deck/deck-list-view";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Sample deck data
const sampleDecks = [
  {
    id: "1",
    name: "Spanish Vocabulary",
    lastModified: new Date("2025-05-14"),
    cardCount: 42,
    description: "Essential Spanish words and phrases for beginners",
    tags: ["language", "spanish"],
  },
  {
    id: "2",
    name: "JavaScript Fundamentals",
    lastModified: new Date("2025-05-10"),
    cardCount: 36,
    description: "Core JavaScript concepts and syntax",
    tags: ["programming", "web"],
  },
  {
    id: "3",
    name: "World Capitals",
    lastModified: new Date("2025-05-05"),
    cardCount: 195,
    description: "Capital cities of countries around the world",
    tags: ["geography"],
  },
  {
    id: "4",
    name: "Biology Terms",
    lastModified: new Date("2025-04-28"),
    cardCount: 78,
    description: "Important terminology for biology students",
    tags: ["science", "biology"],
  },
  {
    id: "5",
    name: "Norisk",
    lastModified: new Date("2025-04-20"),
    cardCount: 15,
    description: "Custom study deck for personal notes",
    tags: ["personal"],
  },
];

export default function DecksPage() {
  const [decks, setDecks] = useState(sampleDecks);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "lastModified" | "cardCount">(
    "lastModified",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [createDeckOpen, setCreateDeckOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(decks.flatMap((deck) => deck.tags || [])));

  // Filter decks based on search query and selected tags
  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => deck.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Sort decks based on selected criteria
  const sortedDecks = [...filteredDecks].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "lastModified") {
      comparison = a.lastModified.getTime() - b.lastModified.getTime();
    } else if (sortBy === "cardCount") {
      comparison = a.cardCount - b.cardCount;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleDeleteDeck = (id: string) => {
    setDecks(decks.filter((deck) => deck.id !== id));
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("lastModified");
    setSortOrder("desc");
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="mb-6 p-4">
        <h1 className="font-bold text-3xl text-muted-foreground">
          <span className="mr-1">👋</span> {(() => {
            const hour = new Date().getHours();

            if (hour < 12) {
              return "Good morning";
            }
            if (hour < 18) {
              return "Good afternoon";
            }
            return "Good evening";
          })()}, User!
        </h1>
      </div>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-bold text-2xl text-foreground">All Decks</h1>
          <Button onClick={() => setCreateDeckOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Deck
          </Button>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search decks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <div className="mb-2 font-medium text-foreground text-sm">
                      Tags
                    </div>
                    <div className="mb-4 flex flex-wrap gap-1">
                      {allTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={
                            selectedTags.includes(tag) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleTagSelect(tag)}
                          className="h-7 text-xs"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>

                    <div className="mb-2 font-medium text-foreground text-sm">
                      Sort by
                    </div>
                    <Select
                      value={sortBy}
                      onValueChange={(value: string) =>
                        setSortBy(
                          value as "name" | "lastModified" | "cardCount",
                        )
                      }
                    >
                      <SelectTrigger className="mb-2 w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="lastModified">
                          Last Modified
                        </SelectItem>
                        <SelectItem value="cardCount">Card Count</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mb-2 font-medium text-foreground text-sm">
                      Order
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder("asc")}
                        className="flex-1"
                      >
                        Ascending
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder("desc")}
                        className="flex-1"
                      >
                        Descending
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="mt-4 w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex rounded-md border border-input">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Button
                  key={tag}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTagSelect(tag)}
                  className="h-7 text-xs"
                >
                  {tag}
                  <span className="ml-1">×</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {sortedDecks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-medium text-foreground text-lg">
              No decks found
            </h3>
            <p className="mb-4 text-muted-foreground text-sm">
              {searchQuery || selectedTags.length > 0
                ? "Try adjusting your search or filters"
                : "Create your first deck to get started"}
            </p>
            <Button onClick={() => setCreateDeckOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Deck
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <DeckGrid decks={sortedDecks} onDeleteDeckAction={handleDeleteDeck} />
        ) : (
          <DeckList decks={sortedDecks} onDeleteDeckAction={handleDeleteDeck} />
        )}
      </main>

      <CreateDeckDialog
        open={createDeckOpen}
        onOpenChangeAction={setCreateDeckOpen}
        onDeckCreated={(newDeck) => {
          setDecks([...decks, newDeck]);
          setCreateDeckOpen(false);
        }}
      />
    </div>
  );
}
