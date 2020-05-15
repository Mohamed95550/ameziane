import { combineReducers } from 'redux';
import authReducers from './authReducer';
import tasksReducers from './tasksReducer';
import accountsReducers from './accountsReducer';
import proxiesReducers from './proxiesReducer';

export default combineReducers({
    auth: authReducers,
    tasks : tasksReducers,
    accounts : accountsReducers,
    proxies : proxiesReducers
});