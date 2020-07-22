import EventStore from "../stores/EventStore";
import Event from "../models/Event";
import Events from "../../events";
import Rice from "../../Rice";
import Registry from "./Registry";
class EventRegistry extends Registry<Event> {
  private client: Rice;
  constructor(client: Rice) {
    let eventStore = new EventStore();
    super(eventStore);
    this.client = client;
    this.init();
  }
  private init(): void {
    super.registerAll(
      (v: Event) => this.addListener(v), // imagine using sped head ass anonymous functions lmfaoo
      new Events.message(),
      new Events.ready(),
      new Events.MessageReactionAdd()
    );
  }
  private addListener(event: Event) {
    this.client.addListener(event.name, (...args) =>
      event.run(this.client, args)
    );
  }
}

export default EventRegistry;
