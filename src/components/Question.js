import React, { Component } from 'react';
class Question extends Component {
	render() {
		const { getQuestion, onChange, handleSubmit } = this.props;
		return (
			<div>
				{getQuestion.length > 0
					? getQuestion.map((info) => {
							return (
								<div key={info.id}>
									<h1>Would You Rather</h1>
									<div>
										<img
											style={{ maxHeight: '25px', maxWidth: '25px' }}
											alt={info.name}
											src={info.avatarURL}
										/>
									</div>

									<div>
										<form onSubmit={this.handleSubmit}>
											<input
												type="radio"
												
												onChange={onChange}
												name="answer"
												value={info.optionOne.text}
											/>{' '}
											<label htmlFor={info.optionOne.text}>{info.optionOne.text}</label>
											<br></br>
											<input
												type="radio"
												onChange={onChange}
												name="answer"
												value={info.optionTwo.text}
											/>{' '}
											<label htmlFor={info.optionTwo.text}>{info.optionTwo.text}</label>
											<br></br>
											<button type="submit">Submit Answer</button>
										</form>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export default Question;
