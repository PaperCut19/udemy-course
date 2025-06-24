import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

//CRIS/ copying a postgres object, modifying it with the configuration information that it needs
//CRIS/ this postgres object is what we'll use to communicate with the database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "gyccof-rajwy0-pyccAx",
  port: 5432,
});

db.connect(); //CRIS/ connecting to database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.

  const result = await db.query("SELECT country_code FROM visited_countries"); //CRIS/ accessing the country_code column from the visited_countries table
  let countries = [];
  result.rows.forEach((country) => { //CRIS/ for each item in the array, take the country_code property value of the object and put it in the countries array we created
    countries.push(country.country_code);
  });

  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length }); //CRIS/ display the index.ejs file and send it two values, the countries array and the length of the countries array

  db.end(); //CRIS/ disconnect from the database
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
