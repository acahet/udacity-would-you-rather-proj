import { RECEIVE_QUESTIONS, TOGGLE_VOTE } from '../actions/questions';

export default function pQuestions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			};
		case TOGGLE_VOTE:
			console.log('state in toggle vote ', state)
			return {
				
				...state,
				[action.id]: {

				},
				
				// [action.id]: {
				// 	...state[action.id],
				// 	[action.id]: {
				// 		...action.id[action.answer],
				// 		votes: action.id[action.answer].votes.concat([action.authedUser]),
				// 	},
					// questions: action.answer === true? state[action.id].answer.filter(uid=> uid !==action.authedUser)
					// : state[action.id].answer.concat([action.authedUser]),
					// OptionTwo: action.votes === true? state[action.id].votes.filter(uid=> uid !==action.authedUser)
					// : state[action.id].votes.concat([action.authedUser])
				// },
				
			};
		default:
			return state;
	}
}
