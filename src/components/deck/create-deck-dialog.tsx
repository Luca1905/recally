"use client";

import type React from "react";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
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
import type { Deck as LocalDeck } from "~/localdb/dexie";

interface CreateDeckDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  createDeckAction: (deck: LocalDeck) => Promise<void>;
}

export function CreateDeckDialog({
  open,
  onOpenChangeAction,
  createDeckAction,
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
      await createDeckAction(newDeck);

      toast.success(`Deck "${deckName}" created successfully`);
      onOpenChangeAction(false);
      setDeckName("");

      router.push(`/deck/${newDeck.id}`);
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
