import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

// Use Deno.openKv()
const kv = await Deno.openKv();

// Function to get the next ID
async function getNextId(): Promise<number> {
  const key = ["counter"];
  const result = await kv.atomic().sum(key, 1n).commit();
  return Number(result.value);
}

const app = new Application();
const router = new Router();

// Create
router.post("/items", async (ctx) => {
  const { data } = await ctx.request.body().value;
  const id = await getNextId();
  await kv.set(["items", id.toString()], data);
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

await app.listen({ port: 8000 });
