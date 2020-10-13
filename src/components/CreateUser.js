import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Button, PageHeader } from '@workday/canvas-kit-react';
import { handleSignUpUser } from '../actions/users';

class CreateUser extends Component {
	state = {
		fName: '',
		lName: '',
		avatarURL: '',
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
		const { dispatch } = this.props;
		const { fName, lName, avatarURL } = this.state;
		const name = fName + ' ' + lName;
		const idFormat = (fName + lName).toLowerCase();
		dispatch(handleSignUpUser(name, idFormat, avatarURL)).then(() =>
			this.setState(() => ({
				optionOne: '',
				optionTwo: '',
				toHome: !this.state.toHome,
			}))
		);
	};
	render() {
		const { fName, lName, avatarURL, toHome } = this.state;
		if (toHome !== false) return <Redirect to="/" />;
		return (
			<>
				<PageHeader title="Would You Rather Game" />
				<div>
					<h1>
						<strong>Sign Up to Would You Rather ...</strong>
					</h1>
				</div>

				<div className="container">
					<form onSubmit={this.handleSubmit}>
						<input
							autoFocus={true}
							className="add-question-input"
							onChange={this.handleChange}
							name="fName"
							value={fName}
							placeholder="add your first name"
						/>
						<input
							className="add-question-input"
							onChange={this.handleChange}
							name="lName"
							value={lName}
							placeholder="add your last name"
						/>
						<input
							className="add-question-input"
							onChange={this.handleChange}
							name="avatarURL"
							value={avatarURL}
							placeholder="insert avatar url"
						/>
						<Button
							type="submit"
							disabled={fName.length === 0 || lName.length === 0 || avatarURL.length === 0 ? true : false}
						>
							Sign Up
						</Button>
					</form>
				</div>
			</>
		);
	}
}

export default connect()(CreateUser);
