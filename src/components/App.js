import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import '../App.css';
import Home from './pages/Home';
import Login from './pages/Login';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<div className="App">
				{this.props.authedUser === null || this.props.authedUser === '' ? <Login /> : <Home />}

				<hr />
			</div>
		);
	}
}
function mapStateToProps({ authedUser }) {
	return { authedUser };
}
export default connect(mapStateToProps)(App);
