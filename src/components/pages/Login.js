import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import Select, { SelectOption } from '@workday/canvas-kit-react-select';
import FormField from '@workday/canvas-kit-react-form-field';
import Card from '@workday/canvas-kit-react-card';
import { Button } from '@workday/canvas-kit-react-button';
class Login extends Component {
	state = {
		isLoggedWith: '',
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

		if (isLoggedWith !== undefined || isLoggedWith !== null) {
			this.props.dispatch(setAuthedUser(isLoggedWith));
		}
	};

	render() {
		return (
				<Card heading="Login" style={{ margin:'25px',padding: '10px'}}>
					<FormField onSubmit={this.handleSubmit}>
					<Select name='login' value={this.state.isLoggedWith} onChange={(e) => this.handleChange(e)}>
						<SelectOption value="select" label="Select User" />
						{this.props.users.map((user) => {
							console.log('is is: ', user.id);
							return (
								<SelectOption value={user.id} key={user.id} label={user.name}/>
							);
						})}
					</Select>
					<Button
						type="submit"
						style={{left: '5px'}}
						disabled={this.state.isLoggedWith === '' || this.state.isLoggedWith === 'select' ? true : false}
					>
						Login
					</Button>
					</FormField>
				</Card>
		);
	}
}

function mapStateToProps({ users }) {
	const allUsers = Object.keys(users).map((index) => ({
		id: users[index].id,
		name: users[index].name,
		avatarUrl: users[index].avatarURL,
	}));

	return {
		users: allUsers,
	};
}

export default connect(mapStateToProps)(Login);
