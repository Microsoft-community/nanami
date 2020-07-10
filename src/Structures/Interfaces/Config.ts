import { VoiceChannelHelperConfig } from "../../Modules/";

export interface Config {
    token: string;
    prefix: string;
    VoiceChannelHelper: VoiceChannelHelperConfig;
    PostgreSQL: {
        user: string;
        host: string;
        database: string;
        password: string;
        port: number;
    }
}