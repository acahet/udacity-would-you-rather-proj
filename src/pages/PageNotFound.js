import { Button } from '@workday/canvas-kit-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
	render() {
		return (
			<div>
				<h1>
					<strong>PageNotFound</strong>
				</h1>
				<Button as={Link} to="/login" style={{ textDecoration: 'none' }}>
					Login to access
				</Button>
			</div>
		);
	}
}
