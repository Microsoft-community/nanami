import { EventHandler } from '.';
import { ClientEvents } from 'discord.js';

export interface EventContainer {
    event: keyof ClientEvents;
    handler: EventHandler;
}