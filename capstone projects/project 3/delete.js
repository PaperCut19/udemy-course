import { arrayOfCards } from "./create.js";
import { phraseObject } from "./create.js";
import { compareTitles } from "./view.js";

export function delete1(req1, res1) {
    if (req1.body["user-request1"] == "delete" && phraseObject.state == "step 0") {
        phraseObject.state = "delete step 1";
        phraseObject.phrase1 = "Pick a title";
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards
        });
    }
    else if (phraseObject.state == "delete step 1") {
        phraseObject.title = req1.body["user-request1"];
        var matchedCard = compareTitles(phraseObject.title);

        //checking if the title matches a card in the array
        if (matchedCard) {
            phraseObject.state = "delete finished";
            phraseObject.phrase1 = "You can create, view, edit, and delete blog posts. Or type home to go back to home page";

            var index = arrayOfCards.findIndex(card => card == matchedCard);
            if (index != -1) {
                arrayOfCards.splice(index, 1); //deleting the card in the array
            }
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
    //if the user entered random information
    else {
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards,
        });
    }

    //resetting the state of the phraseObject
    if (phraseObject.state == "delete finished") {
        phraseObject.state = "step 0";
    }
}

