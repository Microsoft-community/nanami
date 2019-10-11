import { Client } from 'discord.js';

import { TestModule } from './Modules';
import { EventContainer } from './Structures/Interfaces/Events';

import config from './config.json';

const bot: Client = new Client();

const test: TestModule = new TestModule(bot);

test.handlers.forEach((container: EventContainer) => {
    bot.on(container.event, container.handler);
});

bot.once('ready', () => {
    console.log('a');
});

bot.login(config.token);