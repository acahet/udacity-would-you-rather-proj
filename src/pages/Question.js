import { Button } from '@workday/canvas-kit-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cards from '../components/Cards/Cards';

class Question extends Component {
	handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.id)
    };
	render() {
		const { selectedQuestionInfo } = this.props;
		const { optionOne, optionTwo, name, avatarURL } = selectedQuestionInfo[0];

		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Cards src={avatarURL} style={{ display: 'flex' }} title="Would You Rather" heading={`${name} asks:`}>
					<form onSubmit={this.handleSubmit}>
						<div>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<input type="radio" id="optionOne" />
								<p>{optionOne}</p>
							</div>

							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<input type="radio" id="optionTwo" />
								<p>{optionTwo}</p>
							</div>
						</div>

						<Button>Submit</Button>
					</form>
				</Cards>
			</div>
		);
	}
}

function mapStateToProps({ questions, users }, props) {
	const { id } = props.match.params;
	const selectedQuestion = Object.keys(questions).filter((index) => {
		const questionsId = questions[index].id;
		return questionsId === id;
	});
	const selectedQuestionInfo = selectedQuestion.map((index) => {
		const questionsId = questions[index].id;
		const author = questions[index].author;
		const optionOne = questions[index].optionOne.text;
		const optionTwo = questions[index].optionTwo.text;
		const name = users[author].name;
		const avatarURL = users[author].avatarURL;
		return {
			questionsId,
			author,
			optionOne,
			optionTwo,
			name,
			avatarURL,
		};
	});
	return {
		selectedQuestionInfo,
	};
}

export default withRouter(connect(mapStateToProps)(Question));
