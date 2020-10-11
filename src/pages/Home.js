import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Questions from '../components/QuestionComponent';
export default class Home extends Component {
	render() {
		return (
			<div>
				{/* TODO: perhaps remove it */}
				<NavBar />
				<Questions />
			</div>
		);
	}
}
