import Command from "../../core/models/Command";
import Rice from "../../Rice";
import { Message, MessageCollector, TextChannel } from "discord.js";
import ytdl from "ytdl-core-discord";
import { isNumber } from "util";
export default class extends Command {
  constructor() {
    super({
      name: "play",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(
    _client: Rice,
    message: Message,
    [...args]
  ): Promise<Message> {
    let query = args.join(" ");
    let url: string = "sa";
    if (ytdl.validateURL(query)) {
      this.handlePlay(
        _client,
        message,
        query,
        (await ytdl.getBasicInfo(query)).title
      );
    } else {
      _client.youtubeSearch
        .searchVideos(query)
        .then(async (results: any) => {
          const brMSG = await message.channel.send(`
          **Select video with numbers 1-5.**\n${results
            .map((result: any, index: number) => {
              return `**${index + 1}**. ${result.title}\n`;
            })
            .join("")}You have ⏱ ***30*** seconds to select one.
          `);
          const msgcollector = new MessageCollector(
            <TextChannel>message.channel,
            (msg: Message) =>
              msg.author.id == message.author.id && !isNumber(msg.content),
            { max: 8 }
          );
          msgcollector.on("collect", (msg: Message) => {
            let pickedNumber = parseInt(msg.content) - 1;
            if (pickedNumber < 0 || pickedNumber > 5)
              return message.channel.send("Invalid Choice.");
            if (pickedNumber === NaN) return;
            msg.delete();
            brMSG.delete();

            this.handlePlay(
              _client,
              message,
              results[pickedNumber].id,
              results[pickedNumber].title
            );
            return msgcollector.stop(JSON.stringify(results[pickedNumber]));
          });
          msgcollector.on("end", (_, reason) => {
            const a = JSON.parse(reason);
            if (a) {
              return message.channel.send(
                `Chosen: **${a.title} - by ${a.channel.title}**.`
              );
            } else {
              return message.channel.send(
                "Didn't choose a song within 30 seconds. Aborting. ❌"
              );
            }
          });
        })
        .catch((e: any) => console.log(e));
    }
    console.log(url);
    return message.channel.send("there was an error executing your command.");
  }
  async handlePlay(
    _client: Rice,
    _message: Message,
    url: string,
    _songName: string
  ) {
    let id = url;
    if (ytdl.validateURL(url)) id = ytdl.getVideoID(url);
  }
}
