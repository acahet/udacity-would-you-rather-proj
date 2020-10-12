import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './style.css';
import { handleAddQuestion } from '../actions/questions';
import { Button } from '@workday/canvas-kit-react';

class Add extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		toHome: false,
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevValue) => ({
			...prevValue,
			[name]: value,
		}));
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;
		dispatch(handleAddQuestion(optionOne, optionTwo));
		this.setState(() => ({
			optionOne: '',
			optionTwo: '',
			toHome: true,
		}));
	};
	render() {
		const { toHome, optionOne, optionTwo } = this.state;
		if (toHome === true) {
			return <Redirect to="/" />;
		}

		return (
			<>
				<NavBar />
				<div>
					<h1>
						<strong>Create New Question</strong>
					</h1>
					<hr />
					<h2>Complete the question</h2>
					<p>
						{' '}
						<strong>Would You Rather...</strong>{' '}
					</p>
					<div className="container">
						<form onSubmit={this.handleSubmit}>
							<input
								className="add-question-input"
								onChange={this.handleChange}
								name="optionOne"
								value={optionOne}
								placeholder="Enter Option One here"
							/>
							<h4>
								<strong> ...OR... </strong>
							</h4>
							<input
								className="add-question-input"
								onChange={this.handleChange}
								name="optionTwo"
								value={optionTwo}
								placeholder="Enter Option Two here"
							/>

							<Button disabled={optionOne.length === 0 || optionTwo.length === 0 ? true : false}>
								Submit Question
							</Button>
						</form>
					</div>
				</div>
			</>
		);
	}
}
export default connect()(Add);
