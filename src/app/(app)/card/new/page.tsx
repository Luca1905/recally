"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { dxdb } from "~/localdb/dexie";
import { api } from "~/trpc/react";

export default function GlobalCardAddPage() {
  const router = useRouter();
  const cardSync = api.card.sync.useMutation();

  const decks = useLiveQuery(() => dxdb.deck_table.toArray());

  const [selectedDeckId, setSelectedDeckId] = useState<string>("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDeckId) {
      toast.error("Please select a deck");
      return;
    }
    if (!front.trim() || !back.trim()) {
      toast.error("Front and Back fields cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = moment().valueOf();
      const newCard = {
        id: uuid(),
        deckId: selectedDeckId,
        front,
        back,
        box: 0,
        createdAt: now,
        updatedAt: now,
        type: "new" as const,
      };

      await dxdb.card_table.add(newCard);

      // update deck stats
      const deck = await dxdb.deck_table.get(selectedDeckId);
      if (deck) {
        await dxdb.deck_table.update(selectedDeckId, {
          cardCount: (deck.cardCount ?? 0) + 1,
          lastModified: now,
        });
        await dxdb.activity_table.add({
          id: uuid(),
          timestamp: now,
          message: `Created 1 new card in ${deck.name}`
        });
      }

      cardSync.mutate([newCard]);

      toast.success("Card added successfully");
      router.push(`/deck/${selectedDeckId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 border-border border-b bg-background p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          title="Back"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-semibold text-lg">Add New Card</h1>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          {/* Deck select */}
          <div className="space-y-2">
            <Label>Deck</Label>
            {decks === undefined ? (
              <p>Loading decks...</p>
            ) : decks.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No decks available. Please create a deck first.
              </p>
            ) : (
              <Select
                value={selectedDeckId}
                onValueChange={(val) => setSelectedDeckId(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select deck" />
                </SelectTrigger>
                <SelectContent>
                  {decks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Front field */}
          <div className="space-y-2">
            <Label htmlFor="front">Front</Label>
            <Textarea
              id="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Back field */}
          <div className="space-y-2">
            <Label htmlFor="back">Back</Label>
            <Textarea
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="min-h-[80px]"
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
            <Button
              type="submit"
              disabled={isSubmitting || decks?.length === 0}
            >
              {isSubmitting ? "Saving..." : "Add Card"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
