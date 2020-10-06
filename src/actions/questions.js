import { saveQuestionAnswer } from '../utils/api'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const TOGGLE_VOTE = 'TOGGLE_VOTE';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function toggleVote({ id, authedUser, questions, answer }) {
	return {
		type: TOGGLE_VOTE,
		id,
		authedUser,
		answer,
		questions,
	};
}

export function handleToggleVote(info) {
	return (dispatch) => {
		dispatch(toggleVote(info))
		return saveQuestionAnswer(info).catch(e=>{
			console.warn(' error in handleToggleVote: ', e)
			dispatch(toggleVote(info))
			alert('error while saving vote')
		})
	}
}
