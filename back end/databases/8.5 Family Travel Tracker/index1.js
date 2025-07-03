import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "gyccof-rajwy0-pyccAx",
    port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
    { id: 1, name: "Angela", color: "teal" },
    { id: 2, name: "Jack", color: "powderblue" }
];

//CRIS/ we use this function to get back the country codes of every country that a user visited
async function checkVisited() {
    const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON user_id = users.id WHERE user_id = $1",
        [currentUserId]
    );

    // CRIS/ for every row, take the country_code value and add it to the countries array
    let countries = [];
    result.rows.forEach((country) => {
        countries.push(country.country_code)
    });

    return countries;
}

//CRIS/ this function gives the users array the current list of all users in the database and it also returns who the single current user is
async function getCurrentUser() {
    const result = await db.query("SELECT * FROM users");
    users = result.rows;

    return users.find((user) => user.id == currentUserId);
}

//CRIS/ GET home page
app.get("/", async (req, res) => {
    const countries = await checkVisited();
    const currentUser = await getCurrentUser();

    res.render("index1.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color
    });
});

//CRIS/ POST /user
app.post("/user", (req, res) => {

})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});