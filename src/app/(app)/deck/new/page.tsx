"use client";

import moment from "moment";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Deck as LocalDeck } from "~/server/localdb/dexie";
import { dxdb } from "~/server/localdb/dexie";

export default function CreateDeckPage() {
  const router = useRouter();
  const [deckName, setDeckName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deckName.trim()) {
      toast.error("Please enter a deck name");
      return;
    }

    setIsSubmitting(true);

    try {
      const newDeck: LocalDeck = {
        id: uuid(),
        name: deckName,
        lastModified: moment().valueOf(),
        cardCount: 0,
        description: "",
        tags: [],
        progress: 0,
        createdAt: moment().valueOf(),
        color: "#ffffff",
      };
      await dxdb.deck_table.add(newDeck);

      toast.success(`Deck "${deckName}" created successfully`);
      router.push(`/deck/${newDeck.id}`);
    } catch (error) {
      toast.error("Failed to create deck. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          title="Back"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold">Create New Deck</h1>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="deck-name" className="text-sm font-medium">
              Deck name
            </Label>
            <Input
              id="deck-name"
              placeholder="e.g. Spanish Vocabulary"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Deck"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
} 