import { Message } from "discord.js";

import { Command } from "../Structures/Interfaces";

export function getCommandName({ content }: Message, prefix: string, commandNames: string[]): Command {
    return { name: commandNames.find((command: string) => content.startsWith(prefix + command)) || '', arguments: [] };
}