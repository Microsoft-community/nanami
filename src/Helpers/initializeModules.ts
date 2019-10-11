import { Client } from 'discord.js';

import { ModuleCollection } from '../Structures/Interfaces/Modules';

import { voiceChannelHelper } from '../Modules';

export async function initializeModules(client: Client): Promise<ModuleCollection> {
    const col: ModuleCollection = { modules: [] };

    col.modules.push(await voiceChannelHelper(client));

    return col;
}
