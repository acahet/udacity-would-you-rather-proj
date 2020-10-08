import React, { Component } from 'react';
import Card from '@workday/canvas-kit-react-card';
import { Avatar } from '@workday/canvas-kit-react-avatar';
export default class Cards extends Component {
	render() {
		const { src, heading, children, style, title, avatarStyle } = this.props;
		return (
			<div style={{ display: 'block ruby', padding: '5px' }}>
				<Card width="50vh" heading={heading}>
					<h2 style={{ padding: '0px' }}>
						<strong>{title}</strong>
					</h2>
					<div style={style}>
						<div>
							<Avatar style={avatarStyle} size={100} url={src} />
						</div>
						{children}
					</div>
				</Card>
			</div>
		);
	}
}
