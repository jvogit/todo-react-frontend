import axios from "axios";
import { ACCESS_TOKEN } from "utils/constants";

export async function postWithToken(url, data) {
  let config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    }
  };

  return axios.post(url, data, config);
}

export async function getWithToken(url, params) {
  let config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    },
    params,
  };

  return axios.get(url, config);
}

export default axios;