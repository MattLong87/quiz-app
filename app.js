//renderInitialScreen is called on page load. Clicking the "Start Quiz" button calls initializeGame, which sets state.questionOrder
//and puts the first question on the screen.

// Questions, an array of objects

var questions = [
	{
	question: "In March 2014, Facebook acquired Oculus VR at what valuation?",
	a: "$500 million",
	b: "$1 billion",
	c: "$2 billion*",
	d: "$5 billion"
	},
	{
	question: "Oculus's CTO, John Carmack, was the lead programmer on which of these '90s FPS games?",
	a: "Half-Life",
	b: "System Shock",
	c: "Duke Nukem 3D",
	d: "Doom*"
	},
	{
	question: "What is the name of Google's mobile VR platform, built directly into the Android operating system?",
	a: "Daydream*",
	b: "Reverie",
	c: "WakeUp",
	d: "DriftOff"
	},
	{
	question: "The HTC Vive is a VR headset developed through a partnership between HTC and what other company?",
	a: "Samsung",
	b: "Google",
	c: "Oculus",
	d: "Valve*"
	},
	{
	question: "Which tech giant developed the popular VR painting app Tiltbrush?",
	a: "Microsoft",
	b: "Google*",
	c: "Amazon",
	d: "Apple"
	},
	{
	question: "During its development, by which codename was Playstation VR known?",
	a: "Project Morpheus*",
	b: "Project Neo",
	c: "Project Trinity",
	d: "Project Smith"
	},
	{
	question: "A minimum of how many sensors are requred to use the Oculus Rift with the Oculus Touch controllers?",
	a: "One",
	b: "Two*",
	c: "Three",
	d: "Four"
	},
	{
	question: "The Virtuix Omni was a product funded through Kickstarter which aims to simulate which of the following experiences in VR?",
	a: "Skiing",
	b: "Surfing",
	c: "Walking*",
	d: "Cycling"
	},
	{
	question: "What is the name of the safety system in SteamVR that allows users to see a virtual representation of their playspace's boundaries?",
	a: "Chaperone*",
	b: "Guardian",
	c: "Watcher",
	d: "Supervisor"
	},
	{
	question: 'Which application allows users to have "virtual LAN parties", allowing them to use their computer in VR and see the screens of others in the room with them?',
	a: "Playtogether",
	b: "Shareroom",
	c: "Monitorspace",
	d: "Bigscreen"
	},
];

// Single state object
var state = {
	currentQuestionIndex: 0,
	questionOrder: [],
	correctAnswer: '',
	totalCorrect: 0,
	questionsSoFar: 0
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

var initializeGame = function(state){
	setQuestionOrder(state, 5);
	renderQuestion(state);
	$(".js-start-quiz").hide();
	$(".js-next-question").show();
	state.currentQuestionIndex = 0;
	state.totalCorrect = 0;
	state.questionsSoFar = 0;
};


// Render functions
var renderInitialScreen = function(state){
	$(".question").html("Test your knowledge of consumer VR with this 5 question quiz!")
	$(".answerA").html("");
	$(".answerB").html("");
	$(".answerC").html("");
	$(".answerD").html("");
};

//breaking the rules on this one and not making it take an element
var renderQuestion = function(state){
	$(".question").html(questions[state.questionOrder[state.currentQuestionIndex]].question);
	$(".answerA").html(questions[state.questionOrder[state.currentQuestionIndex]].a);
	$(".answerB").html(questions[state.questionOrder[state.currentQuestionIndex]].b);
	$(".answerC").html(questions[state.questionOrder[state.currentQuestionIndex]].c);
	$(".answerD").html(questions[state.questionOrder[state.currentQuestionIndex]].d);
};

var renderPostQuestion = function(state, element){

};

var renderFinalResults = function(state, element){

};


// Event listeners
$(".js-start-quiz").click(function(e){
	e.preventDefault();
	initializeGame(state);
	});


$(renderInitialScreen(state));