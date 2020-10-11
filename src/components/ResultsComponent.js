import React from 'react';
import Cards from './Cards/Cards';
import { AiOutlineTrophy } from 'react-icons/ai';

import ProgressBar from 'react-bootstrap/ProgressBar';
const Results = ({
	name,
	avatarURL,
	optionOneQuestion,
	optionTwoQuestion,
	totalVotesOptionOne,
	totalVotesOptionTwo,
	votesPercentageOptionOne,
	votesPercentageOptionTwo,
	totalUsers,
	selectedAnswer,
}) => {
	const resultsStyle = {
		boxShadow: '0px 4px 8px 0 rgba(0,0,0,0.1)',
		borderRadius: '8px',
		border: '1px solid #ced3d9',
		boxSizing: 'border-box',
		margin: '3px',
		width: '210px',
	};

	return (
		<div style={{ display: 'inline-block' }}>
			<Cards
				style={{ display: 'flex', alignItems: 'center' }}
				src={avatarURL}
				title="Results"
				heading={`Asked by: ${name}`}
			>
				<div>
					<div style={resultsStyle}>
						<p>
							<strong>{optionOneQuestion}</strong>
							{selectedAnswer === 'optionOne' ? <AiOutlineTrophy /> : ''}
						</p>
						<ProgressBar
							style={{ border: '1px solid #ced3d9', backgroundColor: '#50a3a2' }}
							isChild={true}
							now={votesPercentageOptionOne}
							label={`${votesPercentageOptionOne}%`}
						/>
						<p>
							<strong>
								{totalVotesOptionOne} out of {totalUsers} votes
							</strong>
						</p>
					</div>

					<div style={resultsStyle}>
						<p>
							<strong>{optionTwoQuestion} </strong>
							{selectedAnswer === 'optionTwo' ? <AiOutlineTrophy /> : ''}
						</p>
						<ProgressBar
							style={{ border: '1px solid #ced3d9', backgroundColor: '#50a3a2' }}
							isChild={true}
							now={votesPercentageOptionTwo}
							label={`${votesPercentageOptionTwo}%`}
						/>
						<p>
							<strong>
								{totalVotesOptionTwo} out of {totalUsers} votes
							</strong>
						</p>
					</div>
				</div>
			</Cards>
		</div>
	);
};

export default Results;
