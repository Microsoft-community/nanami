import { Client } from 'discord.js';

import { EventContainer } from '../Interfaces/Events';


export class Module {
    handlers: EventContainer[];
    client: Client;

    constructor(client: Client) {
        this.handlers = [];
        this.client = client;
    }
}