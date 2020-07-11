CREATE TABLE public.channels (
    "voice_id" TEXT NOT NULL PRIMARY KEY,
    "text_id" TEXT NOT NULL,
    "set_to_purge" INTEGER NOT NULL
);