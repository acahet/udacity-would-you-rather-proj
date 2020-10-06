import { RECEIVE_QUESTIONS, RECEIVE_ANSWER } from '../actions/questions';

export default function pQuestions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			};
		case RECEIVE_ANSWER:
			return {
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid].votes.concat([action.authedUser])
					}
				}
			}
		default:
			return state;
	}
}
