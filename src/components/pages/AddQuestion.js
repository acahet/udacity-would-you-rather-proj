import React, { Component } from 'react';
import { connect } from 'react-redux'
import NavBar from '../NavBar';
import './style.css';
import FormField, { FormFieldLabelPosition } from '@workday/canvas-kit-react-form-field';
import TextInput from '@workday/canvas-kit-react-text-input';

class Add extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
	};

	handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState((prevValue) => ({
			...prevValue,
			[name]: value,
		}));
		console.log('this.state.optionOne ', this.state.optionOne);
		console.log('this.state.optionTwo ', this.state.optionTwo);
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const {optionOne, optionTwo} = this.state
		console.log('e', e);
	};
	render() {
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
						<form>
							<input
								onChange={this.handleChange}
								name="optionOne"
								value={this.state.optionOne}
								placeholder="Enter Option One here"
							/>
							<h4>
								<strong> ...OR... </strong>
							</h4>
							<input
								onChange={this.handleChange}
								name="optionTwo"
								value={this.state.optionTwo}
								placeholder="Enter Option Two here"
							/>

							<button>Submit Question</button>
						</form>
					</div>
				</div>
			</>
		);
	}
}
export default connect()(Add);