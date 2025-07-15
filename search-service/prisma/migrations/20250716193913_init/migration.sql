-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "year" INTEGER NOT NULL,
    "director" VARCHAR(500),
    "plot" VARCHAR(2000),
    "poster" VARCHAR(500),

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);
