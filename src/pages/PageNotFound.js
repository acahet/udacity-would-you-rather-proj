import { Button, PageHeader } from '@workday/canvas-kit-react';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div>
			<PageHeader title="Would You Rather Game" />
			<h1>
				<strong>PageNotFound</strong>
			</h1>
			<Button as={Link} to="/login" style={{ textDecoration: 'none' }}>
				Login to access
			</Button>
		</div>
	);
};

export default PageNotFound;
