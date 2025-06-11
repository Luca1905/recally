"use client";

import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { dxdb } from "~/server/localdb/dexie";
import { api } from "~/trpc/react";

type SyncState = "idle" | "syncing" | "success" | "error";

export default function SyncButton() {
  const [state, setState] = useState<SyncState>("idle");

  const getColor = () => {
    switch (state) {
      case "syncing":
        return "bg-amber-500 text-white hover:bg-amber-600";
      case "success":
        return "bg-emerald-600 text-white hover:bg-emerald-700";
      case "error":
        return "bg-rose-600 text-white hover:bg-rose-700";
      default:
        return "bg-muted text-foreground hover:bg-muted/80";
    }
  };

  const deckSync = api.deck.sync.useMutation();
  const cardSync = api.card.sync.useMutation();

  const sync = async () => {
    setState("syncing");
    try {
      //1) Fetch local data
      const decks = await dxdb.deck_table.toArray();
      const cards = await dxdb.card_table.toArray();

      //2) Sync with cloud
      await deckSync.mutateAsync(decks);
      await cardSync.mutateAsync(cards);

      setState("success");
      setTimeout(() => setState("idle"), 3000);
    } catch (err) {
      console.error("Manual sync failed", err);
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  return (
    <Button
      onClick={sync}
      className={`gap-1 ${getColor()}`}
      size="sm"
      variant="secondary"
      title="Sync with cloud"
    >
      <RefreshCcw className={`${state === "syncing" ? "animate-spin" : ""}`} />
      <span className="sr-only sm:not-sr-only">Sync</span>
    </Button>
  );
}
