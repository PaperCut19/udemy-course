import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName;

//these two pieces are considered 'middleware' which does the processing before the route handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bandNameGenerator);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req, res) => {
  res.send(`<h1>Here are your results!</h1> <h2>${bandName}`);
})

function bandNameGenerator(req, res, next) {
  var userInfo = req.body;
  bandName = `${userInfo['street']} ${userInfo['pet']}`;
  next();
}