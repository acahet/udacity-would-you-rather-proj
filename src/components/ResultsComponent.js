import React from 'react';
import Cards from './Cards/Cards';
import { AiOutlineTrophy } from 'react-icons/ai';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Header from '../pages/Header';
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
		<>
			{/* <Header /> */}
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
								{selectedAnswer === 'optionOne' ? (
									<AiOutlineTrophy
										color="#b8de6f"
										style={{ strokeWidth: '30px', height: '35px', width: '35px' }}
									/>
								) : (
									''
								)}
							</p>
							<ProgressBar
								style={{ border: '1px solid #ced3d9', backgroundColor: '#ee6f57' }}
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
							</p>
							{selectedAnswer === 'optionTwo' ? (
								<AiOutlineTrophy
									color="#b8de6f"
									style={{ strokeWidth: '30px', height: '35px', width: '35px' }}
								/>
							) : (
								''
							)}
							<ProgressBar
								style={{ border: '1px solid #ced3d9', backgroundColor: '#ee6f57' }}
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
		</>
	);
};

export default Results;
