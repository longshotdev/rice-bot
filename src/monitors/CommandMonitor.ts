import Monitor from "../core/models/Monitor";

export default class extends Monitor {
  constructor() {
    super({
      enabled: true,
      name: "Command Monitor",
    });
  }
  public async run() {}
}
