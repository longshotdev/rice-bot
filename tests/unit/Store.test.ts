import test from "ava";
import { Store } from "../../src/core/models/Store";
import Fragment from "../../src/core/models/Fragment";

class OKAY extends Fragment {}
test("create store", (t) => {
    t.pass();
});

test("insert into store", (t) => {
    t.pass();
    // t.deepEqual(store.("abc"), 2);
    // store.set("abc", 3);
    // t.notDeepEqual(store.get("abc"), 2);
});
