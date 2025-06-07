$(document).on("keydown", function () {
    if (level === 0) {
        increaseLevel();
    }; 
});

var level = 0;

var redBox = $(".red");
var greenBox = $(".green");
var yellowBox = $(".yellow");
var blueBox = $(".blue");

var containerOfColors = [redBox, greenBox, yellowBox, blueBox];

$(".btn").on("click", function (event) {

    $(event.target).addClass("pressed");

    setTimeout(function () {
        $(event.target).removeClass("pressed");
    }, 100);
})

var orderOfClicks = ["yellow", "green", "blue", "red"];


function increaseLevel() {
    level++;
    $("h1").text(`Level ${level}`);
}

function createRandomColor() {
    var colors = ["red", "green", "yellow", "blue"];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];
    return randomColor;
}

// function test(order) {
//     for (var i = 0; i < order.length; i++) {
//         var button = $(`#${order[i]}`);
//         $(button).addClass("pressed");

//         setTimeout(function () {
//             $(button).removeClass("pressed");
//         }, 100);
//     };
// }

function goThroughList(order) {

    function delay(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    };

    async function test() {
        for (var i = 0; i < order.length; i++) {
            var color = order[i];

            createAnimation(color);
            
            await delay(1000);
        }        
    }

    test();    
}

    
     
function createAnimation(color) {
    var colorBox = $(`#${color}`);

    $(colorBox).addClass("pressed");

    setTimeout(function () {
        $(colorBox).removeClass("pressed");
    }, 100);
}

// function waitforme(millisec) {
//     return new Promise(resolve => {
//         setTimeout(() => { resolve('') }, millisec);
//     })