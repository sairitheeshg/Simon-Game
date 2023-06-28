let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;


$(document).on("keypress", function () {
    if (started === false) {
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {

    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    let lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);

});

function checkAnswer(lastInd) {

    if (userClickedPattern[lastInd] === gamePattern[lastInd]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(4 * Math.random());
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    let sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
}

