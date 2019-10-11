import { Message, Client } from 'discord.js';

import { Module } from '../Structures/Classes';

export class TestModule extends Module {
    constructor(client: Client) {
        super(client, "TestModule");

        this.handlers.push({ event: 'message', handler: { func: this.handleMessage } });
    }

    async handleMessage(message: Message) {
        if (message.author.bot) return;

        await message.reply('owo');
    }
}