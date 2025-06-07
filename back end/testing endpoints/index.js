import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>this is the home page</h1>");
})

app.get("/contact", (req, res) => {
    res.send("<h1>this is the contact page</h1>");
})

app.get("/about", (req, res) => {
    res.send("<h1>this is the about page</h1>");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});