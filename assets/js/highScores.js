// Variables
var highscore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");



//Display list of highscores
var finalScores = localStorage.getItem("finalScores");
finalScores = JSON.parse(finalScores);

if (finalScores !== null) {
    for (var i = 0; i < finalScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = finalScores[i].initials + " " + finalScores[i].score;
        highscore.appendChild(createLi);
    }
}

// Clear scores list
document.getElementById("clear").addEventListener("click", clearScores);
function clearScores() {
    localStorage.clear();
    location.reload();
}