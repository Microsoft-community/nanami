import { Client, GuildMember, PermissionOverwrites, VoiceChannel, TextChannel, VoiceState } from 'discord.js';
import * as sqlite from 'sqlite';

import { Module } from '../Structures/Classes';

class VoiceChannelHelper extends Module {
    db: sqlite.Database;
    config: VoiceChannelHelperConfig;

    constructor(client: Client, db: sqlite.Database, config: VoiceChannelHelperConfig) {
        super(client, "Voice Channel Helper");
        
        this.config = config;
        this.db = db;

        this.handlers.push({ event: 'voiceStateUpdate', handler: { func: this.handleVoiceStateUpdate.bind(this) }});
        this.handlers.push({ event: 'ready', handler: { func: this.handleReady.bind(this), once: true }});
    }

    private async purgeAll() {
        const channels = await this.db.all('SELECT text_id FROM channels WHERE set_to_purge = 1');

        for (const channel of channels) {
            await this.purge(this.client.channels.cache.get(channel.text_id) as TextChannel);
        }
    }  
    
    private async purge(channel: TextChannel) {
        while (true) { 
            const messages = await channel.messages.fetch({ limit: 100 });

            if (messages.size > 0) {
                await channel.bulkDelete(messages);
            } else {
                this.db.run('UPDATE channels SET set_to_purge = 0 WHERE text_id = ?', [channel.id]);
                break;
            }
        }
    }

    handleReady() {
        setInterval(this.purgeAll.bind(this), this.config.purgeInterval);
    }

    async handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
        if (oldState.channelID === newState.channelID) return;
        if (!newState.member || !oldState.member) return;

        const channels = await this.db.all('SELECT voice_id, text_id FROM channels');

        if (oldState.channelID && channels.some((v) => v.voice_id == oldState.channelID)) {
            const voiceChannel = this.client.channels.cache.get(oldState.channelID) as VoiceChannel;
            const textChannel = this.client.channels.cache.get(channels.find((v) => v.voice_id == oldState.channelID).text_id) as TextChannel;
            const permissions = textChannel.permissionOverwrites.find((v: PermissionOverwrites) => v.id === oldState.member!.id);

            if (voiceChannel.members.size < 1) {
                this.db.run('UPDATE channels SET set_to_purge = 1 WHERE voice_id = ?', [oldState.channelID]);
            }

            if (permissions) permissions.delete();
            if (this.config.emitLog) textChannel.send(`${oldState.member} has left the voice channel.`); 
        }

        if (channels.some((v) => v.voice_id == newState.channelID)) {
            const textChannel = this.client.channels.cache.get(channels.find((v) => v.voice_id === newState.channelID).text_id) as TextChannel;

            this.db.run('UPDATE channels SET set_to_purge = 0 WHERE voice_id = ?', [newState.channelID]);

            textChannel.updateOverwrite(newState.member, { "VIEW_CHANNEL": true });

            if (this.config.emitLog) textChannel.send(`${newState.member} has joined the voice channel.`);
        }
    }

}

export async function voiceChannelHelper(client: Client, config: VoiceChannelHelperConfig): Promise<VoiceChannelHelper> {
    return new VoiceChannelHelper(client, await sqlite.open(__dirname + '/../../db/channels.db'), config);
}

export interface VoiceChannelHelperConfig {
    emitLog: string;
    purgeInterval: number;
}