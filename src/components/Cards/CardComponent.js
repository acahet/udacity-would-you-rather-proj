import React from 'react';
import Cards from './Cards';

export const CardComponent = ({ mapDetails }) => {
	return (
		<div style={{ display: 'inline-block' }}>
			{mapDetails.map((details) => {
				return (
					<Cards src={details.avatarURL} key={details.id} heading={details.name} title="Would You Rather">
						<strong>{`... ${details.optionOne.text.substring(0, 5)} ...`}</strong>
					</Cards>
				);
			})}
		</div>
	);
};

export default CardComponent;
