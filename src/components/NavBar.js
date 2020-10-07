import React, { Component } from 'react';
import { Button } from '@workday/canvas-kit-react-button';
import { ActionBar } from '@workday/canvas-kit-react-action-bar';
import { Link } from 'react-router-dom';
export default class NavBar extends Component {
	render() {
		return (
			<ActionBar>
				<Button style={{ textDecoration: 'none' }} as={Link} to="/">
					Home
				</Button>
				<Button style={{ textDecoration: 'none' }} as={Link} to="/new-question">
					New Question
				</Button>
				<Button style={{ textDecoration: 'none' }} as={Link} to="/leaderboard">
					LeaderBoard
				</Button>
			</ActionBar>
		);
	}
}
