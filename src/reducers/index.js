import { loadingBarReducer } from 'react-redux-loading';
import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions'

const allReducers = combineReducers({
	authedUser,
	users,
	questions,
	loading: loadingBarReducer,
});

export default allReducers;
