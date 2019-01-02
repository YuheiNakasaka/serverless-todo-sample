# DB

DynamoDB Local

# Setup

- Install & Start

```
$ sh setup.sh
```

- Migrate schema

```
$ aws dynamodb create-table --cli-input-json file://todo.json --endpoint-url http://localhost:8000
```
