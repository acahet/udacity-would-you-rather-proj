import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Card from '@workday/canvas-kit-react-card';
import { Button } from '@workday/canvas-kit-react-button';
import { PageHeader } from '@workday/canvas-kit-react';
import Select, { SelectOption } from '@workday/canvas-kit-react-select';
import FormField from '@workday/canvas-kit-react-form-field';

import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
	state = {
		isLoggedWith: '',
		redirect: false,
	};

	handleChange = (e) => {
		const selectedUser = e.target.value;

		this.setState(() => ({
			isLoggedWith: selectedUser,
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { isLoggedWith } = this.state;

		if (isLoggedWith !== '' || isLoggedWith !== null) {
			this.props.dispatch(setAuthedUser(isLoggedWith));
			this.setState(() => ({
				redirect: true,
			}));
		}
	};

	render() {
		//http://localhost:3000/questions/question_t7kjwnhmrxwbtu5uiuqsg
		// console.log('this.props.location ', this.props.location);
		const { isLoggedWith, redirect } = this.state;
		const { users } = this.props;
		return redirect === true ? (
			<Redirect
				to={{
					pathname: this.props.location.state === undefined ? '/' : this.props.location.state.from.pathname,
					// state: { stateName: true },
				}}
			/>
		) : (
			<>
				<PageHeader title="Would You Rather Game" />
				<div>
					<Card heading="Login" style={{ margin: '25px', padding: '10px' }}>
						<FormField onSubmit={this.handleSubmit}>
							<Select name="login" value={isLoggedWith} onChange={(e) => this.handleChange(e)}>
								<SelectOption value="select" label="Select User" />
								{users.map((user) => {
									return <SelectOption value={user.id} key={user.id} label={user.name} />;
								})}
							</Select>
							<div>
								<Button
									to="/home"
									type="submit"
									style={{ width: '250px', marginTop: '5px', textDecoration: 'none' }}
									onClick={(e) => this.handleSubmit(e)}
									disabled={isLoggedWith === '' || isLoggedWith === 'select' ? true : false}
								>
									Login
								</Button>
							</div>
							<div>
								<Button
									to="/signup"
									style={{ width: '250px', marginTop: '5px', textDecoration: 'none' }}
									as={Link}
								>
									SignUp
								</Button>
							</div>
						</FormField>
					</Card>
				</div>
			</>
		);
	}
}

function mapStateToProps({ users }, props) {
	const allUsers = Object.keys(users).map((index) => ({
		id: users[index].id,
		name: users[index].name,
		avatarUrl: users[index].avatarURL,
	}));
	// console.log('mapStateToProps ', props);
	return {
		users: allUsers,
	};
}

export default connect(mapStateToProps)(Login);
