import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";
import { AppSidebar } from "../../components/sidebar/app-sidebar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar className="h-screen overflow-hidden" />
      <SidebarInset className="flex h-screen flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <ModeToggle className="bg-accent" />
          </div>
          <div className="ml-auto flex items-center px-4">
            <UserButton
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
          </div>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
