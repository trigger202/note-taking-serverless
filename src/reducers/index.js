
import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import notesReducer from './notesReducer';





const rootReducers = combineReducers({ auth: AuthReducer, notes: notesReducer });

export default rootReducers;