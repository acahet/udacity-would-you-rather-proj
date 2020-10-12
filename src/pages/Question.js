import { Button } from '@workday/canvas-kit-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleSaveAnswer } from '../actions/questions';
import Cards from '../components/Cards/Cards';
import NavBar from '../components/NavBar';
import Results from '../components/ResultsComponent';

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
				<NavBar />
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

								<Button>Submit</Button>
							</form>
						</Cards>
					)}
				</div>
			</>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }, props) {
	const { id } = props.match.params;
	const selectedQuestion = Object.keys(questions).filter((index) => {
		const questionsId = questions[index].id;
		return questionsId === id;
	});
	const answeredByUser = Object.keys(users[authedUser].answers);

	const selectedQuestionInfo = selectedQuestion.map((index) => {
		const questionsId = questions[index].id;
		const author = questions[index].author;
		const optionOne = questions[index].optionOne.text;
		const optionOneVote = questions[index].optionOne.votes;
		const optionOneVoteLength = optionOneVote.length;
		const optionTwo = questions[index].optionTwo.text;
		const optionTwoVote = questions[index].optionTwo.votes;
		const optionTwoVoteLength = optionTwoVote.length;
		const name = users[author].name;
		const avatarURL = users[author].avatarURL;
		const totalUser = Object.keys(users).length;
		const authedUserAnswer = users[author].answers[index];
		const percentageOptionOne = ((optionOneVoteLength / totalUser) * 100).toFixed(0);
		const percentageOptionTwo = ((optionTwoVoteLength / totalUser) * 100).toFixed(0);
		return {
			questionsId,
			author,
			optionOne,
			optionTwo,
			optionOneVote,
			optionTwoVote,
			optionOneVoteLength,
			optionTwoVoteLength,
			percentageOptionOne,
			percentageOptionTwo,
			name,
			avatarURL,
			totalUser,
			authedUserAnswer,
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
