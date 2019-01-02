# backend

# Setup

Edit `env.example` and rename `.env`.

# Example

```
# Get all items
curl -X GET "http://localhost:3000/todo?email=test@example.com"
# Get a item
curl -X GET "http://localhost:3000/todo/2c7d84b2-491c-4e14-b0ca-91fa73c4fea7?email=test@example.com"
# Create item
curl -X POST "http://localhost:3000/todo" -d "{\"email\":\"test@example.com\",\"content\":\"the sun set in the west\"}"
# Update item
curl -X PUT "http://localhost:3000/todo/2c7d84b2-491c-4e14-b0ca-91fa73c4fea7" -d "{\"email\":\"test@example.com\",\"content\":\"I love a egg.\"}"
# Delete item
curl -X DELETE "http://localhost:3000/todo/dab9a933-958b-4ae6-89f5-7a077e4217be" -d "{\"email\":\"test@example.com\"}"
```
