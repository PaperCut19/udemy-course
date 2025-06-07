var randomNumber1 = Math.floor(Math.random() * 6);
var randomNumber2 = Math.floor(Math.random() * 6);

var listOfDices = ["./images/dice1.png", "./images/dice2.png", "./images/dice3.png", "./images/dice4.png", "./images/dice5.png", "./images/dice6.png"];

var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");

var randomDice1 = listOfDices[randomNumber1];
var randomDice2 = listOfDices[randomNumber2];

dice1.setAttribute("src", randomDice1);
dice2.setAttribute("src", randomDice2);

var heading = document.querySelector("h1");

if (randomNumber1 > randomNumber2) {
    heading.textContent = "Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    heading.textContent = "Player 2 Wins!";
} else {
    heading.textContent = "It's A Draw!";
}