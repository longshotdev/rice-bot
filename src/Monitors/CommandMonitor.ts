import Monitor from "../core/Monitor";
import { Message } from "discord.js";
import GSController from "../core/api/GuildSettings.controller";
import Command from "../core/Command";
import isEmpty from "../util/isEmpty";
import Rice from "../Rice";
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
  async run(msg: Message, client: Rice): Promise<Message | void> {
    /**
     * What i want to do here is get the message,
     * check the message
     * get the arguments
     * find the command
     * execute that command
     */
    const GS = await GSController.ensureGuild(msg.guild);
    let prefix: string | undefined;
    // i dont know how resource intensive this shit is but ye better than regex 🙃
    for (const thisPrefix of GS.config.prefix) {
      if (msg.content.startsWith(<string>thisPrefix))
        prefix = <string>thisPrefix;
    }

    if (!prefix) return;

    const command = msg.content.slice(prefix.length).trim().split(/ +/g);
    const args = msg.content.slice(prefix.length).trim().split(/ +/g).reverse();
    args.pop();
    args.reverse();
    // HACK: Change this shit asap
    const cmd =
      client.CommandStore.get(command[0].toLowerCase()) ||
      client.CommandStore.storeAlias.get(command[0].toLowerCase());
    if (!cmd) return;
    const bruh = checkArgs(msg, cmd, args);
    console.log(cmd.usage.length);
    if (isEmpty(bruh) && cmd.usage.length >= 1) return;
    /**
     * <> | required argument
     * [] | optional argument
     *
     * Lets use this regex
     * "<set|get|reset|list|remove> [key:string] [value:string]"
     *
     * I want to split the string where theres a space.
     * I want to get the start and end index of each string in the splitted array
     * I want to do a switch statement and parse it
     */

    /**
     * CHECKS FOR THE OPTIONS
     */
    if (!cmd.enable) {
      msg.react("❌");
      return;
    }
    if (!cmd.runIn.includes(msg.channel.type)) return;
    cmd.run(msg, [bruh], client);
    return;
  }
}
/**
 * this whole fucking function is cancerous and i've takened 3 hours and conunting bruh
 * @param cmd
 * @param args
 */
function checkArgs(msg: Message, cmd: Command, args: String[]): Object {
  let RA = {};
  const commandArguments = cmd.usage.split(cmd.usageDelimiter);

  for (var i = 0; i < commandArguments.length; i++) {
    let argument = commandArguments[i];
    let _argumentIndex = i;
    const firstIndex: string = argument[0];
    argument = argument.slice(1, argument.length - 1);
    if (firstIndex == "<") {
      const requiredArgs = argument.split("|");

      let foundArg: string | undefined;
      for (let i = 0; i < requiredArgs.length; i++) {
        if (requiredArgs[i] === args[_argumentIndex]) {
          foundArg = requiredArgs[i];
          break;
        }
      }
      if (!foundArg) {
        msg.channel.send(
          `Expected Argument(s): \`${requiredArgs.map((c) => `${c}`)}\`. Got ${
            args[_argumentIndex] ? args[_argumentIndex] : "nothing"
          }. | \`+${cmd.name} ${cmd.usage}\``
        );
        break;
      }
      RA = { ...RA, required: foundArg };
    }
    if (firstIndex == "[") {
      const optionalArgs = argument.split(":"); // 0 is argument value | 1 is type
      if (args[_argumentIndex]) {
        RA = { ...RA, [optionalArgs[0]]: args[_argumentIndex] };
      }
    }
  }
  return RA;
}
export default CommandMonitor;
/**
 * 
 *   let RA: Object = {};
  const commandArguments = cmd.usage.split(cmd.usageDelimiter);
  commandArguments.forEach(async (argument: string, _argumentIndex: number) => {
    const firstIndex: string = argument[0];
    argument = argument.slice(1, argument.length - 1);
    switch (firstIndex) {
      case "<":
        console.log(`Index: ${_argumentIndex} is required`);
        const requiredArgs = argument.split("|");

        let foundArg: string | undefined;
        for (let i = 0; i < requiredArgs.length; i++) {
          if (requiredArgs[i] === args[_argumentIndex]) {
            foundArg = requiredArgs[i];
            break;
          }
        }
        if (!foundArg)
          throw new Error(
            `Expected Argument(s): \`${requiredArgs.map(
              (c) => `${c}`
            )}\`. Got ${args[_argumentIndex]}.`
          );
        RA = { ...RA, required: foundArg };
        break;
      case "[":
        console.log(`Index ${_argumentIndex} is optional`);
        const optionalArgs = argument.split(":"); // 0 is argument value | 1 is type
        if (args[_argumentIndex]) {
          RA = { ...RA, [optionalArgs[0]]: args[_argumentIndex] };
        }
        break;
      default:
        console.log("ignore it.");
    }
    return Promise.resolve(RA);
  });
 * 
 */
/*
    switch (firstIndex) {
      case "<":
        console.log(`Index: ${_argumentIndex} is required`);
        const requiredArgs = argument.split("|");

        let foundArg: string | undefined;
        for (let i = 0; i < requiredArgs.length; i++) {
          if (requiredArgs[i] === args[_argumentIndex]) {
            foundArg = requiredArgs[i];
            break;
          }
        }
        if (!foundArg)
          Promise.reject(
            `Expected Argument(s): \`${requiredArgs.map(
              (c) => `${c}`
            )}\`. Got ${args[_argumentIndex]}.`
          );
        RA = { ...RA, required: foundArg };
        break;
      case "[":
        console.log(`Index ${_argumentIndex} is optional`);
        const optionalArgs = argument.split(":"); // 0 is argument value | 1 is type
        if (args[_argumentIndex]) {
          RA = { ...RA, [optionalArgs[0]]: args[_argumentIndex] };
        }
        break;
      default:
        console.log("ignore it.");
    }


*/
