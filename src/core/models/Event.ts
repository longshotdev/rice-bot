import Rice from "../../Rice";

class Event {
  public name: string;
  public enabled: boolean;

  constructor(name: string, enabled: boolean = false) {
    this.name = name;
    this.enabled = enabled;
  }

  public run(_client: Rice, [..._args]: any): void {}
}

export default Event;
