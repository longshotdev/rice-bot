import { Message } from "discord.js";
import { Fragment } from "../Fragment";
import { CommandStore } from "../../stores";

export class Command extends Fragment {
    public name: string;
    public nsfw: boolean;
    public cooldown: number;
    public description: string = "No Description";
    public requiredPermissions: number;
    public category: string = "General";
    public restricted: boolean;

    public constructor(store: CommandStore, directory: string, files: readonly string[], options: CommandOptions = {}) {
        super(store, directory, files, {
            name: options.name,
            enabled: true,
        });
        this.name = options.name as string;
        this.nsfw = options.nsfw as boolean;
        this.cooldown = options.cooldown as number;
        this.requiredPermissions = options.requiredPermissions as number;
        this.description = (options.description as string) ?? "No description.";
        this.restricted = options.restricted as boolean;
        /**
         * Inject Category.
         * Remove the directory from the files
         *
         */
        this.category = files[0] || "No Category";
    }
}
export interface CommandOptions {
    cooldown?: number;
    nsfw?: boolean;
    name?: string;
    description?: string;
    requiredPermissions?: number;
    restricted?: boolean | true;
}
export interface Command {
    run?(message: Message, params: any[]): Promise<Message>;
}
