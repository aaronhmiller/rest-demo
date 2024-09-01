# rest-demo
Cursor sourced Deno CRUD app
example running here: https://aaronmiller-rest-demo-81.deno.dev<br>
to run locally, use:<br>
`deno run --unstable-kv --env -A app-local.ts`

POST<br>
`http POST :8000/items data:='{"name": "Example Item", "description": "This is a test item"}'`

GET (all)<br>
`http :8000/items`

GET<br>
`http :8000/items/1`

PUT<br>`http PUT :8000/items/123 data:='{"name": "Updated Item", "description": "This item has been updated"}'`

DELETE<br>
`http DELETE :8000/items/1`

there are also: `:8000/clear-all` and `:8000/download` utility endpoints
