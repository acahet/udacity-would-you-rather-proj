import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAuthedUser, setAuthedUser } from '../../actions/authedUser';
import Login from './Login';
class Home extends Component {
	render() {
		const { dispatch } = this.props;
		
		return (
			<div>
				<nav>
					<button onClick={() => 
						{dispatch(setAuthedUser(removeAuthedUser))
						return <Login/>
						}
						}>Logout</button>
				</nav>
				
			</div>
		);
	}
}

export default connect()(Home);
