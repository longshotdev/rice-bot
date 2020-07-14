import { Message } from "discord.js";

export class Command {
  public name: string;
  public nsfw: boolean;
  public cooldown: number;
  public requiredPermissions: number;
  public category: string = "General";

  public constructor(options: CommandOptions = {}) {
    this.name = options.name as string;
    this.nsfw = options.nsfw as boolean;
    this.cooldown = options.cooldown as number;
    this.requiredPermissions = options.requiredPermissions as number;
  }
}
export interface CommandOptions {
  cooldown?: number;
  nsfw?: boolean;
  name?: string;
  requiredPermissions?: number;
}
export interface Command {
  run?(message: Message, params: any[]): Promise<Message>;
}
