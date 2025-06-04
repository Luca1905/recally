import "~/styles/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "recally",
  description: "intelligent flashcards",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
