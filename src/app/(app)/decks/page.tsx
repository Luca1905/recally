"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus } from "lucide-react";
import moment from "moment";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { GradientPicker } from "~/components/ui/gradient-picker";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { type Deck, db, resetDatabase } from "~/server/localdb/dexie";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The name cannot be empty" })
    .max(64, { message: "Name too long" }),
  description: z.string().optional(),
  color: z.string().min(1, { message: "Pick a color" }),
});

export default function DecksPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color:
        "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    },
  });

  function handleNewDeckSubmit(deck: z.infer<typeof formSchema>) {
    db.deck_table.add({
      ...deck,
      progress: 0,
      cardCount: 0,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    });
    setDialogOpen(false);
  }

  const [hoveredDeck, setHoveredDeck] = useState<number | undefined>(undefined);
  const [background, setBackground] = useState(
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    form.setValue("color", background, { shouldValidate: true });
  }, [background, form]);

  const decks = useLiveQuery(() => db.deck_table.toArray());
  if (!decks) return null;

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="mb-8 flex flex-wrap items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="font-bold text-3xl">Your Decks</h1>
          <p className="text-foreground/60">
            Manage and study your flashcard collections
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-translate-y-1/2 absolute top-1/2 left-3 text-foreground/40"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search decks..."
              className="rounded-xl border-foreground/10 bg-white pr-4 pl-10 text-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="group">
                <Plus /> New Deck
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Deck</DialogTitle>
                <DialogDescription>
                  Add a new flashcard deck to your collection
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleNewDeckSubmit, (errors) => {
                    console.log("Validation Errors:", errors);
                  })}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deck Name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full rounded-lg border-foreground/10 bg-white focus:border-primary focus:ring-primary"
                            placeholder="e.g. French Vocabulary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full rounded-lg border-foreground/10 bg-white focus:border-primary focus:ring-primary"
                            placeholder="What is this deck about?"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={() => (
                      <FormItem>
                        <FormLabel>Pick your Deck Color</FormLabel>
                        <FormControl>
                          <div
                            className="preview !bg-cover !bg-center flex h-full w-full items-center justify-center truncate rounded p-10 transition-all"
                            style={{ background }}
                          >
                            <GradientPicker
                              background={background}
                              setBackground={setBackground}
                              className="w-full truncate"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button variant="destructive" type="button">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Create Deck</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button className="group" onClick={async () => await resetDatabase()}>
            Reset Decks
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck: Deck, index: number) => (
          <motion.div
            key={deck.id}
            className="group relative overflow-hidden rounded-2xl bg-white p-1 shadow-lg transition-all hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setHoveredDeck(deck.id)}
            onHoverEnd={() => setHoveredDeck(undefined)}
          >
            <div
              className={`absolute top-0 left-0 h-24 w-full bg-gradient-to-r ${deck.color} opacity-90`}
            />

            <div className="relative rounded-xl bg-white p-5">
              <motion.div
                className="mb-4 flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + 0.1 * index }}
              >
                <h2 className="font-bold text-xl">{deck.name}</h2>
                <Button className="h-8 w-8 rounded-lg text-foreground/60 hover:bg-primary/5 hover:text-primary">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </Button>
              </motion.div>

              <motion.div
                className="mb-4 flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + 0.1 * index }}
              >
                <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 font-medium text-primary text-xs">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  {deck.cardCount} cards
                </div>
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + 0.1 * index }}
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">Progress</span>
                  <span className="text-foreground/60">{deck.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${deck.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="mb-6 flex items-center gap-1 text-foreground/60 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + 0.1 * index }}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Last studied {deck.lastStudied}
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + 0.1 * index }}
              >
                <Button
                  asChild
                  className="flex-1"
                  variant={hoveredDeck === deck.id ? "outline" : "default"}
                >
                  <Link href={`/study/${deck.id}`}>Study Now</Link>
                </Button>

                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/decks/${deck.id}`}>Details</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
