import { Collection } from "discord.js";

/**
 * @class Simple Key Value Store that RB uses.
 * @extends Discord.Collection
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
