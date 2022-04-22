import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";
import userReducer from "./UserReducer";
import tokenReducer from "./TokenReducer";
import cartReducer from "./CartReducer";

const rootReducer = combineReducers({
  tokenReducer,
  boardReducer,
  userReducer,
  cartReducer,
});

export default rootReducer;
