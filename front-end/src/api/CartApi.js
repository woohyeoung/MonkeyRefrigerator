import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const getUserCartInfo = async (token) => {
  const result = await axios
    .get(`${baseUrl}cart/get`, {
      headers: {
        accessToken: token,
      },
    })
    .then((res) => res.data)
    .catch();
  return result;
};
export const addUserCartInfo = async (data) => {
  const result = await axios
    .post(
      `${baseUrl}cart/add`,
      {
        body: {
          board: data.board,
        },
      },
      {
        headers: {
          accessToken: data.token,
        },
      }
    )
    .then((res) => res.data)
    .catch();
  return result;
};
export const delUserCartInfo = async (data) => {
  const result = await axios
    .post(
      `${baseUrl}cart/del`,
      {
        body: {
          board: data.board,
        },
      },
      {
        headers: {
          accessToken: data.token,
        },
      }
    )
    .then((res) => res.data)
    .catch();
  return result;
};
