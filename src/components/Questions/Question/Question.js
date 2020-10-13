import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from '@workday/canvas-kit-react';

import { handleSaveAnswer } from '../../../actions/questions';

import Cards from '../../Cards/Cards';
import Results from '../../ResultsComponent';
import Header from '../../../pages/Header';

class Question extends Component {
	state = {
		selectedOption: '',
	};
	handleChange = (e) => {
		const answerIs = e.target.value;
		this.setState(() => ({
			selectedOption: answerIs,
		}));
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { selectedOption } = this.state;
		const { questionsId } = this.props.selectedQuestionInfo[0];
		const { dispatch } = this.props;
		dispatch(handleSaveAnswer(questionsId, selectedOption));
	};
	render() {
		const { selectedQuestionInfo, filterAnsweredQuestion } = this.props;
		const {
			optionOne,
			optionTwo,
			name,
			avatarURL,
			questionsId,
			optionOneVoteLength,
			optionTwoVoteLength,
			percentageOptionOne,
			percentageOptionTwo,
			totalUser,
			authedUserAnswer,
		} = selectedQuestionInfo[0];
		const { selectedOption } = this.state;
		return (
			<>
				<Header />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{filterAnsweredQuestion === questionsId ? (
						<Results
							name={name}
							avatarURL={avatarURL}
							optionOneQuestion={optionOne}
							optionTwoQuestion={optionTwo}
							totalVotesOptionOne={optionOneVoteLength}
							totalVotesOptionTwo={optionTwoVoteLength}
							totalUsers={totalUser}
							votesPercentageOptionOne={percentageOptionOne}
							votesPercentageOptionTwo={percentageOptionTwo}
							selectedAnswer={authedUserAnswer}
						/>
					) : (
						<Cards
							src={avatarURL}
							style={{ display: 'flex' }}
							title="Would You Rather"
							heading={`${name} asks:`}
						>
							<form onSubmit={this.handleSubmit}>
								<div onChange={this.handleChange}>
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<input
											type="radio"
											value="optionOne"
											name="vote"
											checked={selectedOption === 'optionOne'}
											onChange={this.handleChange}
										/>
										<p>{optionOne}</p>
									</div>

									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<input
											type="radio"
											value="optionTwo"
											name="vote"
											checked={selectedOption === 'optionTwo'}
											onChange={this.handleChange}
										/>
										<p>{optionTwo}</p>
									</div>
								</div>

								<Button disabled={selectedOption === '' ? true : false}>Submit</Button>
							</form>
						</Cards>
					)}
				</div>
			</>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }, props) {
	const { question_id } = props.match.params;
	const selectedQuestion = Object.keys(questions).filter((index) => {
		const questionsId = questions[index].id;
		const id = question_id.slice(9);
		return questionsId === id;
	});
	const answeredByUser = Object.keys(users[authedUser].answers);

	const selectedQuestionInfo = selectedQuestion.map((index) => {
		return {
			questionsId: questions[index].id,
			author: questions[index].author,
			optionOne: questions[index].optionOne.text,
			optionTwo: questions[index].optionTwo.text,
			optionOneVote: questions[index].optionOne.votes,
			optionTwoVote: questions[index].optionTwo.votes,
			optionOneVoteLength: questions[index].optionOne.votes.length,
			optionTwoVoteLength: questions[index].optionTwo.votes.length,
			percentageOptionOne: ((questions[index].optionOne.votes.length / Object.keys(users).length) * 100).toFixed(
				0
			),
			percentageOptionTwo: ((questions[index].optionTwo.votes.length / Object.keys(users).length) * 100).toFixed(
				0
			),
			name: users[questions[index].author].name,
			avatarURL: users[questions[index].author].avatarURL,
			totalUser: Object.keys(users).length,
			authedUserAnswer: users[questions[index].author].answers[index],
		};
	});
	const filterAnsweredQuestion = answeredByUser.find((qid) => {
		return qid === selectedQuestionInfo[0].questionsId;
	});
	return {
		selectedQuestionInfo,
		filterAnsweredQuestion,
	};
}

export default withRouter(connect(mapStateToProps)(Question));
