import { Collection } from "discord.js";

/*
 * File: Store.ts
 * Project: ricebot
 * File Created: Wednesday, 22nd April 2020 8:49:34 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Wednesday, 22nd April 2020 8:49:34 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
interface KV {
  key: any;
  value: any;
}
class Store<Key, Value> {
  protected store = new Collection<Key, Value>();

  public set(key: Key, value: Value): Collection<Key, Value> {
    this.store.set(key, value);
    return this.store;
  }
  public delete(key: Key): Collection<Key, Value> {
    this.store.delete(key);
    return this.store;
  }
  public get(key: Key): Value | undefined {
    // TODO: Fix this to where the command Monitor doesnt throw an error if theres no command named it.
    // if (this.store.get(key) === undefined)
    //   throw new Error(`${key} is not found in store.`);
    return this.store.get(key);
  }
  public exist(key: Key): boolean {
    if (this.store.get(key) === undefined) return false;
    return true;
  }
  public getMany(...key: Key[]): KV[] {
    let tempKV: KV[] = [];
    for (var i = 0; i < key.length; i++) {
      tempKV.push({
        key: key[i],
        value: this.store.get(key[i]),
      });
    }
    return tempKV;
  }
  get getStore(): Collection<Key, Value> {
    return this.store;
  }
  get size(): number {
    return this.store.size;
  }
}
export default Store;
