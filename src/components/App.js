import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';

import '../App.css';
import Header from './pages/Header';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import NewQuestion from './pages/NewQuestion';

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
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<Header />
					<Switch>
						<div className="App">
						{/* <Route path='/'  exact component={Home} />
							<Route path='/new-question'  exact component={NewQuestion} />
							<Route path='/leaderboard'  exact component={Leaderboard} /> */}
							<PrivateRoute path='/' authedUser={this.props.authedUser} exact component={Home} />
							<PrivateRoute path='/new-question' authedUser={this.props.authedUser} exact component={NewQuestion} />
							<PrivateRoute path='/leaderboard' authedUser={this.props.authedUser} exact component={Leaderboard} />
							<Route path='/login' exact component={Login} />
							 {
						
						
						
						
						
						} 

							<hr />
						</div>
					</Switch>
				</Fragment>
			</Router>
		);
	}
}
function mapStateToProps({ authedUser }) {
	return { authedUser };
}
export default connect(mapStateToProps)(App);
