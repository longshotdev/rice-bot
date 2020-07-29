import { Event } from "../core/models/discord/Event";
import { EventStore } from "../core/stores";
import { Message } from "discord.js";
import Rice from "../core/Rice";
import { getSettings } from "../core/controllers/GuildSetting.controller";
import { RiceMessage } from "../core/models";
export default class MessageEvent extends Event implements Event {
    constructor(store: EventStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "message",
        });
    }
    public async run(message: Message): Promise<void> {
        const settings = await getSettings(message.guild!.id);
        let castedMsg = <RiceMessage>message;
        castedMsg.settings = settings;
        Rice.getInstance().monitorStore.runMonitors(castedMsg);
    }
}
