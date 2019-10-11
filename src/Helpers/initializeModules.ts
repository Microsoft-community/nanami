import { Client } from 'discord.js';

import { ModuleCollection } from '../Structures/Interfaces/Modules';
import { voiceChannelHelper } from '../Modules';
import { Config } from 'src/Structures/Interfaces';
import { VoiceChannelHelperConfig } from 'src/Modules/VoiceChannelHelper';


export async function initializeModules(client: Client, config: Config ): Promise<ModuleCollection> {
    const col: ModuleCollection = { modules: [] };

    col.modules.push(await voiceChannelHelper(client, config.VoiceChannelHelper));

    return col;
}
