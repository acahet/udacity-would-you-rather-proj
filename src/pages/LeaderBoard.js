import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cards from '../components/Cards/Cards';
import Header from './Header';

class LeaderBoard extends Component {
	render() {
		const { leaderBoardInfo } = this.props;

		return (
			<>
				<Header />
				<div>
					<div style={{ display: 'inline-block' }}>
						{leaderBoardInfo.map((board) => {
							return (
								<Cards
									style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
									key={board.id}
									title={board.name}
									src={board.avatarURL}
									width="104px"
								>
									<div
										style={{
											paddingLeft: '3px',
											paddingRight: '3px',
											borderRight: '1px solid #ced3d9',
											borderLeft: '1px solid #ced3d9',
										}}
									>
										<p>
											Answered Questions: <strong>{board.nOfAnsQuestions}</strong>
										</p>
										<p>
											Created Questions: <strong>{board.nOfCreatedQuestions}</strong>
										</p>
									</div>
									<div>
										<div>
											Score
											<div>
												<strong>{board.finalScore}</strong>
											</div>
										</div>
									</div>
								</Cards>
							);
						})}
					</div>
				</div>
			</>
		);
	}
}

function mapStateToProps({ users }) {
	const leaderBoardInfo = Object.keys(users)
		.map((userInfo) => {
			const user = users[userInfo];
			const userId = user.id;
			const name = user.name;
			const avatarURL = user.avatarURL;
			const nOfCreatedQuestions = user.questions.length;
			const nOfAnsQuestions = Object.keys(user.answers).length;
			const finalScore = nOfCreatedQuestions + nOfAnsQuestions;
			return {
				id: userId,
				name,
				avatarURL,
				nOfCreatedQuestions,
				nOfAnsQuestions,
				finalScore,
			};
		})
		.sort((a, b) => b.finalScore - a.finalScore);
	return { leaderBoardInfo };
}

export default connect(mapStateToProps)(LeaderBoard);
