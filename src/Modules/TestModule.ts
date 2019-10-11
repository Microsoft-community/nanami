import { Message, Client } from 'discord.js';

import { Module } from '../Structures/Classes';

export class TestModule extends Module {
    constructor(client: Client) {
        super(client);

        this.handlers.push({ event: 'message', handler: this.handleMessage });
    }

    async handleMessage(message: Message) {
        if (message.author.bot) return;

        await message.reply('owo');
    }
}