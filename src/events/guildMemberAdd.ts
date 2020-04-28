/*
 * File: GuildJoinMonitor.ts
 * Project: ricebot
 * File Created: Saturday, 18th April 2020 7:35:12 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2020 7:35:12 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import Rice from "../Rice";
import GSController from "../core/api/GuildSettings.controller";
import Event from "../core/Event";
import { GuildMember } from "discord.js";

module.exports = class GuildMemberAdd extends Event {
  constructor() {
    super("guildMemberAdd", true);
  }
  public async run(
    _client: Rice,
    [guildMember, ..._args]: GuildMember[]
  ): Promise<void> {
    const guild = await GSController.ensureGuild(guildMember.guild);
    if (guild.config.EventJoin === false) return;
    const RoleToPlace = guild.config.joinRole;
    if (!RoleToPlace) return;
    const foundRole = await guildMember.guild.roles.fetch(RoleToPlace);
    if (!foundRole) return;
    guildMember.roles.add(foundRole, "Joined Guild.");
  }
};
