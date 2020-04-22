import Monitor from "../core/Monitor";
import { Message } from "discord.js";
import CommandStore from "../core/CommandStore";
import Rice from "../Rice";
import GSController from "../core/api/GuildSettings.controller";
/*
 * File: CommandMonitor.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 3:48:17 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 3:48:17 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
class CommandMonitor extends Monitor {
  constructor() {
    super({
      enabled: true,
      ignoreBots: true,
      ignoreOthers: false,
      ignoreSelf: true,
      name: "Message Monitor",
    });
  }
  async run(msg: Message, client: Rice): Promise<void> {
    /**
     * What i want to do here is get the message,
     * check the message
     * get the arguments
     * find the command
     * execute that command
     */
    const GS = await GSController.ensureGuild(msg.guild);
    let prefix = false;
    // i dont know how resource intensive this shit is but ye better than regex 🙃
    for (const thisPrefix of GS.config.prefix) {
      if (msg.content.startsWith(<string>thisPrefix)) prefix = true;
    }
    if (!prefix) return;

    const command = msg.content.slice("+".length).trim().split(/ +/g);
    const args = msg.content.slice("+".length).trim().split(/ +/g).reverse();
    args.pop();
    args.reverse();
    // HACK: Change this shit asap
    const cmd =
      CommandStore.store.get(command[0].toLowerCase()) ||
      CommandStore.storeAlias.get(command[0].toLowerCase());
    if (!cmd) return;
    /**
     * CHECKS FOR THE OPTIONS
     */
    if (!cmd.enable) {
      msg.react("❌");
      return;
    }
    if (!cmd.runIn.includes(msg.channel.type)) return;
    cmd.run(msg, args, client);
    return;
  }
}
export default CommandMonitor;
