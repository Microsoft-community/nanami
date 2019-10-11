import { VoiceChannelHelperConfig } from "../../Modules/";
import { RoleMentionConfig } from "../../Modules/";

export interface Config {
    token: string;
    VoiceChannelHelper: VoiceChannelHelperConfig;
    RoleMention: RoleMentionConfig;
}