import { hideLoading, showLoading } from 'react-redux-loading';
import { saveQuestionAnswer } from '../utils/api';
import { setAuthedUserAnswer } from './authedUser';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function receiveAnswer(info) {
	return {
		type: RECEIVE_ANSWER,
		info,
	};
}

export function handleReceiveAnswer(info) {
	return (dispatch) => {
		dispatch(showLoading())
		return saveQuestionAnswer(info).then(() =>{
			dispatch(setAuthedUserAnswer(info))
			dispatch(receiveAnswer(info))
		}).then(() => {
			dispatch(hideLoading())
		}).catch((error) => {
			console.warn('Error in handleReceiveAnswer! ', error)
			alert('Error in handleReceiveAnswer! Check console for more info')
		})
	};
}
