import Rice from "../Rice";

/*
 * File: Event.ts
 * Project: ricebot
 * File Created: Thursday, 23rd April 2020 4:45:19 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 23rd April 2020 4:45:19 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
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
