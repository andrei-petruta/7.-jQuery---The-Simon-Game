var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


//Event handler for clicks on colours
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    $(`#${userChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    checkAnswer(userClickedPattern.length - 1);
})

//Event handler for key press, start of game
$(document).keypress(function() {
    $("#level-title").text(`Level ${level}`);
    if (!started) {
        nextSequence();
        started = true;
    }

})


//Function to make random sequence of colours
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text(`Level ${level}`);
}


//Function to handle sounds
function playSound(colour) {
    var audio = new Audio(`sounds/${colour}.mp3`);
    audio.play();
}


//Function to handle animations
function animatePress(colour) {
    $(`#${colour}`).addClass("pressed")
    setTimeout(function() {
        $(`#${colour}`).removeClass("pressed");
    }, 100);
}


//Function to check answer from user
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over<br>Press Any Key to Restart");
        startOver();
    }
}



//Function to restart game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}

