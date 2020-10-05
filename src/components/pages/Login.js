import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
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

			// this.setState(() => ({
			// 	isLoggedWith: '',
			// }));
		}
	};

	render() {
		return (
			<div>
				<div>Login</div>
				<form onSubmit={this.handleSubmit}>
					<select value={this.state.isLoggedWith} onChange={(e) => this.handleChange(e)}>
						<option value="select" key="select">
							Select User
						</option>
						{this.props.users.map((user) => {
							console.log('is is: ', user.id);
							return (
								<option value={user.id} key={user.id}>
									{user.name}
								</option>
							);
						})}
					</select>
					{console.log('state for loginId is: ', this.state.isLoggedWith)}
					<button
						type="submit"
						disabled={this.state.isLoggedWith === '' || this.state.isLoggedWith === 'select' ? true : false}
					>
						Login
					</button>
				</form>
			</div>
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
