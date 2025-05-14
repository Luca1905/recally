"use client";

import {
  ChevronRight,
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  WalletCards,
} from "lucide-react";

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
import type { NavItem } from "./app-sidebar";

export function NavDecks({
  decks,
}: {
  decks: NavItem[];
}) {
  const { isMobile } = useSidebar();

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
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <ChevronRight className="transition-transform" />
                <Folder />
                All Decks
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {decks.map((item) => (
                <SidebarMenuSub key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>Study Deck</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="text-muted-foreground" />
                        <span>View Deck</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Deck</span>
                      </DropdownMenuItem>
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
