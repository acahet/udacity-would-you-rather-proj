import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { LoadingDots } from '@workday/canvas-kit-react';

import { handleInitialData } from '../actions/shared';

import '../App.css';
import Question from './Questions/Question/Question';
import Questions from './Questions/Questions';

import LeaderBoard from '../pages/LeaderBoard';
import Login from '../pages/Login';
import Add from '../pages/AddQuestion';
import PageNotFound from '../pages/PageNotFound';
import CreateUser from './CreateUser';

function PrivateRoute({ component: Component, authedUser, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authedUser !== null ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				)
			}
		/>
	);
}

class App extends Component {
	state = {
		isLoaded: false,
	};
	componentDidMount() {
		this.props.handleInitialData().then(() => {
			this.setState({ isLoaded: !this.state.isLoaded });
		});
	}

	render() {
		const { authedUser } = this.props;
		const { isLoaded } = this.state;
		return (
			<Router>
				{!isLoaded ? (
					<div style={{ display: 'grid', justifyContent: 'center', paddingTop: '50vh' }}>
						<LoadingDots />
					</div>
				) : (
					<div className="App">
						<Switch>
							<PrivateRoute path="/" authedUser={authedUser} exact component={Questions} />
							<PrivateRoute path="/add" authedUser={authedUser} exact component={Add} />
							<PrivateRoute path="/leaderboard" authedUser={authedUser} exact component={LeaderBoard} />
							<PrivateRoute
								path="/questions/:question_id"
								authedUser={authedUser}
								exact
								component={Question}
							/>
							<Route path="/login" exact component={Login} />
							<Route path="/signup" exact component={CreateUser} />
							<Route component={PageNotFound} />
						</Switch>
					</div>
				)}
			</Router>
		);
	}
}
function mapStateToProps({ authedUser }) {
	return { authedUser };
}

export default connect(mapStateToProps, { handleInitialData })(App);
