# rest-demo
Cursor sourced Deno CRUD app
example running here: https://aaronmiller-rest-demo-81.deno.dev/items

POST:
http POST http://localhost:8000/items id=123 data:='{"name": "Example Item", "description": "This is a test item"}'

GET:
http :8000/items

GET
http :8000/items/123

PUT
http PUT :8000/items/123 data:='{"name": "Updated Item", "description": "This item has been updated"}'

DELETE
http DELETE :8000/items/123
