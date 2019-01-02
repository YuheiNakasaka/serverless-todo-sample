import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler, APIGatewayEvent } from "aws-lambda";

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

export const getItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return response(400, { message: "invalid parameter" });
  }

  const dynamodbParams = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    Key: {
      id: event.pathParameters.id
    }
  };

  const resp = await new Promise((resolve, reject) => {
    dynamodb.get(dynamodbParams, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).catch(e => {
    return response(500, { message: `${e}` });
  });

  return response(200, resp);
};

export const createItem: APIGatewayProxyHandler = async (event, context) => {
  var item = {
    id: "1",
    content: "this is a pen"
  };

  var params = {
    TableName: `${process.env["DYNAMODB_TABLE"]}`,
    Item: item
  };

  await new Promise(resolve => {
    dynamodb.put(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
      resolve();
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success!",
      input: event
    })
  };
};
