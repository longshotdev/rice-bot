import test from "ava";
import Store from "../../src/core/models/Store";

test("create store", (t) => {
  t.true(new Store<string, number>() instanceof Store);
});

test("insert into store", (t) => {
  const store = new Store<string, number>();
  store.set("abc", 2);
  store.set("bc", 4);
  t.deepEqual(store.get("abc"), 2);
  store.set("abc", 3);
  t.notDeepEqual(store.get("abc"), 2);
});
