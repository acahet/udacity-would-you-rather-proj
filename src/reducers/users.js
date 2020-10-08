import { RECEIVE_USERS, RECEIVE_USER_ANSWER } from '../actions/users';

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		default:
			return state;
	}
}
