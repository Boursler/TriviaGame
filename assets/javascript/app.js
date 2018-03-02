var correctAnswers = 0;
var incorrectAnswers = 0;
var unattemptedQuestions = 0;
var question = 0;
var questionArr = [];
var questionTimer;
//if gameInit, gameState = 0; if gameQuestion, gameState = 1; if gameAnswer, gameState = 2; if gameOver, gameState = 3
var gameState = 0;
var userAnswer;


function Question(questionBody, answerOptions, correctAnswer) {
	//question constructor
	this.questionBody = questionBody;
	this.answerOptions = answerOptions;
	this.correctAnswer = correctAnswer;
}
function initGame() {
	gameState = 0;
	question1 = new Question("Who is the main character in the Harry Potter series?", ["Draco Malfoy", "Roy Weasley", "Harry Potter"], "Harry Potter");
	question2 = new Question("What color is the sky?", ["Blue", "Green", "Purple"], "Blue");
	question3 = new Question("Why do cats meow?", ["to communicate with each other", "to talk to humans", "to entertain themselves"], "to talk to humans");
	questionArr = [question1, question2, question3];
}
function chooseQuestion() {
	gameState = 1;

	question = questionArr.splice(0, 1);
	question = question[0];
	for (var i = 0; i < questionArr.length; i++) {
		console.log("question choices are " + questionArr[i].questionBody);
	}
	console.log("question is " + question.questionBody);
	return question;
}

function submitAnswer() {
	gameState = 2;
	if (userAnswer === question.correctAnswer) {
		correctAnswers++
		console.log("correct answers " + correctAnswers);
	}
	else if (userAnswer !== question.correctAnswer) {
		incorrectAnswers++
		console.log("incorrect Answers " + incorrectAnswers);
	}
	else {
		unattemptedQuestions++;
	}
}

function initDisplay() {
	emptyDivs();
	$("h1").text("Welcome to the Trivia Game!");
	$("#questionDiv").text("Press the trivia button to start!")
	$("#answerOptionsDiv").html("<button id='startGame'> Start! </button>");
}
function showQuestion() {
	emptyDivs();
	$("#questionDiv").html("<p>" + question.questionBody + "</p>");
	for (var i = 0; i < question.answerOptions.length; i++) {
		$("#answerOptionsDiv").append("<button class='options'>" + question.answerOptions[i] + "</button");
	}
}
function showAnswer() {
	emptyDivs();
	$("#questionDiv").html("<p>" + "The correct answer was " + question.correctAnswer + "</p>");
	console.log(question.correctAnswer);
}
function endDisplay() {
	emptyDivs();
	$("#questionDiv").text("The game is over! Here are your stats:")
	$("#answerOptionsDiv").append("<p> Right: " + correctAnswers + "</p>");
	$("#answerOptionsDiv").append("<p> Wrong: " + incorrectAnswers + "</p>");
	$("#answerOptionsDiv").append("<p>Passed: " + unattemptedQuestions + "</p>");
	$("#answerOptionsDiv").append("<button id='tryAgain'> Try Again! </button>");

}
function emptyDivs() {
	console.log("empty");
	$("h1").empty();
	$("#questionDiv").empty();
	$("#answerOptionsDiv").empty();
}
function initRound() {
	initGame();
	initDisplay();
}
function questionRound() {
	chooseQuestion();
	showQuestion();
}
function answerRound() {
	userAnswer = $(this).text();
	console.log("answer given is " + userAnswer);
	submitAnswer();
	showAnswer();
}
function displayTrivia() {
	console.log("game State is " + gameState);
	if (gameState === 0) {
		initRound();
		$("#startGame").click(questionRound);
	}
	else if (gameState === 1) {
		$(".options").click(answerRound);
	}
	else if (gameState === 2) {
		if (questionArr.length > 0) {
			setTimeout(questionRound, 5000);
		}
		else {
			setTimeout(endDisplay, 5000);
		}
	}
	else {

		$("#tryAgain").click(initRound);
	}


}
$("#testButton1").click(displayTrivia);
