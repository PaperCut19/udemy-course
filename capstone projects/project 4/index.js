import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const URL = "https://amiiboapi.com/api/amiibo/?id=";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/link", async (req, res) => {
    const id = "0100000004180902";

    try {
        const result = await axios.get(URL + id);

        res.render("index.ejs", {
            name: result.data.amiibo.character,
            image: result.data.amiibo.image
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong");
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});