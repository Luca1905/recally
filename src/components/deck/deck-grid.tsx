"use client";

import { BookOpen, Clock, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { formatUNIX } from "~/lib/utils";
import type { Deck as LocalDeck } from "~/localdb/dexie";

interface DeckGridProps {
  decks: LocalDeck[];
  onDeleteDeckAction: (id: string) => Promise<number>;
}

export function DeckGrid({ decks, onDeleteDeckAction }: DeckGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {decks.map((deck) => (
        <Card key={deck.id} className="flex flex-col hover:border-primary">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <Link href={`/deck/${deck.id}`}>
                <CardTitle className="line-clamp-1 text-lg">
                  {deck.name}
                </CardTitle>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="-mr-2 -mt-2 h-8 w-8"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/deck/${deck.id}`}>Open</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/deck/${deck.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={async () => await onDeleteDeckAction(deck.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="line-clamp-2">
              {deck.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-2">
            <div className="flex flex-wrap gap-1">
              {deck.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{deck.cardCount} cards</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatUNIX(deck.lastModified)}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
