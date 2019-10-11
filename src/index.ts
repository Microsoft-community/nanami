import { Client } from 'discord.js';

import { initializeModules } from './Helpers';
import { ModuleCollection } from './Structures/Interfaces/Modules';
import { Module } from './Structures/Classes';
import { EventContainer } from './Structures/Interfaces/Events/index.js';
import { Config } from './Structures/Interfaces';

const bot: Client = new Client();
const config: Config = require('../config.json');

bot.once('ready', async () => {
    const modCol: ModuleCollection = await initializeModules(bot, config); 
    
    modCol.modules.forEach((module: Module) => {
        console.log(`Initializing module: [${module.name}]`);
        module.handlers.forEach((container: EventContainer) => {
            if (container.handler.once) {
                bot.once(container.event, (...args: any) => container.handler.func(...args));
            } else {
                bot.on(container.event, (...args: any) => container.handler.func(...args));
            }
        });
        console.log('Modules initialized');
    });
});

bot.login(config.token);