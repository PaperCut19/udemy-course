import express from "express";
import bodyParser from "body-parser";
import { create, phraseObject, arrayOfCards, checkHome } from "./create.js"
import { view } from "./view.js"
import { edit } from "./edit.js";
import { delete1 } from "./delete.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        phrase: phraseObject.phrase1,
        arrayOfCards1: arrayOfCards 
    });
})

app.post("/user-request", (req, res) => {
    activateAction(req, res);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

function activateAction(req1, res1) {
    if (checkHome(req1, res1)) {
        return;
    }

    if (req1.body["user-request1"] == "create" || phraseObject.state.startsWith("create")) {
        create(req1, res1);
    }
    else if (req1.body["user-request1"] == "view" || phraseObject.state.startsWith("view")) {
        view(req1, res1);
    }
    else if (req1.body["user-request1"] == "edit" || phraseObject.state.startsWith("edit")) {
        edit(req1, res1);
    }
    else if (req1.body["user-request1"] == "delete" || phraseObject.state.startsWith("delete")) {
        delete1(req1, res1);
    }
    else {
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards
        });
    }
}

