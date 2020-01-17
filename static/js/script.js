
// Variable decliration
let buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let levelNumber = 1;
// let btnAudio = currentButton + ".mp3";


// Function declaration

function randomNumberGenerator() {
    return Math.floor(Math.random() * 4);
}

function colorPicker() {
    return buttonColor[randomNumberGenerator()];
}


function start() {
    levelNumber = 1;
    gamePattern = [];
    run();
}

function createGamePattern(levelNo) {
    setTimeout(function () {
        let currentButton = colorPicker();
        gamePattern.push(currentButton);
        let currentAudio = new Audio("static/sounds/" + currentButton + ".mp3");
        $("." + currentButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        // currentAudio.play();
        playSound(currentAudio);
        if (levelNo !== 1) {
            createGamePattern(levelNo - 1);
        }
    }, 500);
}

function playSound(currentAudio) {
    currentAudio.play();
}

function run() {
    $("h1").html("Level : " + levelNumber);
    createGamePattern(levelNumber);
}


$(".btn").click(function (event) {
    let current1 = event.currentTarget.classList;
    let current2 = gamePattern.shift();
    if (current2 !== current1[1]) {
        let over = new Audio("static/sounds/wrong.mp3");
        over.play();
        $("h1").html("Game Over!!!<br>Press start button to restart the game!");
        gameOver();
    }
    else if (gamePattern.length === 0) {
        levelNumber++;
        run();
    }
});

function gameOver() {
    levelNumber = 1;
    $("body").keypress(function () {
        run();
    });
}
