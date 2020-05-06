import EventStore from "../stores/EventStore";
import Event from "../models/Event";
import Events from "../../events";
import Rice from "../../Rice";
class EventRegistry {
  private eventStore: EventStore = new EventStore();
  private client: Rice;
  constructor(client: Rice) {
    this.client = client;
    this.init();
  }
  private init(): void {
    this.registerAll(new Events.message(), new Events.ready());
  }
  public registerAll(...events: Event[]) {
    events.forEach((event) => {
      this.eventStore.set(event.name, event);
      this.client.addListener(event.name, (...args) =>
        event.run(this.client, args)
      );
    });
  }
  get getEventStore(): EventStore {
    return this.eventStore;
  }
}

export default EventRegistry;
