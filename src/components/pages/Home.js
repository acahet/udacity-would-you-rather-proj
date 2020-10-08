import React, { Component } from 'react';
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
