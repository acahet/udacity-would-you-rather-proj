import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAuthedUser } from '../../actions/authedUser';
import { PageHeader } from '@workday/canvas-kit-react-page-header';
import Button from '@workday/canvas-kit-react-button';
class Header extends Component {
	handleClick = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(removeAuthedUser());
		localStorage.setItem('user', '');
	};
	render() {
		return (
			<>
				<PageHeader title="Would You Rather Game">
					{this.props.loading === true ? null : (
						<span style={{ left: '50px' }}>Hello {this.props.users[this.props.authedUser]}</span>
					)}
					<Button
						style={{ display: this.props.authedUser !== null ? '' : 'none' }}
						onClick={this.handleClick}
					>
						Logout
					</Button>
				</PageHeader>
			</>
		);
	}
}
function mapStateToProps({ users, authedUser }) {
	return { loading: authedUser === null, users };
}
export default connect(mapStateToProps)(Header);
