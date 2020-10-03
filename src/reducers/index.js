import { loadingBarReducer } from 'react-redux-loading';
import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';

const allReducers = combineReducers({
	authedUser,
	users,
	loading: loadingBarReducer,
});

export default allReducers;
