// import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export const IsLogin = () => !!Cookies.get("accessToken");

// export const IsLogin = () => {
//   const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
//   return tokenReducer;
// };
