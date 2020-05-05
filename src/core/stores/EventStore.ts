import Store from "../models/Store";
import Event from "../models/Event";

class CommandStore extends Store<String, Event> {}

export default CommandStore;
