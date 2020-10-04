import React, { Component } from 'react';
import { connect } from 'react-redux';
class Question extends Component {
	render() {
		const { questionIds } = this.props;
		return (
			<div>
				questionIds
				<ul>
					{questionIds.map((id) => {
						return (
							<ol key={id}>
								<div>QuestionsID: {id}</div>
							</ol>
						);
					})}
				</ul>
			</div>
		);
	}
}
function mapStateToProps({ questions }) {
	console.log(questions, ' questions');
	return {
		questionIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
	};
}
export default connect(mapStateToProps)(Question);
