import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthedUser } from './authedUser';
const AUTH_USER = "sarahedo"
export function handleInitialData() {
	return (dispatch) => {
        dispatch(showLoading());
		return getInitialData().then(({ users, questions }) => {
			dispatch(receiveUsers(users));
			dispatch(receiveQuestions(questions));
			dispatch(setAuthedUser(AUTH_USER))
			dispatch(hideLoading());
		});
	};
}
