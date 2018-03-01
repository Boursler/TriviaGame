var correctAnswers = 0;
var incorrectAnswers = 0;
var unattemptedQuestions = 0;
var question = 0;
var questionArr = [];
var questionTimer;
// function isTriviaInit() {
// 	if (question === 0 && questionArr.length !== 0) {
// 		return true;
// 	}
// 	else {
// 		return false;
// 	}
// }
//deal with states later
function answerTimer() {
	questionTimer = setInterval(showAnswer(chooseQuestion())
		, 100);
	var count = 0;
	count++;
	console.log("timer is running " + count);
}
function Question(questionBody, answerOptions, correctAnswer) {
	this.questionBody = questionBody;
	this.answerOptions = answerOptions;
	this.correctAnswer = correctAnswer;
}
function chooseQuestion() {
	question1 = new Question("Who is the main character in the Harry Potter series?", ["Draco Malfoy", "Ron Weasley", "Harry Potter"], "Harry Potter");
	console.log("quesntion is " + question1.questionBody);
	return question1;
}

function showQuestion(question) {
	emptyDivs();
	$("#questionDiv").html("<p>" + question.questionBody + "</p>");
	for (var i = 0; i < question.answerOptions.length; i++) {
		$("#answerOptionsDiv").append("<button>" + question.answerOptions[i] + "</button");
	}
}
function showAnswer(question) {
	emptyDivs();
	$("#questionDiv").html("<p>" + "The correct answer was " + question.correctAnswer + "</p>");
}
function emptyDivs() {
	$("#questionDiv").empty();
	$("#answerOptionsDiv").empty();
}
function displayTrivia() {
	emptyDivs();
	showQuestion(chooseQuestion());
	answerTimer();

}
displayTrivia();
