import { UserButton } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuButton
        size="lg"
        className="flex justify-center text-sidebar-accent-foreground"
      >
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
              termsPageUrl: "https://clerk.com/terms",
            },
            elements: {
              avatarBox: "h-8 w-8 rounded-lg",
              userButtonBox: "flex w-full items-center gap-2",
              formButtonPrimary:
                "bg-sidebar-accent text-sidebar-accent-foreground",
            },
          }}
        />
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
