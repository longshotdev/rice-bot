import Store from "../models/Store";
import Event from "../models/Event";

class EventStore extends Store<String, Event> {
  public enableEvent(name: string) {
    let event = super.getStore.find((event) => event.name === name);
    if (!event)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    event.enabled = true;
  }
  public disableEvent(name: string) {
    let event = super.getStore.find((event) => event.name === name);
    if (!event)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    event.enabled = false;
  }
  public toggleEvent(name: string) {
    let event = super.getStore.find((event) => event.name === name);
    if (!event)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    event.enabled = !event.enabled;
  }
}

export default EventStore;
