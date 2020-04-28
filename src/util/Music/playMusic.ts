/*
 * File: playMusic.ts
 * Project: ricebot
 * File Created: Sunday, 26th April 2020 4:43:29 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Sunday, 26th April 2020 4:43:30 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import { Message } from "discord.js";
import Rice from "../../Rice";
import GSController from "../../core/api/GuildSettings.controller";

//import ytdlDiscord from "ytdl-core-discord";
//import ytdl from "ytdl-core";

export default async function playMusic(_client: Rice, msg: Message) {
  //const URLREGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  /**
   * Copied from `Command Monitor`
   *
   */
  const GS = await GSController.ensureGuild(msg.guild);
  let prefix: string | undefined;
  // i dont know how resource intensive this shit is but ye better than regex 🙃
  for (const thisPrefix of <string[]>GS.config.prefix) {
    if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  if (!prefix) return;
  const stringSearch = msg.content.slice(prefix.length).trim().split(/ +/g);
  stringSearch.splice(0, 1);
  const query = stringSearch.join(" ");
}
