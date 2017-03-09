//renderInitialScreen is called on page load. Clicking the "Start Quiz" button calls initializeGame, which sets state.questionOrder
//and puts the first question on the screen.
//need event listener on answers
//update state depending on answer
//call renderPostQuestion depending on updated state
//event listener on nextquestion button
//call renderQuestion unless at final question, in which case call renderFinalResults



// Questions, an array of objects

var questions = [
	{
	question: "In March 2014, Facebook acquired Oculus VR at what valuation?",
	a: "$500 million",
	b: "$1 billion",
	c: "$2 billion",
	d: "$5 billion",
	answer: "C"
	},
	{
	question: "Oculus's CTO, John Carmack, was the lead programmer on which of these '90s FPS games?",
	a: "Half-Life",
	b: "System Shock",
	c: "Duke Nukem 3D",
	d: "Doom",
	answer: "D"
	},
	{
	question: "What is the name of Google's mobile VR platform, built directly into the Android operating system?",
	a: "Daydream",
	b: "Reverie",
	c: "WakeUp",
	d: "DriftOff",
	answer: "A"
	},
	{
	question: "The HTC Vive is a VR headset developed through a partnership between HTC and what other company?",
	a: "Samsung",
	b: "Google",
	c: "Oculus",
	d: "Valve",
	answer: "D"
	},
	{
	question: "Which tech giant developed the popular VR painting app Tiltbrush?",
	a: "Microsoft",
	b: "Google",
	c: "Amazon",
	d: "Apple",
	answer: "B"
	},
	{
	question: "During its development, by which codename was Playstation VR known?",
	a: "Project Morpheus",
	b: "Project Neo",
	c: "Project Trinity",
	d: "Project Smith",
	answer: "A"
	},
	{
	question: "A minimum of how many sensors are requred to use the Oculus Rift with the Oculus Touch controllers?",
	a: "One",
	b: "Two",
	c: "Three",
	d: "Four",
	answer: "B"
	},
	{
	question: "The Virtuix Omni was a product funded through Kickstarter which aims to simulate which of the following experiences in VR?",
	a: "Skiing",
	b: "Surfing",
	c: "Walking",
	d: "Cycling",
	answer: "C"
	},
	{
	question: "What is the name of the safety system in SteamVR that allows users to see a virtual representation of their playspace's boundaries?",
	a: "Chaperone",
	b: "Guardian",
	c: "Watcher",
	d: "Supervisor",
	answer: "A"
	},
	{
	question: 'Which application allows users to have "virtual LAN parties", allowing them to use their computer in VR and see the screens of others in the room with them?',
	a: "Playtogether",
	b: "Shareroom",
	c: "Monitorspace",
	d: "Bigscreen",
	answer: "D"
	},
];

// Single state object
var state = {
	currentQuestionIndex: 0,
	questionOrder: [],
	question: "",
	answerA: "",
	answerB: "",
	answerC: "",
	answerD: "",
	correctAnswer: "",
	totalCorrect: 0,
	questionsSoFar: 0,
	answerWasCorrect: false
};

// State modification functions
var setQuestionOrder = function(state, numberOfQuestions){
	//goal here is to end up with an array numberOfQuestions long,
	//each entry an integer < questions.length, with no repeats
	//probably a more elegant way to do this

	//make array with one number for each question in questions array
	var allQuestions = [];
	for (var i = 0; i < questions.length; i++){
		allQuestions.push(i);
	}
	//push a random value from allQuestions to state.questionOrder
	//then remove that value from allQuestions
	for (var j = 0; j < numberOfQuestions; j++){
		var randomIndex = Math.floor(Math.random()*allQuestions.length)
		state.questionOrder.push(allQuestions[randomIndex]);
		allQuestions.splice(randomIndex, 1);
	}
};

var loadQuestion = function(state, questions){
	state.question = questions[state.questionOrder[state.currentQuestionIndex]].question;
	state.answerA = questions[state.questionOrder[state.currentQuestionIndex]].a;
	state.answerB = questions[state.questionOrder[state.currentQuestionIndex]].b;
	state.answerC = questions[state.questionOrder[state.currentQuestionIndex]].c;
	state.answerD = questions[state.questionOrder[state.currentQuestionIndex]].d;
	state.correctAnswer = questions[state.questionOrder[state.currentQuestionIndex]].answer;
	state.currentQuestionIndex++;
}

var initializeGame = function(state){
	state.questionOrder = [];
	setQuestionOrder(state, 5);
	$(".js-start-quiz").hide();
	$("h2").show();
	$("footer").show();
	state.currentQuestionIndex = 0;
	state.totalCorrect = 0;
	state.questionsSoFar = 0;
	$(".js-num-correct").html(state.totalCorrect);
	$(".js-num-incorrect").html(state.questionsSoFar - state.totalCorrect);

};

var checkAnswer =  function(state, answerChoice){
	state.answerWasCorrect = answerChoice == state.correctAnswer ? true : false;
	if (state.answerWasCorrect) {state.totalCorrect++};
	state.questionsSoFar++;
}


// Render functions
var renderInitialScreen = function(state){
	$(".question").html("Test your knowledge of consumer VR with this 5 question quiz!")
	$(".answerA").html("");
	$(".answerB").html("");
	$(".answerC").html("");
	$(".answerD").html("");
};

//breaking the rules and not making it take an element
var renderQuestion = function(state){
	$("li").click(handleGuess);
	$(".js-next-question").hide();
	$(".js-question-number").html(state.currentQuestionIndex); //don't have to add 1 because already advanced to next index in loadQuestion()
	$(".question").html(state.question);
	$(".answerA").html(state.answerA);
	$(".answerB").html(state.answerB);
	$(".answerC").html(state.answerC);
	$(".answerD").html(state.answerD);
};

var renderPostQuestion = function(state, choice){
	if(state.answerWasCorrect){
		choice.append('<i class = "fa fa-check"></i>');
	}
	else{
		choice.append('<i class = "fa fa-times"></i>');
		$("#" + state.correctAnswer).append('<i class = "fa fa-check"></i>');
	}

	$(".js-num-correct").html(state.totalCorrect);
	$(".js-num-incorrect").html(state.questionsSoFar - state.totalCorrect); 


	if (state.currentQuestionIndex == state.questionOrder.length){
		$(".js-final-results").show();
	}
	else{
		$(".js-next-question").show();
	}
};

var renderFinalResults = function(state){
	$("li").html("");
	$("h2").hide();
	$(".question").html("You got " + state.totalCorrect + " out of " + state.questionOrder.length + " correct!");
	$(".js-final-results").hide();
	$("footer").hide();
	$(".js-start-quiz").show().html("Start Over");
};


// Event listeners
$(".js-start-quiz").click(function(e){
	e.preventDefault();
	initializeGame(state);
	loadQuestion(state, questions);
	renderQuestion(state);
	});

$(".js-next-question").click(function(e){
	e.preventDefault();
	loadQuestion(state, questions);
	renderQuestion(state);
});

$(".js-final-results").click(function(e){
	e.preventDefault();
	renderFinalResults(state);
});


function handleGuess(){
	$("li").off();
	checkAnswer(state, $(this).attr('id'));
	renderPostQuestion(state, $(this));
}

$(renderInitialScreen(state));

//start-quiz -> initializeGame -> loadQuestion -> renderQuestion -> listen for click
//after click, handleGuess -> listen for next-question
//loadQuestion -> renderQuestion -> listen for click