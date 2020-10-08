import React, { Component } from 'react';
import Card from '@workday/canvas-kit-react-card';
import { Button } from '@workday/canvas-kit-react-button';
import { Avatar } from '@workday/canvas-kit-react-avatar';
import { Link } from 'react-router-dom';
export default class Cards extends Component {
	render() {
		const { src, heading, children } = this.props;
		return (
			<div style={{ display: 'block ruby', padding: '5px' }}>
				<Card width="50vh" heading={`${heading} asks:`}>
					<h2 style={{ padding: '0px' }}>
						<strong>{this.props.title}</strong>
					</h2>
					{children}
					<Card border="none" padding="0">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Avatar style={{ marginLeft: '5px' }} size={100} url={src} />
							<Button
								style={{ textDecoration: 'none', marginTop: '30px', marginRight: '5px' }}
								as={Link}
								to="/"
							>
								View Poll
							</Button>
						</div>
					</Card>
				</Card>
			</div>
		);
	}
}
