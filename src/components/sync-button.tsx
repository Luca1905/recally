"use client";

import { useState } from "react";
import { dxdb } from "~/localdb/dexie";
import { api } from "~/trpc/react";

type SyncState = "idle" | "syncing" | "success" | "error";

export default function SyncButton() {
  const [state, setState] = useState<SyncState>("idle");

  const getColors = () => {
    switch (state) {
      case "syncing":
        return {
          ping: "bg-amber-400",
          dot: "bg-amber-500",
        };
      case "success":
        return {
          ping: "bg-emerald-400",
          dot: "bg-emerald-500",
        };
      case "error":
        return {
          ping: "bg-rose-400",
          dot: "bg-rose-500",
        };
      default:
        return {
          ping: "bg-emerald-400",
          dot: "bg-emerald-500",
        };
    }
  };

  const getStatusText = () => {
    switch (state) {
      case "syncing":
        return "Syncing...";
      case "success":
        return "Sync complete";
      case "error":
        return "Sync failed";
      default: // idle
        return "Synced";
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

  const colors = getColors();

  return (
    <div className="flex h-8 items-center gap-2">
      <button
        type="button"
        onClick={sync}
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center"
        title="Sync with cloud"
      >
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colors.ping} opacity-75`}
        />
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${colors.dot}`}
        />
      </button>
      <span className="text-muted-foreground text-sm leading-none">
        {getStatusText()}
      </span>
    </div>
  );
}
