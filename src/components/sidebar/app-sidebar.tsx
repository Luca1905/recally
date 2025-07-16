"use client";

import {
  LayoutDashboard,
  LifeBuoy,
  PlusIcon,
  Send,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Logo from "~/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { dxdb } from "~/localdb/dexie";
import { NavDecks } from "./nav-decks";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

// Static sections (top & bottom)
const NAV_MAIN: NavItem[] = [
  {
    title: "New Card",
    url: "/card/new",
    icon: PlusIcon,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

const NAV_SECONDARY: NavItem[] = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
];

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}
export interface NavSection {
  navMain: NavItem[];
  navSecondary: NavItem[];
  decks: NavItem[];
}

function updateActiveStatus(data: NavSection, pathName: string): NavSection {
  const processNavItems = (items: NavItem[]) => {
    return items.map((item) => ({
      ...item,
      isActive: item.url === pathName,
    }));
  };

  return {
    navMain: processNavItems(data.navMain),
    navSecondary: processNavItems(data.navSecondary),
    decks: processNavItems(data.decks),
  };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();

  // Fetch decks from local DB (Dexie)
  const decksFromDb = useLiveQuery(() => dxdb.deck_table.toArray());

  const updatedData: NavSection = useMemo(() => {
    const deckNavItems: NavItem[] = [
      {
        title: "All Decks",
        url: "/deck",
        icon: WalletCards,
      },
      ...((decksFromDb ?? []).map((d) => ({
        title: d.name,
        url: `/deck/${d.id}`,
        icon: WalletCards,
      })) as NavItem[]),
    ];

    const dynamicData: NavSection = {
      navMain: NAV_MAIN,
      navSecondary: NAV_SECONDARY,
      decks: deckNavItems,
    };

    return updateActiveStatus(dynamicData, pathName);
  }, [decksFromDb, pathName]);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-sidebar-accent" size="lg" asChild>
              <Link href="/dashboard">
                <div className="m-auto flex items-center justify-center space-x-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent">
                    <Logo />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-tagesschrift text-2xl">
                      recally
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={updatedData.navMain} />
        <NavDecks decks={updatedData.decks} />
        <NavSecondary items={updatedData.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
