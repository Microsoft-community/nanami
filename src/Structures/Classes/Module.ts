import { Client } from 'discord.js';

import { EventContainer } from '../Interfaces/Events';
import SimpleLoggerW = require('simpleloggerw');


export class Module {
    name: string;
    handlers: EventContainer[];
    client: Client;
    logger: SimpleLoggerW;

    constructor(client: Client, name: string) {
        this.handlers = [];
        this.client = client;
        this.name = name;
        this.logger = new SimpleLoggerW();
    }
}