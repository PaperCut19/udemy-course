import { arrayOfCards } from "./create.js";
import { phraseObject } from "./create.js";
import { compareTitles } from "./view.js";

export function edit(req1, res1) {
    if (req1.body["user-request1"] == "edit" && phraseObject.state == "step 0") {
        phraseObject.state = "edit step 1";
        phraseObject.phrase1 = "Pick a title";
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards
        });
    }
    else if (phraseObject.state == "edit step 1") {
        var matchedCard1 = compareTitles(req1.body["user-request1"]);

        if (matchedCard1) {
            phraseObject.state = "edit step 2";
            phraseObject.phrase1 = "What will the new content of the blog post be?";
            phraseObject.title = matchedCard1.title;

            res1.render("index.ejs", {
                phrase: phraseObject.phrase1,
                arrayOfCards1: arrayOfCards
            });
        }
        else {
            phraseObject.phrase1 = "Try again";
            res1.render("index.ejs", {
                phrase: phraseObject.phrase1,
                arrayOfCards1: arrayOfCards
            });
        }
    }
    else if (phraseObject.state == "edit step 2") {
        phraseObject.state = "edit finished";
        phraseObject.content = req1.body["user-request1"];
        var matchedCard1 = compareTitles(phraseObject.title);
        matchedCard1.content = phraseObject.content;
        phraseObject.phrase1 = "You can create, view, edit, and delete blog posts. Or type home to go back to home page"

        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards
        });
    }

    if (phraseObject.state == "edit finished") {
        phraseObject.state = "step 0";
    }
}

