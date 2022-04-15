import { combineReducers } from "redux";
import board from "./reducers/BoardReducer";
import user from "./reducers/UserReducer";

const rootReducer = combineReducers({ board, user });

export default rootReducer;
