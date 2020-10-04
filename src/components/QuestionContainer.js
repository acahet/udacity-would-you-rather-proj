import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../utils/api'

class QuestionContainer extends Component {
	state = {
		selectedOption: {},
	};
	onChange = e => {
		const vote = e.target.value;
		this.setState(() => ({
			selectedOption: vote,
		}));
	}
	handleSubmit = e => {
        e.preventDefault();
        const { selectedOption } = this.state
        saveQuestionAnswer()
        this.setState(() =>({
            selectedOption: ''
        }))

	}
	render() {
		const { question, authedUser } = this.props;
		const notAnswered = question.filter((f) => {
			const optionOne = f.optionOne.vote;
			const optionTwo = f.optionTwo.vote;
			const author = f.author;
//&& author !== authedUser
			return !optionOne.includes(authedUser) && !optionTwo.includes(authedUser) ;
		});
		return (
			<div>
				<h1>Question Container</h1>

				{notAnswered.length > 0 ? (
					notAnswered.map((question) => {
						return (
							<div key={question.id}>
								<h1>Would You Rather</h1>
								<h5>{question.question}</h5>
								<form onSubmit={this.handleSubmit}>
									<input
                                        type="radio"
										onChange={(e) => this.onChange(e)}
										name="answer"
										value={question.optionOne.text}
									/>{' '}
									<label htmlFor={question.optionOne.text}>{question.optionOne.text}</label>
									<br></br>
									<input
										type="radio"
										onChange={(e) => this.onChange(e)}
										name="answer"
										value={question.optionTwo.text}
									/>{' '}
									<label htmlFor={question.optionTwo.text}>{question.optionTwo.text}</label>
									<br></br>
									<button type="submit">Submit Answer</button>
								</form>
							</div>
						);
					})
				) : (
					<p>Smething wrong!</p>
				)}
			</div>
		);
	}
}

function mapStateToProps({ authedUser, questions }) {
	const question = Object.keys(questions).map((index) => ({
		id: questions[index].id,
		author: questions[index].author,
		timestamp: questions[index].timestamp,
		optionOne: {
			text: questions[index].optionOne.text,
			vote: questions[index].optionOne.votes,
		},
		optionTwo: {
			text: questions[index].optionTwo.text,
			vote: questions[index].optionTwo.votes,
		},
	}));
	//pass the authenticated user
	//this way we will know which questions he had answered/created or not answered
	//then we pass the question
	return {
		question,
		authedUser,
	};
}
export default connect(mapStateToProps)(QuestionContainer);
