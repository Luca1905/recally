"use client";

import {
  Dna,
  Globe2,
  LayoutDashboard,
  LifeBuoy,
  PlusIcon,
  Send,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "~/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { NavDecks } from "./nav-decks";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data: NavSection = {
  navMain: [
    {
      title: "New Deck",
      url: "#",
      icon: PlusIcon,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    // },
  ],
  navSecondary: [
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
  ],
  decks: [
    {
      title: "All Decks",
      url: "/deck",
      icon: WalletCards,
    },
    {
      title: "Heredity",
      url: "#",
      icon: Dna,
    },
    {
      title: "City Geography",
      url: "#",
      icon: Globe2,
    },
  ],
};

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
  const updatedData = updateActiveStatus(data, pathName);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-sidebar-accent" size="lg" asChild>
              <Link href="#">
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
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
