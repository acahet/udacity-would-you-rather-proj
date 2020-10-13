import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

const allReducers = combineReducers({
	authedUser,
	users,
	questions,
});

export default allReducers;
