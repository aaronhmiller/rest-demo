import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const DENO_KV_ACCESS_TOKEN = env["DENO_KV_ACCESS_TOKEN"];
const kv = await Deno.openKv("https://api.deno.com/databases/539e7e1f-0aa3-4bf4-b049-9585642d696e/connect");

const promises = [];
for await (const entry of kv.list({ prefix: [] })) {
  promises.push(kv.delete(entry.key));
}
await Promise.all(promises);
