import unknownTest, { TestInterface } from "ava";
import Rice from "../src/Rice";
import createClient from "./helpers/createClient";

const ava = unknownTest as TestInterface<{
  client: Rice;
}>;
ava.before(
  async (test): Promise<void> => {
    const client = createClient(); // exported via travis
    test.context = {
      client,
    };
  }
);
ava("choke on my dick", (test): void => {
  test.pass();
});
