import Monitor from "../core/models/Monitor";
import { Message } from "discord.js";
import Rice from "../Rice";
import { GSController } from "../api";
import Command from "../core/models/Command";
export default class extends Monitor {
  constructor() {
    super({
      enabled: true,
      name: "command",
      emitsOnlyIn: [],
      emitsOnEvent: ["message"],
    });
  }
  public async run(message: Message, client: Rice): Promise<Message | void> {
    if (!message.guild) return;
    let prefix = "+";
    const guildSettings = await GSController.getGuild(message.guild);
    for (const pfx of guildSettings.config.prefix) {
      if (message.content.startsWith(pfx)) prefix = pfx;
    }
    if (message.mentions.has(client.user!)) {
      return message.reply(`My prefix is \`${prefix}\``);
    }
    if (!message.content.startsWith(prefix)) return; // this is to ensure that if the user did not use +, they wont get fucked dong

    const command = message.content.slice(prefix.length).trim().split(/ +/g);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .match(/(?<=")\w[\w\s]*(?=")|\w+|(?<=")[\w\s]*"/g)
      ?.reverse();
    args?.pop();
    args?.reverse();
    const commandRunnable =
      client.commandRegistry.getCommandStore.get(command[0].toLowerCase()) ||
      client.commandRegistry.getCommandStore.aliasStore.get(
        command[0].toLowerCase()
      );
    if (!commandRunnable) return;

    // serverwide
    // prettier-ignore

    if (guildSettings.config.disabledCategoriesServerWide === "all") return handleNoShit(message);
    // prettier-ignore
    if (guildSettings.config.disabledCategoriesServerWide.includes(<string>commandRunnable.category)) return handleNoShit(message);
    // prettier-ignore
    if (guildSettings.config.disabledCommandsServerWide === "all") return handleNoShit(message); // TODO: MAKE THIS ALLOW SYSTEM ONLY COMMANDS.
    // prettier-ignore
    if (guildSettings.config.disabledCommandsServerWide.includes(<string>commandRunnable.name)) return handleNoShit(message);

    // channel
    // prettier-ignore
    try {
    if (guildSettings.config.disabledCategoriesPerChannel.get(message.channel.id)?.includes(commandRunnable.category)) return handleNoShit(message);
    } catch (e) {
      // THIS IS THE ONLU NIGGER SHIT THAT DOESNT WORK FUCK YOU SUCK MY COCK
    }
    // prettier-ignore
    if (guildSettings.config.disabledCommandsPerChannel.has(<string>commandRunnable.name)) return handleNoShit(message);

    let ags = await parser(commandRunnable, args);
    commandRunnable.run(message, ags).catch((e: Error) => {
      console.log(e);
      message.channel.send(
        `There was an error executing your command. \n \`\`\`${e.message}\`\`\``
      );
    });
  }
}
async function handleNoShit(msg: Message) {
  msg.react("❌");
}
async function parser(command: Command, args: Array<String> | undefined) {
  let ags = {};
  const usage = await parseUsage(command.usage);
  console.log(usage);
  usage.forEach((tag: Tag, index: number) => {
    Object.assign(ags, {
      [tag.tag]: args![index],
    });
  });
  return ags;
}

const open = ["[", "(", "<"];
const close = ["]", ")", ">"];
const space = [" ", "\n"];
const seperator = [":"];
// const OR = ["|"];
async function parseUsage(usageString: string) {
  let metadata: CommandUsageMetadata = {
    tags: [],
    opened: false,
    value: false,
    current: "",
    type: TagType.OPTIONAL,
    allowedKW: new Array<string>(),
    on: 0,
    last: false,
    char: 0,
  };
  // loop thru each character
  for (let i = 0; i < usageString.length; i++) {
    const char = usageString[i];

    if (open.includes(char)) tagOpen(metadata, char);
    // OPEN = TRUE
    else if (close.includes(char)) tagClose(metadata, char);
    // open = FALSE; NOW WE CLOSE AND CREATE THIS INTO A TAG.
    else if (space.includes(char)) tagSpace(metadata, char);
    // wtf does this do?
    else if (seperator.includes(char)) tagSeperate(metadata, char);
    // I DONT KNOW WHAT IT DOES EITHER
    else metadata.current += char; // append this character
    console.log(`CHAR: ${char} | TYPE: ${metadata.type} | ${metadata.current}`);
  }
  return metadata.tags;
}

async function tagOpen(metadata: CommandUsageMetadata, char: string) {
  if (metadata.opened) throw `stupid ass.`;
  metadata.opened = !metadata.opened;
  metadata.type = open.indexOf(char);
}

async function tagClose(metadata: CommandUsageMetadata, _char: string) {
  metadata.opened = !metadata.opened;
  metadata.tags.push(
    new Tag(metadata.current, metadata.on, TagType.REQUIRED, metadata.allowedKW)
  );
  metadata.on++;
  metadata.current = "";
  metadata.allowedKW = [];
}

async function tagSpace(metadata: CommandUsageMetadata, char: string) {
  if (char === "\n") throw `there can't be a line break in the usage string`;
  if (metadata.opened) throw `spaces aren't allowed inside a tag`;
  if (metadata.current) throw `there can't be a literal outside a tag.`;
}

async function tagSeperate(_metadata: CommandUsageMetadata, _char: string) {
  throw new Error("METHOD NOT IMPLEMENTED.");
}
interface CommandUsageMetadata {
  tags: Array<Tag>;
  opened: boolean;
  type: TagType;
  current: string;
  on: number;
  allowedKW: Array<string>;
  value: boolean;
  last: boolean;
  char: number;
}
enum TagType {
  OPTIONAL,
  KEYVALUE,
  REQUIRED,
}
class Tag {
  public tag: string;
  public type: TagType;
  public allowedKW: Array<string>;
  public count: number;

  constructor(
    tag: string,
    count: number,
    type: TagType,
    allowedKW: Array<string>
  ) {
    this.tag = tag;
    this.count = count;
    this.type = type;
    this.allowedKW = allowedKW;
  }
}
