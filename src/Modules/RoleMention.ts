import { Client, Message, Role } from "discord.js";

import { Module } from '../Structures/Classes';
import { Command } from "../Structures/Interfaces";
import { getCommandName } from "../Helpers/getCommandName";
import { messageStringToRole } from "../Helpers";

export class RoleMention extends Module {
    config: RoleMentionConfig;
    commandNames: string[];

    constructor(client: Client, config: RoleMentionConfig) {
        super(client, "Role Mention");

        this.config = config;
        this.commandNames = ["mention"];

        this.handlers.push({ event: 'message', handler: { func: this.handleMessage.bind(this) }});
    }

    async handleMessage(message: Message) {
        if (message.author.bot) return;
        if (message.member.roles) {
            if (!this.config.roleWhitelist.some(role => message.member.roles.has(role))) return;
        } else return;
        const command: Command = getCommandName(message, this.config.prefix, this.commandNames);
        if (command.name.length < 1) return;
        
        const roles: Role[] = [];

        const str = message.content.slice(this.config.prefix.length + command.name.length).replace(/{([^}]+)}/g, (match): string => {
            const role = messageStringToRole(message, cleanMatch(match));
            if (role) {
                roles.push(role);
                role.setMentionable(true).catch(this.logger.critical);
                return role.toString();
            } else {
                return 'Invalid Role';
            }
        });

        await message.delete();

        message.channel.send(str);

        roles.forEach((role) => {
            role.setMentionable(false).catch(this.logger.critical);
        });
    }
}

function cleanMatch(match: string) {
    return match.replace(/[{}]/g, "");
}

export interface RoleMentionConfig {
    prefix: string;
    roleWhitelist: string[];
}