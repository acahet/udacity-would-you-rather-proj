import React from 'react';
import Cards from './Cards';
import { Button } from '@workday/canvas-kit-react-button';
import { Link } from 'react-router-dom';

export const CardComponent = ({ mapDetails }) => {
	return (
		<div style={{ display: 'inline-block', justifyContent: 'space-between' }}>
			{mapDetails.map((details) => {
				return (
					<Cards
						src={details.avatarURL}
						key={details.id}
						heading={`${details.name} asks:`}
						style={{ display: 'flex', justifyContent: 'space-between' }}
						title="Would You Rather"
					>
						<p style={{ marginLeft: '50px' }}>
							<strong>{`... ${details.optionOne.text.substring(0, 5)} ...`}</strong>
						</p>
						<div>
							<Button
								style={{ textDecoration: 'none', marginTop: '30px', marginRight: '5px'}}
								as={Link}
								to={`/questions/question_${details.id}`}
							>
								View Poll
							</Button>
						</div>
					</Cards>
				);
			})}
		</div>
	);
};

export default CardComponent;
