import { ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions';
import { RECEIVE_USERS, SIGN_UP_USER } from '../actions/users';

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case ADD_QUESTION:
			const { question } = action;
			return {
				...state,
				[question.author]: {
					...state[question.author],
					questions: state[question.author].questions.concat(question.id),
				},
			};
		case SAVE_QUESTION_ANSWER:
			const { authedUser, qid, answer } = action;
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: { ...state[authedUser].answers, [qid]: answer },
				},
			};
		case SIGN_UP_USER:
			const { id, name, avatarURL } = action;
			const newUser = {
				id: id,
				name: name,
				avatarURL: avatarURL,
				questions: [],
				answers: {},
			};
			return {
				...state,
				[id]: newUser,
			};
		default:
			return state;
	}
}
