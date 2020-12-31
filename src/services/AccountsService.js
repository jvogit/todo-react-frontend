import axios, {
  getWithToken
} from "utils/Request";

export const signup = async (username, email, password) => {
  return axios.post("/api/accounts/signup", {
    username,
    email,
    password,
  })
  .then(response => response.data);
}

export default {
  signup,
};