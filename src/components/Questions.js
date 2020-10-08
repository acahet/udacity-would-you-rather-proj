
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@workday/canvas-kit-react-button';
import CardComponent from './Cards/CardComponent';

class Questions extends Component {
	state = {
		selected: 0,
	};
	render() {
        const { notAnsweredDetails, answeredDetails } = this.props;
        const { selected } = this.state
		return (
			<div>
				<div
					style={{
						margin: '5px',
						position: 'center',
						boxShadow: ' 0px 4px 8px 0 rgba(0,0,0,0.1)',
						boxSizing: 'border-box',
						border: '1px solid #ced3d9',
						borderRadius: '8px',
					}}
				>
					<div>
						<ul style={{ display: 'inline-flex' }}>
							<li style={{ paddingRight: '5px', listStyleType: 'none' }}>
								<Button onClick={() => this.setState({ selected: 0 })}>Unanswered</Button>
							</li>
							<li style={{ paddingLeft: '5px', listStyleType: 'none' }}>
								<Button onClick={() => this.setState({ selected: 1 })}>Answered</Button>
							</li>
						</ul>
					</div>
					{selected === 0 && <CardComponent mapDetails={notAnsweredDetails}/>}
					{selected === 1 && <CardComponent mapDetails={answeredDetails}/>}
				</div>
				
			</div>
		);
	}
}
function mapStateToProps({ questions, users, authedUser }) {
	const { answers } = users[authedUser]; // get answer qid from authenticated user
	const answeredByUser = Object.keys(answers); // qid answered by user
	const notAnswered = Object.keys(questions).filter((qid) => {
		const remainQuestions = answeredByUser.filter((answeredQid) => answeredQid === qid);
		if (remainQuestions === undefined || remainQuestions.length === 0) return qid;
	}); //qid not answered by current user

	const sortedAnswers = answeredByUser.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
	const sortedNotAnswered = notAnswered.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
	const answeredDetails = sortedAnswers.map((qid) => {
		return {
			id: qid,
			author: questions[qid].author,
			optionOne: {
				text: questions[qid].optionOne.text,
				votes: questions[qid].optionOne.votes,
			},
			optionTwo: {
				text: questions[qid].optionTwo.text,
				votes: questions[qid].optionTwo.votes,
			},
			name: users[questions[qid].author].name,
			avatarURL: users[questions[qid].author].avatarURL,
		};
	});

	const notAnsweredDetails = sortedNotAnswered.map((qid) => {
		return {
			id: qid,
			author: questions[qid].author,
			optionOne: {
				text: questions[qid].optionOne.text,
				votes: questions[qid].optionOne.votes,
			},
			optionTwo: {
				text: questions[qid].optionTwo.text,
				votes: questions[qid].optionTwo.votes,
			},
			name: users[questions[qid].author].name,
			avatarURL: users[questions[qid].author].avatarURL,
		};
	});

	return {
		authedUser,
		notAnsweredDetails,
		answeredDetails,
	};
}
export default connect(mapStateToProps)(Questions);
