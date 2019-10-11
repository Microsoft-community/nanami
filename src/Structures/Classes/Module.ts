import { Client } from 'discord.js';

import { EventContainer } from '../Interfaces/Events';


export class Module {
    name: string;
    handlers: EventContainer[];
    client: Client;

    constructor(client: Client, name: string) {
        this.handlers = [];
        this.client = client;
        this.name = name;
    }
}