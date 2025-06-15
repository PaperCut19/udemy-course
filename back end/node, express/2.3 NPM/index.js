// var generateName = require('sillyname');


import generateName from "sillyname";
import {randomSuperhero} from "superheroes";

var sillyName = generateName();
var superHero = randomSuperhero();

console.log(`My name is ${sillyName}`);

console.log(`My superhero name is... ${superHero}`);