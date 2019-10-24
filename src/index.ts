import { Client } from 'discord.js';
import SimpleLoggerW from 'simpleloggerw';

import { initializeModules } from './Helpers';
import { ModuleCollection } from './Structures/Interfaces/Modules';
import { Module } from './Structures/Classes';
import { EventContainer } from './Structures/Interfaces/Events/index.js';
import { Config } from './Structures/Interfaces';

const client: Client = new Client();
const config: Config = require('../config.json');
const Logger = new SimpleLoggerW();

client.once('ready', async () => {
    const modCol: ModuleCollection = await initializeModules(client, config); 
    
    modCol.modules.forEach((module: Module) => {
        Logger.info(`Initializing module: [${module.name}]`);
        module.handlers.forEach((container: EventContainer) => {
            if (container.event === 'ready') {
                container.handler.func();
                if (container.handler.once) return;
            }

            if (container.handler.once) {
                client.once(container.event, (...args: any) => container.handler.func(...args));
            } else {
                client.on(container.event, (...args: any) => container.handler.func(...args));
            }
        });
        Logger.info(`Initialized module [${module.name}]`);
    });

    Logger.info('Modules initialized.');
});

client.login(config.token);