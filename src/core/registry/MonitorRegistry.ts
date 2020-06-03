import Rice from "../../Rice";
import MonitorStore from "../stores/MonitorStore";
import Monitor from "../models/Monitor";
import Monitors from "../../monitors";
import Registry from "./Registry";
class MonitorRegistry extends Registry<Monitor> {
  constructor(client: Rice) {
    super(new MonitorStore(client));
    this.init();
  }
  private init(): void {
    this.registerAll(null, new Monitors.CM());
  }
  get getMonitorStore() {
    let st = super.getStore();
    return st;
  }
}

export default MonitorRegistry;
