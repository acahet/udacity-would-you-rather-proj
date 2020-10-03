export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const SELECT_AUTH_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
	return {
		type: SET_AUTHED_USER,
		id,
	};
}
