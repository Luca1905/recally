"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { dxdb } from "~/localdb/dexie";

export default function CardEditPage() {
  const params = useParams<{ deckId: string; cardId: string }>();
  const { deckId, cardId } = params;
  const router = useRouter();

  const card = useLiveQuery(
    () => dxdb.card_table.get(cardId as string),
    [cardId],
  );

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (card) {
      setFront(card.front ?? "");
      setBack(card.back ?? "");
    }
  }, [card]);

  if (card === undefined) {
    return <div className="p-4">Loading...</div>;
  }

  if (!card) {
    return <div className="p-4">Card not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!front.trim() || !back.trim()) {
      toast.error("Front and Back fields cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = moment().valueOf();
      await dxdb.card_table.update(cardId as string, {
        front,
        back,
        updatedAt: now,
      });

      toast.success("Card updated successfully");
      router.push(`/deck/${deckId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update card. Please try again.");
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
        <h1 className="font-semibold text-lg">Edit Card</h1>
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
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-back">Back</Label>
            <Textarea
              id="card-back"
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
