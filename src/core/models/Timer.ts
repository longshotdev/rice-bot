import ITimerOptions from "./ITimerOptions";

/**
 * This is similar to Klasa's Monitor.
 * It runs on every message and is useful for perm checking or xp adding etc.
 */

class Timer implements ITimerOptions {
  enabled: boolean;
  name: string;
  time: number;
  repeat: boolean;

  constructor(shit: ITimerOptions) {
    this.enabled = shit.enabled;
    this.name = shit.name;
    this.time = shit.time;
    this.repeat = shit.repeat;
  }
  run(): void {}
}

export default Timer;
