import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const getToken = async (data) => {
  const resultLogin = await axios
    .post(`${baseUrl}login`, data)
    .then((promiseData) => promiseData.data)
    .then((resolve) => resolve.result)
    .catch();
  return resultLogin;
};

export const idDoubleChk = (data) => {
  const resultIdChk = axios
    .post(`${baseUrl}idChk`, data)
    .then(function (response) {
      //console.log(response.data.isSuccess);
      return response.data;
    });
  //console.log(resultIdChk);
  return resultIdChk;
};
