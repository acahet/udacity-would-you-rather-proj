// import { hideLoading, showLoading } from 'react-redux-loading';
import { signUpUser } from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SIGN_UP_USER = 'SIGN_UP_USER';

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users,
	};
}

export function signupUserAction(name, id, avatarURL) {
	return {
		type: SIGN_UP_USER,
		name,
		id,
		avatarURL,
	};
}

export function handleSignUpUser(name, id, avatarURL) {
	return (dispatch) => {
		return signUpUser({
			name: name,
			id: id,
			avatarURL: avatarURL,
		}).then(() => {
			dispatch(signupUserAction(name, id, avatarURL));
		});
	};
}
