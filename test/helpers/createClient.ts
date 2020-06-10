import Rice from "../../src/Rice";

export default function createClient(token): Rice {
  const client = Rice.getInstance(); // this creates it lmfao.
  client.login(process.env.DISCORD_TOKEN);
  return client;
}
