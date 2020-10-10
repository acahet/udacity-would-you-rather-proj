import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Questions from '../components/QuestionComponent';
import Question from './Question';
export default class Home extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<Questions />
				<hr />
				Question:
				{/* <Question /> */}
			</div>
		);
	}
}
