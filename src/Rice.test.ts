import Rice from "./Rice";

jest.mock("./Rice");
const token = process.env.DISCORD_TOKEN!;
it("logs in", async () => {
  const User = new Rice();
  expect(User.login(token));
});

it("has commands", async () => {
  const User = new Rice();
  User.login(token);
  User.registerCommands();
  User.on("ready", () => {
    expect(User.CommandStore.size).toBeGreaterThan(0);
  });
});
it("has events", async () => {
  const User = new Rice();
  User.login(token);
  User.registerEvents();
  User.on("ready", () => {
    expect(User.EventStore.size).toBeGreaterThan(0);
  });
});
it("has Monitors", async () => {
  const User = new Rice();
  User.login(token);
  User.registerMonitors();
  User.on("ready", () => {
    expect(User.MonitorStore.size).toBeGreaterThan(0);
  });
});
it("logs into mongo", async () => {
  const User = new Rice();
  User.login(token);
  User.connectToMongo();
});
