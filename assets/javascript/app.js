var correctAnswers = 0;
var incorrectAnswers = 0;
var unattemptedQuestions = 0;
var question = 0;
var questionArr = [];
var questionTimer;
//if gameInit, gameState = 0; if gameQuestion, gameState = 1; if gameAnswer, gameState = 2; if gameOver, gameState = 3
var gameState = 0;
var userAnswer;
var submittedAnswers = 0;
var correct;
var countdownTimer = 10000;
var seconds = countdownTimer / 1000;
var timeout;
var timer;

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
	return question;
}

function submitAnswer() {
	gameState = 2;

	if (userAnswer === question.correctAnswer) {
		correct = "Correct!";
		correctAnswers++

		submittedAnswers++

		return correct;
	}
	else if (question.answerOptions.includes(userAnswer) === true) {
		incorrectAnswers++

		correct = "Incorrect!";
		submittedAnswers++;

		return correct;
	}
	else {
		unattemptedQuestions++;
		submittedAnswers++;

		correct = "Pass";
		return correct;
	}


}
function endGame() {
	if (submittedAnswers === 3) {
		gameState = 3;
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
	$("#questionDiv").html("<p>" + correct + "</p> <p>" + "The answer is " + question.correctAnswer + "</p>");

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
	$("#countDownTimer").empty();
}
function initRound() {

	initGame();
	initDisplay();

}
function questionRound() {

	chooseQuestion();
	showQuestion();
	displayTrivia();
}
function answerRound() {

	userAnswer = $(this).text();
	submitAnswer();
	showAnswer();
	displayTrivia();
}
function endGameRound() {

	endGame();
	endDisplay();
	displayTrivia();
}
function countdown() {
	console.log("enter countdown phase");
	if (seconds > 0) {
		console.log("interval is running");
		seconds--;
		console.log("seconds " + seconds);
		$("#countDownTimer").text(seconds);
	}
	else {
		clearInterval(timer);
	}

}
function displayTrivia() {
	console.log("game State is " + gameState);
	clearTimeout(timeout);
	clearInterval(timer);
	if (gameState === 0) {
		initRound();
		$("#startGame").click(questionRound);
	}
	else if (gameState === 1) {
		seconds = countdownTimer / 1000;
		timeout = setTimeout(answerRound, countdownTimer);
		timer = setInterval(countdown, 1000);
		$(".options").click(answerRound);
		$(".options").click(function () {
			clearTimeout(timeout);
			clearInterval(timer);
		});

	}
	else if (gameState === 2) {
		if (questionArr.length > 0) {
			setTimeout(questionRound, 3000);
		}
		else {
			setTimeout(endGameRound, 5000);
		}
	}
	else {

		$("#tryAgain").click(initRound);
	}
}
$(document).ready(function () {
	displayTrivia();
})
