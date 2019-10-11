import { Client } from 'discord.js';

import config from './config.json';
import { initializeModules } from './Helpers';
import { ModuleCollection } from './Structures/Interfaces/Modules';
import { Module } from './Structures/Classes';
import { EventContainer } from './Structures/Interfaces/Events/index.js';

const bot: Client = new Client();

bot.once('ready', async () => {
    const modCol: ModuleCollection = await initializeModules(bot);
    
    modCol.modules.forEach((module: Module) => {
        console.log(`Initializing module: [${module.name}]`);
        module.handlers.forEach((container: EventContainer) => {
            if (container.handler.once) {
                bot.once(container.event, (...args: any) => container.handler.func(...args));
            } else {
                bot.on(container.event, (...args: any) => container.handler.func(...args));
            }
        });
    });
});

bot.login(config.token);