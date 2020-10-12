import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAuthedUser } from '../actions/authedUser';
import { PageHeader } from '@workday/canvas-kit-react-page-header';
import Button from '@workday/canvas-kit-react-button';
import { Avatar } from '@workday/canvas-kit-react';
import NavBar from '../components/NavBar';
class Header extends Component {
	handleClick = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(removeAuthedUser());
		localStorage.setItem('user', '');
	};
	render() {
		const { authedUser, users, loading } = this.props;
		const user = users[authedUser];
		return (
			<div>
				<PageHeader title="Would You Rather Game">
					{loading === true ? null : (
						<div style={{ display: authedUser !== null ? 'flex' : 'none', alignItems: 'center' }}>
							<div>
								<Avatar alt={user.avatarURL} url={user.avatarURL} />
							</div>
							<div style={{ marginLeft: '5px', marginRight: '5px' }}>
								<span>Hello {user.name}</span>
							</div>
							<div>
								<Button onClick={this.handleClick}>Logout</Button>
							</div>
						</div>
					)}
				</PageHeader>
				<NavBar />
			</div>
		);
	}
}
function mapStateToProps({ users, authedUser }) {
	const currentUser = users[authedUser];
	console.log('currentUser ', currentUser);
	return { loading: authedUser === null, users, authedUser };
}
export default connect(mapStateToProps)(Header);
