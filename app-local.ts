import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const DENO_KV_ACCESS_TOKEN = env["DENO_KV_ACCESS_TOKEN"];
const kv = await Deno.openKv("https://api.deno.com/databases/539e7e1f-0aa3-4bf4-b049-9585642d696e/connect");
const app = new Application();
const router = new Router();

// Create
router.post("/items", async (ctx) => {
  const { id, data } = await ctx.request.body().value;
  await kv.set(["items", id], data);
  ctx.response.body = { id, data };
});

// Read
router.get("/items/:id", async (ctx) => {
  const id = ctx.params.id;
  const data = await kv.get(["items", id]);
  if (data.value) {
    ctx.response.body = { id, data: data.value };
  } else {
    ctx.response.status = 404;
  }
});

// Update
router.put("/items/:id", async (ctx) => {
  const id = ctx.params.id;
  const { data } = await ctx.request.body().value;
  await kv.set(["items", id], data);
  ctx.response.body = { id, data };
});

// Delete
router.delete("/items/:id", async (ctx) => {
  const id = ctx.params.id;
  await kv.delete(["items", id]);
  ctx.response.status = 204;
});

// List all
router.get("/items", listItems);
router.get("/", listItems);

// List all items function
async function listItems(ctx: RouterContext<"/items" | "/">) {
  const items = [];
  for await (const entry of kv.list({ prefix: ["items"] })) {
    items.push({ id: entry.key[1], data: entry.value });
  }
  ctx.response.body = items;
}

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Starting server...");
await app.listen({ port: 8000 });
console.log("Server is running on http://localhost:8000");
