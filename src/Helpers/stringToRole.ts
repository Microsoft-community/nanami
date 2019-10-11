import { Message, Role, Guild, Channel } from "discord.js";

export function messageStringToRole(message: Message, role: string): Role {
    return message.guild.roles.find((prop) => prop.name.toLowerCase() == role.toLowerCase()) || message.guild.roles.find((prop) => prop.id == role);
}

export function guildStringToRole(guild: Guild, role: string): Role {
    return guild.roles.find((prop) => prop.name === role) || guild.roles.get(role);
}