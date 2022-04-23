import axios from "axios";
import { baseUrl } from "./BaseUrl";

//장바구니 추가, 삭제
export const functionName1 = async (data, token) => {
  const result = await axios
    .post(`${baseUrl}/`, {
      body: { id: data },
      headers: { accessToken: token },
    })
    .then((res) => res.data)
    .catch();
  return result;
};
//유저 장바구니 조회
export const functionName2 = async (token) => {
  const result = await axios
    .get(`${baseUrl}/cart`, { headers: { accessToken: token } })
    .then((res) => res.data)
    .catch();
  return result;
};
