CREATE TABLE public.channels (
    "voice_id" TEXT NOT NULL PRIMARY KEY,
    "channel_id" TEXT NOT NULL,
    "set_to_purge" INTEGER NOT NULL
);

ALTER TABLE public.channels
    OWNER to (user)