import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@workday/canvas-kit-react-button';
import CardComponent from './Cards/CardComponent';
import { formatQuestion } from '../utils/helpers';

class Questions extends Component {
	state = {
		selected: 0,
	};
	render() {
		const { notAnsweredDetails, answeredDetails } = this.props;
		const { selected } = this.state;
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
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<ul style={{ display: 'inline-flex' }}>
							<li style={{ paddingRight: '5px', listStyleType: 'none' }}>
								<Button style={{ padding: '5px' }} onClick={() => this.setState({ selected: 0 })}>
									Unanswered
								</Button>
							</li>
							<li style={{ paddingLeft: '5px', listStyleType: 'none' }}>
								<Button onClick={() => this.setState({ selected: 1 })}>Answered</Button>
							</li>
						</ul>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', paddingLeft: '40px' }}>
						{selected === 0 && <CardComponent mapDetails={notAnsweredDetails} />}
						{selected === 1 && <CardComponent mapDetails={answeredDetails} />}
					</div>
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
		const getValue = questions[qid];
		return {
			id: qid,
			author: getValue.author,
			optionOne: {
				text: getValue.optionOne.text,
				votes: getValue.optionOne.votes,
			},
			optionTwo: {
				text: getValue.optionTwo.text,
				votes: getValue.optionTwo.votes,
			},
			timestamp: getValue.timestamp,
			name: users[getValue.author].name,
			avatarURL: users[getValue.author].avatarURL,
		};
	});
	const notAnsweredDetails = sortedNotAnswered.map((qid) => {
		const getValue = questions[qid];

		return {
			id: qid,
			author: getValue.author,
			optionOne: {
				text: getValue.optionOne.text,
				votes: getValue.optionOne.votes,
			},
			optionTwo: {
				text: getValue.optionTwo.text,
				votes: getValue.optionTwo.votes,
			},
			name: users[getValue.author].name,
			avatarURL: users[getValue.author].avatarURL,
		};
	});

	return {
		authedUser,
		notAnsweredDetails,
		answeredDetails,
	};
}
export default connect(mapStateToProps)(Questions);
