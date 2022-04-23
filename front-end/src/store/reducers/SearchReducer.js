import { KEYWORD_SAVE } from "../actions/SearchAction";

const initialState = "";

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case KEYWORD_SAVE:
      let newState = action.keyword;
      return newState;
    default:
      return state;
  }
}
