import ava from "ava";
import mongoose from "mongoose";
require("dotenv").config();

ava.before("connect to mongodb", async (test) => {
  mongoose
    .connect("mongodb://travis:test@127.0.0.1:27017/testdb", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .catch((error) => {
      test.fail(error);
    });
});

ava("sample test", (test): void => {
  test.pass();
});
ava("it should insert doc into collection", (test) => {
  test.pass();
});
