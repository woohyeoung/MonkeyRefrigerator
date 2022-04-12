import { combineReducers } from 'redux';
import { board } from './reducers/BoardReducer';

const rootReducer = combineReducers({ board });

export default rootReducer;
