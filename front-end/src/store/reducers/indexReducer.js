import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";
import userReducer from "./UserReducer";
import tokenReducer from "./TokenReducer";
import searchReducer from "./SearchReducer";
import cartReducer from "./CartRecuder";

const rootReducer = combineReducers({
  tokenReducer,
  boardReducer,
  userReducer,
  searchReducer,
  cartReducer,
});

export default rootReducer;
