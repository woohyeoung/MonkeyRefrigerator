import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";
import userReducer from "./UserReducer";
import tokenReducer from "./TokenReducer";
import searchReducer from "./SearchReducer";

const rootReducer = combineReducers({
  tokenReducer,
  boardReducer,
  userReducer,
  searchReducer,
});

export default rootReducer;
