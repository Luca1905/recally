"use client";

import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { dxdb } from "~/localdb/dexie";
import { api } from "~/trpc/react";

export default function CardAddPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const router = useRouter();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardSync = api.card.sync.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!front.trim() || !back.trim()) {
      toast.error("Front and Back fields cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = moment().valueOf();
      const newCard = {
        id: uuid(),
        deckId: deckId as string,
        front,
        back,
        box: 0,
        createdAt: now,
        updatedAt: now,
        type: "new" as const,
      };

      await dxdb.card_table.add(newCard);
      cardSync.mutate([newCard]);

      const deck = await dxdb.deck_table.get(deckId as string);
      if (deck) {
        await dxdb.deck_table.update(deckId as string, {
          cardCount: (deck.cardCount ?? 0) + 1,
          lastModified: now,
        });
      }

      toast.success("Card added successfully");
      router.push(`/deck/${deckId}`);
    } catch (error) {
      console.error(error);
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
        <h1 className="font-semibold text-lg">Add Card</h1>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="card-front">Front</Label>
            <Textarea
              id="card-front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Question or term"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-back">Back</Label>
            <Textarea
              id="card-back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Answer or definition"
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Card"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
