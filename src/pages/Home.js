import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Questions from '../components/QuestionComponent';
import Results from './Results';
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
