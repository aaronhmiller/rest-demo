# rest-demo
Cursor sourced Deno CRUD app
example running here: https://aaronmiller-rest-demo-81.deno.dev
to run locally, use:
`deno run --unstable-kv --env -A app-local.ts`

POST:
http POST :8000/items id=123 data:='{"name": "Example Item", "description": "This is a test item"}'

GET:
http :8000/items

GET
http :8000/items/123

PUT
http PUT :8000/items/123 data:='{"name": "Updated Item", "description": "This item has been updated"}'

DELETE
http DELETE :8000/items/123
