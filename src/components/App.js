import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { LoadingDots } from '@workday/canvas-kit-react-loading-animation';
import '../App.css';
import Questions from '../components/QuestionComponent';
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
		console.log('loading status is: ', this.props);
		return (
			<Router>
				{!this.state.isLoaded ? (
					<div style={{ display: 'flex', justifyContent: 'center', padding: '50%' }}>
						<LoadingDots />
					</div>
				) : (
					<div className="App">
						<Switch>
							<PrivateRoute path="/" authedUser={authedUser} exact component={Questions} />
							<PrivateRoute path="/add" authedUser={authedUser} exact component={Add} />
							<PrivateRoute path="/leaderboard" authedUser={authedUser} exact component={LeaderBoard} />
							<PrivateRoute path="/questions/:question_id" authedUser={authedUser} exact component={Question} />
							<Route path="/login" exact component={Login} />
							{/* <Route path="/login" exact render={() => {
								<Login isLoaded={this.state.isLoaded} />
							}} /> */}
							<Route component={PageNotFound} />
						</Switch>
					</div>
				)}
			</Router>
		);
	}
}
function mapStateToProps({ authedUser, users }) {
	console.log('mapStateToProps in app.js ', users);
	return { loading: authedUser === null, authedUser, users };
}

export default connect(mapStateToProps, { handleInitialData })(App);
