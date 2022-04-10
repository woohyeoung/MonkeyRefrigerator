import { combineReducers } from 'redux';
import { board } from './BoardReducer';

const rootReducer = combineReducers({ board });

export default rootReducer;
