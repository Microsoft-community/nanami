import { Client } from 'discord.js';

import { voiceChannelHelper } from '../Modules';
import { RoleMention } from '../Modules';

import { ModuleCollection } from '../Structures/Interfaces/Modules';
import { Config } from '../Structures/Interfaces';

export async function initializeModules(client: Client, config: Config ): Promise<ModuleCollection> {
    const col: ModuleCollection = { modules: [] };

    col.modules.push(await voiceChannelHelper(client, config.VoiceChannelHelper));
    col.modules.push(new RoleMention(client, config.RoleMention));
    
    return col;
}
