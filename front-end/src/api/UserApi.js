import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const findUser = (data) => {
  const resultLogin = axios
    .post(`${baseUrl}login`, data)
    .then((result) => result.data)
    .then((resolve) => resolve)
    .catch();
  return resultLogin;
};
