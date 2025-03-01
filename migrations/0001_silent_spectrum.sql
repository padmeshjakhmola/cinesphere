ALTER TABLE "movies" ALTER COLUMN "movie_name" SET DEFAULT 'Movie';--> statement-breakpoint
ALTER TABLE "movies" ALTER COLUMN "movie_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "movies" ALTER COLUMN "year" SET DEFAULT '2025';--> statement-breakpoint
ALTER TABLE "movies" ALTER COLUMN "year" DROP NOT NULL;