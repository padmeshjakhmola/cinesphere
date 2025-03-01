CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"movie_name" varchar(255) NOT NULL,
	"year" varchar(255) NOT NULL,
	"movie_poster" varchar(255) NOT NULL,
	"movie_video" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "movies_id_unique" UNIQUE("id")
);
