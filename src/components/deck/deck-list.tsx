"use client";

import { ArrowUpDown, FolderPlus, MoreVertical } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
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
}

interface DeckListProps {
  decks: Deck[];
  onDeleteDeck: (id: string) => void;
}

export function DeckList({ decks, onDeleteDeck }: DeckListProps) {
  const [sortField, setSortField] = useState<"name" | "lastModified">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSort = (field: "name" | "lastModified") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedDecks = [...decks].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return sortDirection === "asc"
      ? a.lastModified.getTime() - b.lastModified.getTime()
      : b.lastModified.getTime() - a.lastModified.getTime();
  });

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">All Decks</h2>
        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <Button variant="outline" size="sm" className="h-8">
              <FolderPlus className="mr-2 h-4 w-4" />
              New folder
            </Button>
          )}
        </div>
      </div>

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
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 font-medium"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("lastModified")}
                  className="flex items-center gap-1 font-medium"
                >
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDecks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No decks found.
                </TableCell>
              </TableRow>
            ) : (
              sortedDecks.map((deck) => (
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
                          onClick={() => onDeleteDeck(deck.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
