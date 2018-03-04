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
var qustionNum;

function Question(questionBody, answerOptions, correctAnswer, correctAnswerImage) {
	//question constructor
	this.questionBody = questionBody;
	this.answerOptions = answerOptions;
	this.correctAnswer = correctAnswer;
	this.correctAnswerImage = correctAnswerImage;

}
function initGame() {
	gameState = 0;
	question1 = new Question("Who wrote <em>Man's Search for Meaning?</em>", ["Viktor Frankl", "Jane Austen", "Soren Kierkegaard"], "Viktor Frankl", "assets/images/viktorfranklquote.jpg");
	question2 = new Question("Who wrote the phrase, 'L'enfer c'est les autres?'", ["Jean-Paul Sartre", "Soren Kierkegaard", "Albert Camus"], "Jean-Paul Sartre", "assets/images/noexit.jpg");
	question3 = new Question("What is eternal recurrence?", ["the theory that given infinite time and finite events, events will recur infinitely", "life's decisions are meaningless because life is only lived one time", "time stretches into infinity at stoplights"], "the theory that given infinite time and finite events, events will recur infinitely", "assets/images/eternal-yolo.png"); //taken from Analog Revolution blog, Apr 8 2014
	question4 = new Question("What is <em>ennui</em>?", ["boredom and weariness with the world", "excitement about a major life event", "eternal recurrence", "joy"], "boredom and weariness with the world", "assets/images/rain.jpg");
	question5 = new Question("Who wrote <em>No Exit</em>?", ["Gregor Samsa", "Friedrich Nietzsche", "Jean-Paul Sartre", "Soren Kierkegaard"], "Jean-Paul Sartre", "assets/images/jeanpaulsartre.jpg");
	question6 = new Question("What is a major value with which existentialist writers concern themselves?", ["humility", "passive acceptance of life's ups and downs", "authenticity", "loneliness"], "authenticity", "assets/images/mask.jpg");
	question7 = new Question("Who woke up as a cockroach?", ["the brothers Karamazov", "Gregor Samsa", "Meursault", "Rodion Romanovich Raskolnikov"], "Gregor Samsa", "assets/images/bug.jpg");

	questionArr = [question1, question2, question3, question4, question5, question6, question7];
	questionNum = questionArr.length;
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
	if (submittedAnswers === questionNum) {
		gameState = 3;
	}
}

function initDisplay() {
	emptyDivs();


	$("#answerOptionsDiv").html("<button id='startGame' class='btn btn-secondary'> Start </button>");
}
function showQuestion() {
	emptyDivs();

	$("#questionDiv").html("<p>" + question.questionBody + "</p>");
	for (var i = 0; i < question.answerOptions.length; i++) {
		$("#answerOptionsDiv").append("<button class='options btn btn-secondary'>" + question.answerOptions[i] + "</button");
	}
}
function showAnswer() {
	emptyDivs();
	$("#questionDiv").html("<p>" + correct + "</p> <p>" + "The answer is " + question.correctAnswer + "</p>" + "<img src='" + question.correctAnswerImage + "'/>");

}
function endDisplay() {
	emptyDivs();
	$("#questionDiv").text("The game is over! Here are your stats:")
	$("#answerOptionsDiv").append("<p> Right: " + correctAnswers + "</p>");
	$("#answerOptionsDiv").append("<p> Wrong: " + incorrectAnswers + "</p>");
	$("#answerOptionsDiv").append("<p>Passed: " + unattemptedQuestions + "</p>");
	$("#answerOptionsDiv").append("<button id='tryAgain' class = 'btn btn-secondary'> Try Again! </button>");

}
function emptyDivs() {
	console.log("empty");

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
		$("#countDownTimer").text("Time remaining is " + seconds + " seconds");
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
		$("#countDownTimer").text("Time remaining is " + seconds + " seconds");
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
			setTimeout(questionRound, 10000);
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
