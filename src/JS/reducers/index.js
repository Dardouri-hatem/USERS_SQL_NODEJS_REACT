import { combineReducers } from 'redux';
import error from './errorReducer';
import users from './usersReducer';
export default combineReducers({
    users,
    error,
})
