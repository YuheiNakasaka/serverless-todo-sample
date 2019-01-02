import { Auth, API } from "aws-amplify";

const API_NAME = "sls-todo-backend";

export async function getItems() {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return API.get(API_NAME, "/dev/todo", {
    headers: {
      Authorization: token
    },
    response: true,
    queryStringParameters: {
      userID: user.signInUserSession.idToken.payload["cognito:username"]
    }
  });
}

export async function addItem(content) {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return API.post(API_NAME, "/dev/todo", {
    headers: {
      Authorization: token
    },
    body: {
      userID: user.signInUserSession.idToken.payload["cognito:username"],
      content: content
    }
  });
}

export async function updateItem(id, content) {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return API.put(API_NAME, `/dev/todo/${id}`, {
    headers: {
      Authorization: token
    },
    body: {
      userID: user.signInUserSession.idToken.payload["cognito:username"],
      content: content
    }
  });
}

export async function deleteItem(item) {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return API.del(API_NAME, `/dev/todo/${item.id}`, {
    headers: {
      Authorization: token
    },
    body: {
      userID: user.signInUserSession.idToken.payload["cognito:username"]
    }
  });
}
