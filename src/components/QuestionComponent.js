import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@workday/canvas-kit-react-button';
import CardComponent from './Cards/CardComponent';
import Header from '../pages/Header';
class Questions extends Component {
	state = {
		selected: 0,
	};
	render() {
		const { notAnsweredDetails, answeredDetails } = this.props;
		const { selected } = this.state;

		return notAnsweredDetails.length === 0 ? (
			
			<div>
				<Header />
				<h1> Congrats !!!</h1>
				<p> You have answered all questions available</p>
			</div>
		) : (
			<div>
				<Header />
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
	const answeredByUser = Object.keys(answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp); // qid answered by user
	// eslint-disable-next-line array-callback-return
	const notAnswered = Object.keys(questions).filter((qid) => {
		const remainQuestions = answeredByUser.filter((answeredQid) => answeredQid === qid);
		if (remainQuestions === undefined || remainQuestions.length === 0) return qid;
	}).sort((a, b) => questions[b].timestamp - questions[a].timestamp); //qid not answered by current user

	const answeredDetails = answeredByUser.map((qid) => {
		const getValueOf = questions[qid];
		return {
			id: qid,
			author: getValueOf.author,
			optionOne: {
				text: getValueOf.optionOne.text,
				votes: getValueOf.optionOne.votes,
			},
			optionTwo: {
				text: getValueOf.optionTwo.text,
				votes: getValueOf.optionTwo.votes,
			},
			timestamp: getValueOf.timestamp,
			name: users[getValueOf.author].name,
			avatarURL: users[getValueOf.author].avatarURL,
		};
	});

	const notAnsweredDetails = notAnswered.map((qid) => {
		const getValueOf = questions[qid];

		return {
			id: qid,
			author: getValueOf.author,
			optionOne: {
				text: getValueOf.optionOne.text,
				votes: getValueOf.optionOne.votes,
			},
			optionTwo: {
				text: getValueOf.optionTwo.text,
				votes: getValueOf.optionTwo.votes,
			},
			name: users[getValueOf.author].name,
			avatarURL: users[getValueOf.author].avatarURL,
		};
	});

	return {
		authedUser,
		notAnsweredDetails,
		answeredDetails,
	};
}
export default connect(mapStateToProps)(Questions);
