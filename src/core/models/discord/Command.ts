import { Message } from "discord.js";
import Fragment from "../Fragment";

export class Command extends Fragment {
    public name: string;
    public nsfw: boolean;
    public cooldown: number;
    public requiredPermissions: number;
    public category: string = "General";

    public constructor(options: CommandOptions = {}) {
        super(__dirname, [...__filename], {
            name: options.name,
            enabled: true,
        });
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
