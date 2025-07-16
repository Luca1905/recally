"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { dxdb } from "~/localdb/dexie";

export default function DeckEditPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const router = useRouter();

  const deck = useLiveQuery(() => dxdb.deck_table.get(deckId), [deckId]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (deck) {
      setName(deck.name ?? "");
      setDescription(deck.description ?? "");
      setColor(deck.color ?? "#ffffff");
    }
  }, [deck]);

  if (deck === undefined) {
    return <div className="p-4">Loading...</div>;
  }

  if (!deck) {
    return <div className="p-4">Deck not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Deck name cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      await dxdb.deck_table.update(deck.id, {
        name,
        description,
        color,
        lastModified: moment().valueOf(),
      });

      toast.success("Deck updated successfully");
      router.push(`/deck/${deck.id}`);
    } catch (error) {
      toast.error("Failed to update deck. Please try again.");
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
        <h1 className="font-semibold text-lg">Edit Deck</h1>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="deck-name">Deck name</Label>
            <Input
              id="deck-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deck-description">Description</Label>
            <Textarea
              id="deck-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deck-color">Color</Label>
            <Input
              id="deck-color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-20 p-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
