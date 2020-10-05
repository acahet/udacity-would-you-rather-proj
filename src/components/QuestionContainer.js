import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../utils/api';
import Question from './Question';

class QuestionContainer extends Component {
	state = {
		selectedOption: {},
	};
	onChange = (e) => {
		const vote = e.target.value;
		this.setState(() => ({
			selectedOption: vote,
		}));
	};
	handleClick = (e) => {
		e.preventDefault();
		const { selectedOption } = this.state;
		// saveQuestionAnswer();
		this.setState(() => ({
			unanswered: !this.state.unanswered,
			answered: !this.state.answered
		}));
	};
	render() {
		const { question, authedUser } = this.props;
		const notAnswered = question.filter((f) => {
			const optionOne = f.optionOne.vote;
			const optionTwo = f.optionTwo.vote;
			return !optionOne.includes(authedUser) && !optionTwo.includes(authedUser);
		});
		const answered = question.filter((f) => {
			const optionOne = f.optionOne.vote;
			const optionTwo = f.optionTwo.vote;
			return optionOne.includes(authedUser) || optionTwo.includes(authedUser);
		});
		return (
			<div>
				<h1>Question Container</h1>
				<button type="button" onClick={this.handleClick}> Unanswered </button>
				<button type="button" onClick={this.handleClick}> Answered </button>
				{ this.state.unanswered === true ?
					 <Question getQuestion={notAnswered} onChange={(e)=> this.onChange(e)}/> : <Question getQuestion={answered}/>
				}
			
			<hr/>
			{/* <Question getQuestion={answered}/> */}
			</div>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }) {
	const question = Object.keys(questions).map((index) => ({
		id: questions[index].id,

		timestamp: questions[index].timestamp,
		optionOne: {
			text: questions[index].optionOne.text,
			vote: questions[index].optionOne.votes,
		},
		optionTwo: {
			text: questions[index].optionTwo.text,
			vote: questions[index].optionTwo.votes,
		},
		author: questions[index].author,
		avatarURL: Object.keys(users)
			.filter((user) => user === questions[index].author)
			.map((avatar) => {
				return users[avatar].avatarURL;
			}),
	}));
	return {
		question,
		authedUser,
	};
}
export default connect(mapStateToProps)(QuestionContainer);
