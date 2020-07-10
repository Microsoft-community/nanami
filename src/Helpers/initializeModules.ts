import { Client } from 'discord.js';

import { VoiceChannelHelper } from '../Modules';

import { ModuleCollection } from '../Structures/Interfaces/Modules';
import { Config } from '../Structures/Interfaces';

export async function initializeModules(client: Client, config: Config ): Promise<ModuleCollection> {
    const col: ModuleCollection = { modules: [] };

    col.modules.push(new VoiceChannelHelper(client, config.VoiceChannelHelper));
    
    return col;
}
