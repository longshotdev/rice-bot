import { VoiceChannel, TextChannel, VoiceConnection } from "discord.js";

export default interface MusicConstruct {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  songs: Array<null>;
  volume: number;
  playing: boolean;
}
