import {
  HEADER_TOKEN,
  HEADER_TOKEN_GET,
  HEADER_TOKEN_OUT,
} from "../actions/UserAction";

const initialState = {
  loading: true,
  token: null,
};
export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case HEADER_TOKEN:
      return {
        ...state,
        loading: false,
        token: null,
      };
    case HEADER_TOKEN_GET:
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    case HEADER_TOKEN_OUT:
      return {
        ...state,
        loading: false,
        token: null,
      };
    default:
      return state;
  }
}
