# backend

# Setup

Edit `env.example` and rename `.env`.

```
$ sls offline start
```

# Example

```
# Get all items
curl -X GET "http://localhost:3000/todo?userID=208debc9-27ac-4579-8715-96a3092c81dc"
# Get a item
curl -X GET "http://localhost:3000/todo/1de2b208-b3f4-4ea4-9a85-fd3f7164a6da?userID=208debc9-27ac-4579-8715-96a3092c81dc"
# Create item
curl -X POST "http://localhost:3000/todo" -d "{\"userID\":\"208debc9-27ac-4579-8715-96a3092c81dc\",\"content\":\"the sun set in the west\"}"
# Update item
curl -X PUT "http://localhost:3000/todo/1de2b208-b3f4-4ea4-9a85-fd3f7164a6da" -d "{\"userID\":\"208debc9-27ac-4579-8715-96a3092c81dc\",\"content\":\"I love a egg.\"}"
# Delete item
curl -X DELETE "http://localhost:3000/todo/1de2b208-b3f4-4ea4-9a85-fd3f7164a6da" -d "{\"userID\":\"208debc9-27ac-4579-8715-96a3092c81dc\"}"
```
