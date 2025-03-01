import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  moviename: varchar("movie_name", { length: 255 }).default("Movie"),
  year: varchar("year", { length: 255 }).default("2025"),
  moviePoster: varchar("movie_poster", { length: 255 }).notNull(),
  movieVideo: varchar("movie_video", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
