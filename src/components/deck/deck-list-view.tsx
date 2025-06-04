"use client";

import { MoreVertical } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Deck {
  id: string;
  name: string;
  lastModified: Date;
  cardCount: number;
  description: string;
  tags?: string[];
}

interface DeckListProps {
  decks: Deck[];
  onDeleteDeckAction: (id: string) => void;
}

export function DeckList({ decks, onDeleteDeckAction }: DeckListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === decks.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(decks.map((deck) => deck.id));
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedItems.length === decks.length && decks.length > 0
                }
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden sm:table-cell">Tags</TableHead>
            <TableHead className="hidden sm:table-cell">Cards</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {decks.map((deck) => (
            <TableRow key={deck.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(deck.id)}
                  onCheckedChange={() => toggleSelectItem(deck.id)}
                  aria-label={`Select ${deck.name}`}
                />
              </TableCell>
              <TableCell>
                <Link
                  href={`/decks/${deck.id}`}
                  className="font-medium hover:underline"
                >
                  {deck.name}
                </Link>
              </TableCell>
              <TableCell className="hidden max-w-xs md:table-cell">
                <div className="line-clamp-1">{deck.description}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex flex-wrap gap-1">
                  {deck.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {deck.cardCount}
              </TableCell>
              <TableCell>{moment(deck.lastModified).format()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/decks/${deck.id}`}>Open</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/decks/${deck.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDeleteDeckAction(deck.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
