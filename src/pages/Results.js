import React from 'react';
import Cards from '../components/Cards/Cards';

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
}) => {
	const resultsStyle = {
		boxShadow: '0px 4px 8px 0 rgba(0,0,0,0.1)',
		borderRadius: '8px',
		border: '1px solid #ced3d9',
		boxSizing: 'border-box',
		margin: '10px',
	};
	return (
		<div>
			<div>Results View</div>

			<div style={{ display: 'inline-block' }}>
				<Cards
					style={{ display: 'flex', alignItems: 'center' }}
					src={avatarURL}
					title="Results"
					heading={`Asked by: ${name}`}
				>
					<div>
						<div style={resultsStyle}>
							<div>{optionOneQuestion}</div>
							<ProgressBar
								variant="success"
								now={votesPercentageOptionOne}
								label={`${votesPercentageOptionOne}%`}
							/>
							<p>
								{' '}
								{totalVotesOptionOne} out of {totalUsers} votes{' '}
							</p>
						</div>

						<div style={resultsStyle}>
							<div>{optionTwoQuestion}</div>
							<ProgressBar
								variant="success"
								now={votesPercentageOptionTwo}
								label={`${votesPercentageOptionTwo}%`}
							/>
							<p>
								{' '}
								{totalVotesOptionTwo} out of {totalUsers} votes{' '}
							</p>
						</div>
					</div>
				</Cards>
			</div>
		</div>
	);
};

export default Results;
