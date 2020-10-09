import React, { Component } from 'react';
import { Button } from '@workday/canvas-kit-react-button';
import { ActionBar } from '@workday/canvas-kit-react-action-bar';
import { Link } from 'react-router-dom';
export default class NavBar extends Component {
	render() {
		return (
			<ActionBar style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px 0px', boxSizing:'border-box', borderRadius: '8px'}}>
				<Button style={{ backgroundColor:'#ffffff', textDecoration: 'none' }} as={Link} to="/">
					Home
				</Button>
				<Button style={{ backgroundColor:'#ffffff',textDecoration: 'none' }} as={Link} to="/new-question">
					New Question
				</Button>
				<Button style={{ backgroundColor:'#ffffff', textDecoration: 'none' }} as={Link} to="/leaderboard">
					LeaderBoard
				</Button>
			</ActionBar>
		);
	}
}
