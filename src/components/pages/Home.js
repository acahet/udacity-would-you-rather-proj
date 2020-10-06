import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import QuestionContainer from '../Questions/QuestionContainer';
class Home extends Component {
	render() {
		const { dispatch } = this.props;
		return (
			<div>
				<nav>
					<button onClick={() => dispatch(setAuthedUser(null))}>Logout</button>
				</nav>

				<QuestionContainer />
			</div>
		);
	}
}

export default connect((state) => ({ authedUsers: state }))(Home);
