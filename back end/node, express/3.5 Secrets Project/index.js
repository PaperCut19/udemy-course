//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userCorrect = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
  userCorrect = false;
})

app.post("/check", passwordChecker, (req, res) => {
    if (userCorrect) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
    }
})

function passwordChecker(req, res, next) {
    var userInfo = req.body;
    
    if (userInfo.password == "BatmanRules") {
        userCorrect = true;
    };

    console.log(req.body);
    next();
}