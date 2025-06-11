// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `recally_${name}`);

export const cardTypeEnum = pgEnum("card_type", ["new", "learn", "due"]);

export const decks = createTable(
  "deck",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    name: d.varchar({ length: 255 }).notNull(),
    description: d.text(),
    color: d.varchar({ length: 20 }),
    cardCount: d.integer().notNull().default(0),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastModified: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
    lastStudied: d.timestamp({ withTimezone: true }),
    progress: d.integer().notNull().default(0),
    tags: d.text().array().notNull().default(sql`ARRAY[]::text[]`),
  }),
  (t) => [index("deck_name_idx").on(t.name), index("deck_id_idx").on(t.id)],
);

export const cards = createTable(
  "card",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    deckId: d
      .varchar({ length: 36 })
      .references(() => decks.id, { onDelete: "cascade" })
      .notNull(),
    front: d.text().notNull(),
    back: d.text().notNull(),
    imageUrl: d.text(),
    audioUrl: d.text(),
    box: d.integer().notNull().default(0),
    lastReviewedAt: d.timestamp({ withTimezone: true }),
    nextReviewedAt: d.timestamp({ withTimezone: true }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    type: cardTypeEnum("type").notNull(),
  }),
  (t) => [index("card_deck_idx").on(t.deckId)],
);
