import { Auth, API } from "aws-amplify";

const API_NAME = "sls-todo-backend";

export async function getTest() {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return API.get(API_NAME, "/dev/hello", {
    headers: {
      Authorization: token
    }
  });
}
