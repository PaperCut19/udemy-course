import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion }); //CRIS/ when the home page is requested, we'll send the index.js file with the current question
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim(); //CRIS/ user data, we use trim to remove the spaces before and after
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) { //CRIS/ comparing the data to the answer
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion(); //CRIS/ creating the new question
  res.render("index.ejs", { //CRIS/ sending index.js file with the new question and updated score/counter
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() { //CRIS/ creating a function that can pick a random country
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
