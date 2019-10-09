import * as Discord from 'discord.js'

import { Config } from './Types'

export default class Nanami extends Discord.Client {
    constructor(private readonly Config: Config) {
        super();
    }

    public start(): void {
        this.login(this.Config.token);
    }
}
