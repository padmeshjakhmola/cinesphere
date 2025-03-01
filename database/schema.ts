import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  moviePoster: varchar("movie_poster", { length: 255 }).notNull(),
  movieVideo: varchar("movie_video", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
