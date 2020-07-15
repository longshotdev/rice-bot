import test from "ava";
import { Store } from "../../src/core/models/Store";
import Fragment from "../../src/core/models/Fragment";

class OKAY extends Fragment {}
test("create store", (t) => {
  t.true(new Store<OKAY>("Stings", OKAY) instanceof Store);
});

test("insert into store", (t) => {
  const store = new Store<OKAY>("newStore", OKAY);
  store.add(new OKAY("", [""]));
  t.deepEqual(store.size, 1, "Check if Store has Value.");
  // t.deepEqual(store.("abc"), 2);
  // store.set("abc", 3);
  // t.notDeepEqual(store.get("abc"), 2);
});
