import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../Question';
import QuestionContainer from '../QuestionContainer';
class Home extends Component {
	render() {
        
		return (
			<div>
				{/* <Question/> */}
				<QuestionContainer />
			</div>
		);
	}
}



export default connect()(Home);
