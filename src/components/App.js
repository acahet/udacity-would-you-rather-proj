import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';

import '../App.css';
import Header from '../pages/Header';
import Home from '../pages/Home';
import LeaderBoard from '../pages/LeaderBoard';
import Login from '../pages/Login';
import Add from '../pages/AddQuestion';
import Question from '../pages/Question';
import PageNotFound from '../pages/PageNotFound';

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
	componentDidMount() {
		this.props.handleInitialData();
	}

	render() {
		const { loading, authedUser } = this.props;
		console.log('loading status is: ', this.props);
		return (
			<Router>
				<LoadingBar />
				{loading === null ? null : (
					<div className="App">
						<Header />
						<PrivateRoute path="/" authedUser={authedUser} exact component={Home} />
						<PrivateRoute path="/add" authedUser={authedUser} exact component={Add} />
						<PrivateRoute path="/leaderboard" authedUser={authedUser} exact component={LeaderBoard} />
						<PrivateRoute path="/questions/:id" authedUser={authedUser} exact component={Question} />
						<Route path="/login" exact component={Login} />
						{/* <Route component={PageNotFound} /> */}
						{}
					</div>
				)}
			</Router>
		);
	}
}
function mapStateToProps({ authedUser }) {
	return { loading: authedUser === null, authedUser };
}

export default connect(mapStateToProps, { handleInitialData })(App);
