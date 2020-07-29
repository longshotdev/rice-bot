import { Message, PermissionResolvable } from "discord.js";
import { IGuildSettings } from "../IGuildSettings";

export class RiceMessage extends Message {
    public settings: IGuildSettings = {} as IGuildSettings;
    public permissionLevel: PermissionResolvable[] = [];
}
