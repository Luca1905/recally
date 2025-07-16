"use client";

import {
  ChevronRight,
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  WalletCards,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { dxdb } from "~/localdb/dexie";
import type { NavItem } from "./app-sidebar";

export function NavDecks({
  decks,
}: {
  decks: NavItem[];
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="space-x-2">
        <span>Decks</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Collapsible
            className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
            defaultOpen={true}
          >
            <div
              className={`flex items-center rounded-md ${
                decks[0]?.isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }`}
            >
              <CollapsibleTrigger className="px-[7.5px]">
                <ChevronRight size={16} className="transition-transform" />
              </CollapsibleTrigger>

              <SidebarMenuButton
                className="flex h-8 items-center rounded-md bg-sidebar text-sm"
                asChild
              >
                <Link href="/deck" className="flex w-full items-center gap-1.5">
                  <WalletCards size={16} />
                  <span className="truncate">All Decks</span>
                </Link>
              </SidebarMenuButton>
            </div>
            <CollapsibleContent>
              {decks.slice(1).map((item) => (
                <SidebarMenuSub key={item.title}>
                  <SidebarMenuButton
                    className={
                      item.isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : ""
                    }
                    asChild
                  >
                    <Link href={item.url} className="flex items-center gap-1.5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem asChild>
                        <Link
                          href={`${item.url}/study`}
                          className="flex w-full items-center gap-2"
                        >
                          <Folder className="text-muted-foreground" />
                          <span>Study Deck</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={item.url}
                          className="flex w-full items-center gap-2"
                        >
                          <Share className="text-muted-foreground" />
                          <span>View Deck</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DeleteDeckPopover
                        deckUrl={item.url}
                        deckTitle={item.title}
                        onDeleted={() => {
                          router.push("/deck");
                        }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSub>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function DeleteDeckPopover({
  deckUrl,
  deckTitle,
  onDeleted,
}: {
  deckUrl: string;
  deckTitle: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const deckId = React.useMemo(() => deckUrl.split("/").pop() ?? "", [deckUrl]);

  const handleDelete = async () => {
    await dxdb.deleteDeck(deckId);
    setOpen(false);
    if (onDeleted) onDeleted();
    else router.push("/deck");
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <DropdownMenuItem
          className="flex w-full items-center gap-2 text-red-600 dark:text-red-500"
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Trash2 className="text-muted-foreground" />
          <span>Delete Deck</span>
        </DropdownMenuItem>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete "{deckTitle}"? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
