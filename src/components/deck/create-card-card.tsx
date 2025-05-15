"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateDeckDialog } from "~/components/deck/create-deck-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function CreateDeckCard() {
  const [createDeckOpen, setCreateDeckOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => setCreateDeckOpen(true)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" />
            New Deck
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Create a new deck to study with. Optionally start from a PDF,
            YouTube video, or notes.
          </CardDescription>
        </CardContent>
      </Card>

      <CreateDeckDialog
        open={createDeckOpen}
        onOpenChange={setCreateDeckOpen}
      />
    </>
  );
}
