import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler, APIGatewayEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

let region = process.env["AWS_REGION"];
let DYNAMODB_ENDPOINT = `https://dynamodb.${region}.amazonaws.com`;
if (process.env["IS_LOCAL"] || process.env["IS_OFFLINE"]) {
  region = "localhost";
  DYNAMODB_ENDPOINT = "http://localhost:8000";
}

const dynamodb = new DynamoDB.DocumentClient({
  region: region,
  endpoint: DYNAMODB_ENDPOINT
});

function response(code: number, body: { [key: string]: any }) {
  return {
    statusCode: code,
    body: JSON.stringify(body)
  };
}

export const getItems: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
) => {
  if (!event.queryStringParameters || !event.queryStringParameters.email) {
    return response(400, { message: "invalid parameter" });
  }

  const params = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    KeyConditionExpression: "#hash = :str",
    ExpressionAttributeNames: {
      "#hash": "email"
    },
    ExpressionAttributeValues: {
      ":str": event.queryStringParameters.email
    }
  };

  const resp = await new Promise((resolve, reject) => {
    dynamodb.query(params, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).catch(e => {
    return response(500, { message: `${e}` });
  });

  return response(200, resp);
};

export const getItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
) => {
  if (!event.queryStringParameters || !event.queryStringParameters.email) {
    return response(400, { message: "invalid parameter" });
  }

  if (!event.pathParameters || !event.pathParameters.id) {
    return response(400, { message: "invalid parameter" });
  }

  const params = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    Key: {
      email: event.queryStringParameters.email,
      id: event.pathParameters.id
    }
  };

  const resp = await new Promise((resolve, reject) => {
    dynamodb.get(params, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).catch(e => {
    return response(500, { message: `${e}` });
  });

  return response(200, resp);
};

export const createItem: APIGatewayProxyHandler = async (event, context) => {
  const eventBody: any = event.body;
  const requestBody = JSON.parse(eventBody);
  if (!requestBody || !requestBody.email || !requestBody.content) {
    return response(400, { message: "invalid parameter" });
  }

  const item = {
    id: uuid(),
    email: requestBody.email,
    content: requestBody.content
  };

  const params = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    Item: item
  };

  const resp = await new Promise((resolve, reject) => {
    dynamodb.put(params, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).catch(e => {
    return response(500, { message: `${e}` });
  });

  return response(200, resp);
};

export const updateItem: APIGatewayProxyHandler = async (event, context) => {
  const eventBody: any = event.body;
  const requestBody = JSON.parse(eventBody);
  if (!requestBody || !requestBody.email || !requestBody.content) {
    return response(400, { message: "invalid parameter" });
  }

  if (!event.pathParameters || !event.pathParameters.id) {
    return response(400, { message: "invalid parameter" });
  }

  const params = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    Key: {
      email: requestBody.email,
      id: event.pathParameters.id
    },
    UpdateExpression: "set content = :val",
    ExpressionAttributeValues: {
      ":val": requestBody.content
    },
    ReturnValues: "UPDATED_NEW"
  };

  const resp = await new Promise((resolve, reject) => {
    dynamodb.update(params, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).catch(e => {
    return response(500, { message: `${e}` });
  });

  return response(200, resp);
};

export const deleteItem: APIGatewayProxyHandler = async (event, context) => {
  const eventBody: any = event.body;
  const requestBody = JSON.parse(eventBody);
  if (!requestBody || !requestBody.email) {
    return response(400, { message: "invalid parameter" });
  }

  if (!event.pathParameters || !event.pathParameters.id) {
    return response(400, { message: "invalid parameter" });
  }

  const params = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    Key: {
      email: requestBody.email,
      id: event.pathParameters.id
    }
  };

  const resp = await new Promise((resolve, reject) => {
    dynamodb.delete(params, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).catch(e => {
    return response(500, { message: `${e}` });
  });

  return response(200, resp);
};
