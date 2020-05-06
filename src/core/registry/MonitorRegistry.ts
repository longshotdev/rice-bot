import Rice from "../../Rice";
import MonitorStore from "../stores/MonitorStore";
import Monitor from "../models/Monitor";
import Monitors from "../../monitors";
class MonitorRegistry {
  private monitorStore: MonitorStore;
  constructor(client: Rice) {
    this.monitorStore = new MonitorStore(client);
    this.init();
  }
  private init(): void {
    this.registerAll(new Monitors.CM());
  }
  public registerAll(...monitors: Monitor[]) {
    monitors.forEach((monitor) => {
      this.monitorStore.set(monitor.name, monitor);
    });
  }
  get getMonitorStore(): MonitorStore {
    return this.monitorStore;
  }
}

export default MonitorRegistry;
