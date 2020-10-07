import React, { Component } from 'react';
import { Button } from '@workday/canvas-kit-react-button';
import { ActionBar } from '@workday/canvas-kit-react-action-bar';
import NavBar from '../NavBar';
import Questions from '../Questions';
export default class Home extends Component {
	render() {
		return (
			<div>
				<NavBar />
                <Questions />
			</div>
		);
	}
}
