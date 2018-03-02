var correctAnswers = 0;
var incorrectAnswers = 0;
var unattemptedQuestions = 0;
var question = 0;
var questionArr = [];
var questionTimer;
//if gameInit, gameState = 0; if gameQuestion, gameState = 1; if gameAnswer, gameState = 2; if gameOver, gameState = 3
var gameState = 0;
var userInput;
function initGame() {
	gameState = 0;
	question1 = new Question("Who is the main character in the Harry Potter series?", ["Draco Malfoy", "Roy Weasley", "Harry Potter"], "Harry Potter");
	question2 = new Question("What color is the sky?"["Blue", "Green", "Purple"], "Blue");
	question3 = new Question("Why do cats meow?"["to communicate with each other", "to talk to humans", "to entertain themselves"], "to talk to humans");
	questionArr = [question1, question2, question3];
}

function Question(questionBody, answerOptions, correctAnswer) {
	//question constructor
	this.questionBody = questionBody;
	this.answerOptions = answerOptions;
	this.correctAnswer = correctAnswer;
}
function chooseQuestion() {
	gameState = 1;
	question = questionArr.splice(0, 1);
	question = question[0];
	console.log("question is " + question.questionBody);
	return question;
}
function submitAnswer() {
	gameState = 2;
	if (userInput === question.correctAnswer) {
		correctAnswers++
	}
	else if (userInput !== question.correctAnswer) {
		incorrectAnswers++
	}
	else {
		unattemptedQuestions++;
	}
}

function initDisplay() {
	emptyDivs();
	$("h1").text("Welcome to the Trivia Game!");
	$("#questionDiv").text("Press the trivia button to start!")
	$("#answerOptionsDiv").html("<button> Start! </button>");
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
	console.log(question.correctAnswer);
}
function emptyDivs() {
	console.log("empty");
	$("h1").empty();
	$("#questionDiv").empty();
	$("#answerOptionsDiv").empty();
}
function displayTrivia() {
	emptyDivs();
	initGame();
	chooseQuestion();
	showQuestion(question);
	showAnswer(question);

}
$("#testButton1").click(initDisplay);
$("#testButton2").click(function clear() {
	clearInterval(questionTimer);
})
