//press any key to start, then activate computer pattern

$(document).on("keydown", function () {
    if (level === 0) {
        computerPatternAnimation(computerPattern);
        level++;
        updateHeader(level, true);

        if (buttonEvents == false) {
            buttonEventHandlers();
        }        
    };
})

function updateHeader(newLevel1, success) {
    var heading = $("h1");

    if (success) {
        var newLevel = newLevel1;
        heading.text(`Level ${newLevel}`); 
    } else if (success == false) {
        heading.text("Game Over, Press Any Key to Restart");
    }
}

var level = 0;

var computerPattern = [generateColor()];

function computerPatternAnimation(pattern) {
    
    var container = $(".container");
    container.addClass("grey"); 

    async function animationLoop() {

        await delay(1000);

        for (var i = 0; i < pattern.length; i++) {
            var color = pattern[i];
            animation(color);

            await delay(1000);
        };

        container.removeClass("grey");
    }

    animationLoop();
}

function animation(color) {
    var colorButton = $(`#${color}`);

    colorButton.addClass("pressed");

    setTimeout(function () {
        colorButton.removeClass("pressed");
    }, 100);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ********************************************************

//create container for user pattern, add event listeners to buttons

var userPattern = [];
var buttonEvents = false;

function buttonEventHandlers() {
    buttonEvents = true;

    $(".btn").on("click", function (event) {
        updateUserPattern(event.target);

        var color = colorReturn(event.target);
        animation(color);
        addingSound(color);

        levelController(computerPattern, userPattern);
    });
}

function addingSound(color1) {
    if (color1 == "green") {
        greenSound.play();
    } else if (color1 == "blue") {
        blueSound.play();
    } else if (color1 == "red") {
        redSound.play();
    } else if (color1 == "yellow") {
        yellowSound.play();
    }
}

function updateUserPattern(buttonClicked) {
    var color = colorReturn(buttonClicked);
    userPattern.push(color);
}

function colorReturn(buttonClicked) {
    var color;

    var button = $(buttonClicked);

    if (button.hasClass("green")) {
        color = "green";
    } else if (button.hasClass("red")) {
        color = "red";
    } else if (button.hasClass("blue")) {
        color = "blue";
    } else if (button.hasClass("yellow")) {
        color = "yellow";
    }

    return color;
}

// ********************************************************

// comparing the user pattern and the computer pattern and making decisions

function comparingPatterns(computerPattern1, userPattern1) {
    for (var i = 0; i < userPattern1.length; i++) {
        var computerItem = computerPattern1[i];
        var userItem = userPattern1[i];

        if (computerItem !== userItem) {
            return false;
        }
    }

    return true;
}

function comparingPatternLength(computerPattern1, userPattern1) {
    if (computerPattern1.length == userPattern1.length) {
        return true;
    } else {
        return false;
    }
}

function levelCompleted(computerPattern1, userPattern1) {
    if (comparingPatterns(computerPattern1, userPattern1) && comparingPatternLength(computerPattern1, userPattern1)) {
        return true;
    } else {
        return false;
    }
}

function generateColor() {
    var colors = ["green", "red", "yellow", "blue"];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];

    return randomColor;
}

function levelController(computerPattern1, userPattern1) {
    if (comparingPatterns(computerPattern1, userPattern1) == false) {
        console.log("game over");
        level = 0;
        userPattern = [];
        computerPattern = [generateColor()];
        updateHeader(level, false);

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        wrongSound.play();

    } else if (levelCompleted(computerPattern1, userPattern1)) {
        console.log("level completed");
        var newColor = generateColor();
        computerPattern.push(newColor);
        level++;
        updateHeader(level, true);
        computerPatternAnimation(computerPattern1);
        userPattern = [];

    } else {
        console.log("not finished");
    }
}

// ********************************************************

//cheat code

var cheatCode = $("#cheat-code");

cheatCode.on("click", function () {
    cheatCode.text(computerPattern);

    setTimeout(function () {
        cheatCode.text("Cheat Code");
    }, 5000);
})

var wrongSound = new Audio("./sounds/wrong.mp3");
var blueSound = new Audio("./sounds/blue.mp3");
var greenSound = new Audio("./sounds/green.mp3");
var yellowSound = new Audio("./sounds/yellow.mp3");
var redSound = new Audio("./sounds/red.mp3");