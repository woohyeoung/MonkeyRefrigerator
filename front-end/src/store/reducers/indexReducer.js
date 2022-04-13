import { combineReducers } from 'redux';
import boardReducer from './BoardReducer';

const rootReducer = combineReducers({ boardReducer });

export default rootReducer;
