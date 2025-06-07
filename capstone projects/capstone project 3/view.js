import { arrayOfCards } from "./create.js";
import { phraseObject } from "./create.js";

export function view(req1, res1) {
    //checking if user typed view and we're at step 0
    //we're going to update the phrase and the state
    if (req1.body["user-request1"] == "view" && phraseObject.state == "step 0") {
        phraseObject.state = "view step 1";
        phraseObject.phrase1 = "What's the title of the blog post you want to view?";
        res1.render("index.ejs", { 
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards 
        });
    } //checking if we're at view step 1
    //we're going to collect the title that the user sent 
    else if (phraseObject.state == "view step 1") {
        phraseObject.title = req1.body["user-request1"];
        
        var matchedCard = compareTitles(phraseObject.title);
        if (matchedCard) { //if the user's data matches one of the card titles
            phraseObject.state = "view finished";
            phraseObject.phrase1 = "You can create, view, edit, and delete blog posts. Or type home to go back to home page"
            //we're going to send the user to a new EJS file that has the blog post they wanted
            res1.render("secondPage.ejs", {
                title: matchedCard.title,
                content: matchedCard.content,
                phrase: phraseObject.phrase1
            })
        }
        else { //if the user entered random information
            phraseObject.phrase1 = "Try again";
            res1.render("index.ejs", {
                phrase: phraseObject.phrase1,
                arrayOfCards1: arrayOfCards
            });
        }
    } //if the user entered random information
    else {
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards,
        });
    }
    //resetting the state of the phraseObject
    if (phraseObject.state == "view finished") {
        phraseObject.state = "step 0";
    }
}

export function compareTitles(userTitle) {
    var userTitle1 = userTitle;
    var matchedCard = arrayOfCards.find(card => card.title == userTitle1);

    return matchedCard;
}