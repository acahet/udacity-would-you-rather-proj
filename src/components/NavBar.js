import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@workday/canvas-kit-react-button';
import { ActionBar } from '@workday/canvas-kit-react-action-bar';

const NavBar = () => {
	return (
		<ActionBar
			style={{
				boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px 0px',
				boxSizing: 'border-box',
				borderRadius: '8px',
			}}
		>
			<Button style={{ backgroundColor: '#ffffff', textDecoration: 'none' }} as={Link} to="/">
				Home
			</Button>
			<Button style={{ backgroundColor: '#ffffff', textDecoration: 'none' }} as={Link} to="/add">
				New Question
			</Button>
			<Button style={{ backgroundColor: '#ffffff', textDecoration: 'none' }} as={Link} to="/leaderboard">
				LeaderBoard
			</Button>
		</ActionBar>
	);
};

export default NavBar;
