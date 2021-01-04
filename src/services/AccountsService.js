import axios, {
  getWithToken
} from "utils/Request";

export const signup = async (username, email, password) => {
  return axios.post("/api/account/signup", {
    username,
    email,
    password,
  })
  .then(response => response.data);
}

export default {
  signup,
};