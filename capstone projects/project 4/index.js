import express from "express";
import axios from "axios";
import { characterDescriptions } from "./descriptions.js"

const app = express();
const port = 3000;

const URL = "https://amiiboapi.com/api/amiibo/?id=";

app.use(express.static("public"));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});


//if the user clicks on "Link" the character from "Zelda Tears of the Kingdom"
app.post("/link", async (req, res) => { //we use async and await to make sure the app doesn't freeze when we're trying to get the data from the external server
    const id = "0100000004180902"; //we'll attach this to the URL to get the exact amiibo from the website

    try { //will use axios to communicate with external server
        const result = await axios.get(URL + id);

        res.render("index.ejs", { //this will generate an html file with the data that we pass it
            name: result.data.amiibo.name,
            image: result.data.amiibo.image,
            API_info: JSON.stringify(result.data),
            description: characterDescriptions.link
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong");
    }

});

//if the user clicks on zelda
app.post("/zelda", async (req, res) => {
    const id = "0101000004190902";

    try {
        const result = await axios.get(URL + id);

        res.render("index.ejs", {
            name: result.data.amiibo.name,
            image: result.data.amiibo.image,
            API_info: JSON.stringify(result.data),
            description: characterDescriptions.zelda
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong");
    }

});

//if the user clicks on samus
app.post("/samus", async (req, res) => {
    const id = "05C0000004121302";

    try {
        const result = await axios.get(URL + id);

        res.render("index.ejs", {
            name: result.data.amiibo.name,
            image: result.data.amiibo.image,
            API_info: JSON.stringify(result.data),
            description: characterDescriptions.samus
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong");
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});