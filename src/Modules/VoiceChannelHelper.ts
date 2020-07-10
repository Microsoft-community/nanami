import { Client, PermissionOverwrites, VoiceChannel, TextChannel, VoiceState } from 'discord.js';

import * as DB from '../DB';

import { Module } from '../Structures/Classes';

export class VoiceChannelHelper extends Module {
    config: VoiceChannelHelperConfig;

    constructor(client: Client, config: VoiceChannelHelperConfig) {
        super(client, "Voice Channel Helper");
        
        this.config = config;

        this.handlers.push({ event: 'voiceStateUpdate', handler: { func: this.handleVoiceStateUpdate.bind(this) }});
        this.handlers.push({ event: 'ready', handler: { func: this.handleReady.bind(this), once: true }});
    }

    private async purgeAll() {
        const result = await DB.query('SELECT text_id FROM channels WHERE set_to_purge = 1');

        for (const channel of result.rows) {
            await this.purge(this.client.channels.cache.get(channel.text_id) as TextChannel);
        }
    }  
    
    private async purge(channel: TextChannel) {
        while (true) { 
            const messages = await channel.messages.fetch({ limit: 100 });

            if (messages.size > 0) {
                await channel.bulkDelete(messages);
            } else {
                await DB.query('UPDATE channels SET set_to_purge = 0 WHERE text_id = $1', [channel.id]);
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

        const channels = (await DB.query('SELECT voice_id, text_id FROM channels')).rows;

        if (oldState.channelID && channels.find((v: DB.Channels) => v.voice_id == oldState.channelID)) {
            const voiceChannel = this.client.channels.cache.get(oldState.channelID) as VoiceChannel;
            const textChannel = this.client.channels.cache.get(channels.find((v: DB.Channels) => v.voice_id == oldState.channelID).text_id) as TextChannel;
            const permissions = textChannel.permissionOverwrites.find((v: PermissionOverwrites) => v.id === oldState.member!.id);

            if (voiceChannel.members.size < 1) {
                await DB.query('UPDATE channels SET set_to_purge = 1 WHERE voice_id = $1', [oldState.channelID]);
            }

            if (permissions) permissions.delete();
            if (this.config.emitLog) textChannel.send(`${oldState.member} has left the voice channel.`); 
        }

        if (channels.find((v: DB.Channels) => v.voice_id == newState.channelID)) {
            const textChannel = this.client.channels.cache.get(channels.find((v: DB.Channels) => v.voice_id === newState.channelID).text_id) as TextChannel;

            await DB.query('UPDATE channels SET set_to_purge = 0 WHERE voice_id = $1', [newState.channelID!]);

            textChannel.updateOverwrite(newState.member, { "VIEW_CHANNEL": true });

            if (this.config.emitLog) textChannel.send(`${newState.member} has joined the voice channel.`);
        }
    }

}


export interface VoiceChannelHelperConfig {
    emitLog: string;
    purgeInterval: number;
}