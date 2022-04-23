import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";
import userReducer from "./UserReducer";
import tokenReducer from "./TokenReducer";
import cartReducer from "./CartReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  tokenReducer,
  boardReducer,
  userReducer,
  cartReducer,
  searchReducer,
});

export default rootReducer;
