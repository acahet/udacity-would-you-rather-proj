import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleToggleVote } from '../../actions/questions';
import {formatQuestion} from '../../utils/helpers'
import { QuestionFinalUI } from './Question';
class QuestionContainer extends Component {
	state = {
		selectedOption: '',
		unanswered: true,
		answered: false,
	};
	onChange = (e) => {
		const vote = e.target.value;
		this.setState(() => ({
			selectedOption: vote,
		}));
	};
	handleClick = (e) => {
		e.preventDefault();
		// const { selectedOption } = this.state;
		// saveQuestionAnswer();
		this.setState(() => ({
			unanswered: !this.state.unanswered,
			answered: !this.state.answered,
		}));
	};
	handleSubmit = (e) => {
		const { dispatch, question, authedUser } = this.props;
		e.preventDefault();
		// dispatch(handleToggleVote({
		// 	id: question.id,
		// 	hasVoted: question.hasVoted,
		// 	authedUser,
		// }))
	};
	render() {
		const { question, authedUser } = this.props;
		const unanswered = question.filter((f) => {
			const optionOne = f.optionOne.votes;
			const optionTwo = f.optionTwo.votes;
			return !optionOne.includes(authedUser) && !optionTwo.includes(authedUser);
		});
		const answered = question.filter((f) => {
			const optionOne = f.optionOne.votes;
			const optionTwo = f.optionTwo.votes;
			return optionOne.includes(authedUser) || optionTwo.includes(authedUser);
		});

		return (
			<div>
				<button type="button" onClick={this.handleClick}>
					{' '}
					Unanswered{' '}
				</button>
				<button type="button" onClick={this.handleClick}>
					{' '}
					Answered{' '}
				</button>

				{this.state.unanswered === true
					? unanswered.length > 0
						? unanswered.map((info) => {
								return (
									<div key={info.id}>
										<QuestionFinalUI
											avatarAltName={info.author}
											avatarURL={info.avatarURL}
											handleSubmit={this.handleSubmit}
											// checkedOne={info.hasVotedOptionOne ? 'checked' : ''}
											// checkedTwo={info.hasVotedOptionTwo ? 'checked' : ''}
											onChange={this.onChange}
											optionOneValue={info.optionOne.text}
											optionTwoValue={info.optionTwo.text}
										></QuestionFinalUI>
									</div>
								);
						  })
						: null
					: answered.length > 0
					? answered.map((info) => {
							return (
								<div key={info.id}>
									<QuestionFinalUI
										avatarAltName={info.name}
										avatarURL={info.avatarURL}
										onSubmit={this.handleSubmit}
										checkedOne={info.hasVotedOptionOne ? 'checked' : ''}
										checkedTwo={info.hasVotedOptionTwo ? 'checked' : ''}
										onChange={this.onChange}
										optionOneValue={info.optionOne.text}
										optionTwoValue={info.optionTwo.text}
									/>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}
function mapStateToProps({ authedUser, questions, users }, {id}) {
	const tst = questions[id]
	const question = Object.keys(questions).map((index) => ({
		id: questions[index].id,

		timestamp: questions[index].timestamp,
		//test\\
		text: Object.keys(questions).map(index => {
			return questions[index].text
		}),
		votes: Object.keys(questions).map(index => {
			return questions[index].optionOne
		}),
		//\\
		optionOne: {
			text: questions[index].optionOne.text ,
			votes: questions[index].optionOne.votes,
		},
		optionTwo: {
			text: questions[index].optionTwo.text,
			votes: questions[index].optionTwo.votes,
		},
		author: questions[index].author,
		avatarURL: Object.keys(users)
			.filter((user) => user === questions[index].author)
			.map((avatar) => {
				return users[avatar].avatarURL;
			}),
		hasVotedOptionOne: questions[index].optionOne.votes.includes(authedUser),
		hasVotedOptionTwo: questions[index].optionTwo.votes.includes(authedUser)

	}));
	return {
		question,
		authedUser,
	};
}

export default connect(mapStateToProps)(QuestionContainer);
