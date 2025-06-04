"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Logo from "~/components/ui/logo";
import { useMousePosition, useWindowSize } from "~/lib/hooks";

export default function LandingPage() {
  const windowSize = useWindowSize();
  const mousePosition = useMousePosition();

  const calculateTransform = (x: number, y: number, strength = 20) => {
    if (windowSize.width === undefined || windowSize.height === undefined) {
      return { x: 0, y: 0 };
    }

    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;

    const deltaX = (x - centerX) / strength;
    const deltaY = (y - centerY) / strength;

    return { x: deltaX, y: deltaY };
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        <motion.div
          className="absolute top-20 left-[15%] h-48 w-48 rounded-full bg-primary/15 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[15%] bottom-32 h-56 w-56 rounded-full bg-secondary/15 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          className="absolute top-24 right-24 h-12 w-12 rounded-full border border-primary/20"
          style={{
            transform: `translate(${
              calculateTransform(mousePosition.x, mousePosition.y, 50).x
            }px, ${
              calculateTransform(mousePosition.x, mousePosition.y, 50).y
            }px)`,
          }}
        />
        <motion.div
          className="absolute bottom-48 left-24 h-8 w-8 rotate-45 border border-accent/20"
          style={{
            transform: `translate(${
              calculateTransform(mousePosition.x, mousePosition.y, 40).x
            }px, ${
              calculateTransform(mousePosition.x, mousePosition.y, 40).y
            }px) rotate(45deg)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header with better spacing and hierarchy */}
        <header className="container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="h-10 w-10">
                <Logo />
              </div>
              <span className="font-semibold font-tagesschrift text-xl">
                recally
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <Link
                href="/login"
                className="rounded-md px-2 py-1 font-medium text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Log In
              </Link>
              <Button asChild size="sm" className="font-medium">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </motion.div>
          </nav>
        </header>

        {/* Main content with improved typography and spacing */}
        <main className="container mx-auto flex flex-1 items-center px-6 py-16">
          <div className="grid w-full gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Content section with better typography hierarchy */}
            <div className="flex flex-col justify-center space-y-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="font-bold text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-primary via-primary to-secondary-foreground bg-clip-text text-transparent">
                    Remember more
                  </span>
                  <br />
                  <span className="text-foreground">
                    with spaced repetition
                  </span>
                </h1>

                <p className="max-w-lg text-lg text-muted-foreground leading-relaxed md:text-xl">
                  Recally uses science-backed spaced repetition to help you
                  retain knowledge effectively and permanently.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group font-semibold text-base shadow-lg transition-all hover:shadow-xl"
                >
                  <Link href="/dashboard">
                    Get Started Free
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-semibold text-base"
                >
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </motion.div>

              {/* Social proof or key features */}
              <motion.div
                className="flex items-center gap-6 pt-4 text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Science-backed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>Works offline</span>
                </div>
              </motion.div>
            </div>

            {/* Card demo with improved visual hierarchy */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-sm">
                {/* Simplified background decorations */}
                <div className="-left-4 -top-4 absolute h-16 w-16 rounded-lg bg-primary/10" />
                <div className="-bottom-6 -right-6 absolute h-20 w-20 rounded-full bg-secondary/10" />

                <motion.div
                  className="relative"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="rounded-2xl border bg-card p-6 shadow-2xl">
                    {/* Card header with better spacing */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <div className="h-4 w-4 rounded-full bg-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-card-foreground">
                            Spanish Vocabulary
                          </div>
                          <div className="text-muted-foreground text-xs">
                            120 cards
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-xs">
                        12 due
                      </div>
                    </div>

                    {/* Card content with better contrast */}
                    <div className="space-y-4">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                          Question
                        </div>
                        <div className="font-semibold text-xl">
                          ¿Cómo estás?
                        </div>
                      </div>

                      <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                          Answer
                        </div>
                        <div className="font-semibold text-xl">
                          How are you?
                        </div>
                      </div>
                    </div>

                    {/* Simplified rating buttons */}
                    <div className="mt-6 flex justify-between gap-2">
                      {[
                        { rating: 1, label: "Hard", color: "bg-red-500" },
                        { rating: 2, label: "Good", color: "bg-yellow-500" },
                        { rating: 3, label: "Easy", color: "bg-green-500" },
                      ].map(({ rating, label, color }) => (
                        <Button
                          key={rating}
                          variant="outline"
                          size="sm"
                          className="flex-1 font-medium"
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
