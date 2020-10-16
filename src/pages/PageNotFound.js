import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@workday/canvas-kit-react';
import Header from '../pages/Header';
const PageNotFound = () => {
	return (
		<div>
			<Header />
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
