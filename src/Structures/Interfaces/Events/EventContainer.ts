import { EventHandler } from '.';

export interface EventContainer {
    event: string;
    handler: EventHandler;
}