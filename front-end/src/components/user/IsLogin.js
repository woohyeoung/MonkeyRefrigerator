import Cookies from "js-cookie";

export const IsLogin = () => !!Cookies.get("accessToken");
