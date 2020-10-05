import React from 'react';

export const QuestionFinalUI = ({
	avatarAltName,
	avatarURL,
	handleSubmit,
	checkedOne,
	checkedTwo,
	onChange,
	optionOneValue,
	optionTwoValue,
}) => {
	return (
		<div style={{borderStyle: 'double', margin:'10px 10px'}}>
			<h2>Would You Rather</h2>
			
				<img style={{ left: '0' ,maxHeight: '25px', maxWidth: '25px' }} alt={avatarAltName} src={avatarURL} />
				<p>{avatarAltName}</p>
		

			<div>
				<form onSubmit={handleSubmit}>
					<input type="radio" checked={checkedOne} onChange={onChange} name="hasVoted" value={optionOneValue} />{' '}
					{optionOneValue}
					<br></br>
					<input type="radio" checked={checkedTwo} onChange={onChange} name="hasVoted" value={optionTwoValue} /> {optionTwoValue}
					<br></br>
					<button style={{display: checkedOne || checkedTwo ? 'none': ''}} type="submit">Submit Answer</button>
				</form>
			</div>
		</div>
	);
};
