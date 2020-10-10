// Quiz Questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within _____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store _____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },

];



// Variables
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions");
var mainContainer = document.querySelector("#main-container");



// Timer start time is 75 seconds
var secondsLeft = 75;
var holdInterval = 0;
// Minus 10 second Penalty
var penalty = 10;



// Creates new element
var olCreate = document.createElement("ol");


// Start button starts timer
start.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
            }
        }, 1000);
    }
    render(questionIndex);
});



// Questions appear on page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    olCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}



// User choice selection comparison with answer: Correct or Wrong
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong!";
        }
    }


    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}



// Last page: All Done!
function allDone() {
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

    // Heading: All Done!
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);

    // Paragraph element
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // Final score is pulled from time remaining
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";
    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";
    questionsDiv.appendChild(createSubmit);

    

// Initials and score stored on local
createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
        console.log("No value entered!");
    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var finalScores = localStorage.getItem("finalScores");
        if (finalScores === null) {
            finalScores = [];
        } else {
            finalScores = JSON.parse(finalScores);
        }
        finalScores.push(finalScore);
        var newScore = JSON.stringify(finalScores);
        localStorage.setItem("finalScores", newScore);
        window.location.replace("highScores.html");
    }
});
}