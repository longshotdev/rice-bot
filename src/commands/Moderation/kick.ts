import Command from "../../core/models/Command";

export default class extends Command {
  constructor() {
    super({
      name: "true",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(): Promise<void> {
    console.log("RAN KICK CMD");
  }
}
