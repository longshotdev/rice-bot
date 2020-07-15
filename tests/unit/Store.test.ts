import test from "ava";
import { Store } from "../../src/core/models/Store";

test("create store", (t) => {
  t.true(new Store<string>() instanceof Store);
});

test("insert into store", (t) => {
  const store = new Store<string>("newStore");
  store.add("abc");
  // t.deepEqual(store.("abc"), 2);
  // store.set("abc", 3);
  // t.notDeepEqual(store.get("abc"), 2);
  t.fail();
});
