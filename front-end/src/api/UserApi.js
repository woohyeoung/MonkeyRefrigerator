import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const findUser = async (data) => {
  const resultLogin = await axios
    .post(`${baseUrl}login`, data)
    .then((promiseData) => promiseData.data)
    .then((resolve) => resolve.result)
    .catch();
  return resultLogin;
};
