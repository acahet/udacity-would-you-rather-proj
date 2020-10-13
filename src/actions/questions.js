// import { hideLoading, showLoading } from 'react-redux-loading';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

function saveAnswer(authedUser, qid, answer) {
	return {
		type: SAVE_QUESTION_ANSWER,
		authedUser,
		qid,
		answer,
	};
}
export function handleSaveAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		// dispatch(showLoading());

		return saveQuestionAnswer({
			answer: answer,
			qid: qid,
			authedUser,
		})
			.then(() => {
				dispatch(saveAnswer(authedUser, qid, answer));
			})
			// .then(() => dispatch(hideLoading()));
	};
}
export function handleAddQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		// dispatch(showLoading());

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser,
		})
			.then((question) => {
				console.log('saveQuestion ', saveQuestion);
				dispatch(addQuestion(question));
			})
			// .then(() => dispatch(hideLoading()));
	};
}
