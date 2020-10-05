export function formatDate(timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString('en-US');
	return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatQuestion(questions, author, authedUser, users) {
	const { id, timestamp, text, answers } = questions;
	const { name, avatarURL } = author;

	return {
		name,
		id,
		timestamp,
		text,
		answers,
		avatar: avatarURL,
		hasVoted: users[authedUser].answers.includes(id)
	};
}
// export function formatQuestion(questions, users, authedUser) {
// 	const question = Object.keys(questions).map((index) => ({
// 		id: questions[index].id,

// 		timestamp: questions[index].timestamp,
// 		optionOne: {
// 			text: questions[index].optionOne.text,
// 			vote: questions[index].optionOne.votes,
// 		},
// 		optionTwo: {
// 			text: questions[index].optionTwo.text,
// 			vote: questions[index].optionTwo.votes,
// 		},
// 		author: questions[index].author,
// 		avatarURL: Object.keys(users)
// 			.filter((user) => user === questions[index].author)
// 			.map((avatar) => {
// 				return users[avatar].avatarURL;
// 			}),
// 		hasVotedOptionOne: questions[index].optionOne.votes.includes(authedUser),
// 		hasVotedOptionTwo: questions[index].optionTwo.votes.includes(authedUser),
// 	}));
// 	return question;
// }
