import Command from "../../core/models/Command";
import Rice from "../../Rice";
import { Message, MessageEmbed } from "discord.js";
import ExperienceController from "../../api/controller/ExperienceController";

export default class extends Command {
  constructor() {
    super({
      name: "top",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "top",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(client: Rice, message: Message): Promise<Message | void> {
    let guildData = await ExperienceController.getGuildUsers(message.guild!.id);
    let sorted = guildData.users.sort((a, b) => b.level - a.experience);
    const top5 = sorted.splice(0, 5);
    const embed = new MessageEmbed();
    embed.setTitle(`Economy Leaderboard for: ${message.guild!.name}`);
    embed.setAuthor(client.user!.username, client.user!.avatarURL()!);
    embed.setDescription("Top 5 chatty slaves.");
    embed.setColor(0x00ae86);
    for (const user of top5) {
      embed.addField(
        client.users.cache.find((u) => u.id === user.id)!.username,
        `${user.experience} experience (level ${user.level})`
      );
    }
    return message.channel.send(embed);
  }
}
