"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface CreateDeckDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onDeckCreated?: (deck: {
    id: string;
    name: string;
    lastModified: Date;
    cardCount: number;
    description: string;
    tags: string[];
  }) => void;
}

export function CreateDeckDialog({
  open,
  onOpenChangeAction,
  onDeckCreated,
}: CreateDeckDialogProps) {
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
      // In a real app, this would be an API call to create the deck
      // For now, we'll simulate a successful creation
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newDeck = {
        id: Date.now().toString(),
        name: deckName,
        lastModified: new Date(),
        cardCount: 0,
        description: "",
        tags: [],
      };

      toast.success(`Deck "${deckName}" created successfully`);
      onOpenChangeAction(false);
      setDeckName("");

      // Call onDeckCreated if provided
      onDeckCreated?.(newDeck);

      // Navigate to the new deck
      router.push(`/decks/${newDeck.id}`);
    } catch (error) {
      toast.error("Failed to create deck. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new deck</DialogTitle>
            <DialogDescription>
              Enter a name for your new flashcard deck.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Deck name</Label>
              <Input
                id="name"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="e.g., Spanish Vocabulary"
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChangeAction(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Deck"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
