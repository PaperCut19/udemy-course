export var phraseObject = {
    phrase1: "You can create, view, edit, and delete blog posts. Or type home to go back to home page",
    title: "title",
    content: "content",
    state: "step 0"
};

var card1 = {
    title: "Hello World",
    content: "Dreams are made of this"
};

export var arrayOfCards = [card1];


export function create(req1, res1) {
    if (req1.body["user-request1"] == "create" && phraseObject.state == "step 0") {
        phraseObject.state = "create step 1";
        phraseObject.phrase1 = "Pick a title";
        res1.render("index.ejs", { 
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards 
        });
    } 
    else if (phraseObject.state == "create step 1") {
        phraseObject.state = "create step 2";
        phraseObject.title = req1.body["user-request1"];
        phraseObject.phrase1 = "Write the content of the blog";
        res1.render("index.ejs", { 
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards 
        });
    }
    else if (phraseObject.state == "create step 2") {
        phraseObject.state = "create finished";
        phraseObject.content = req1.body["user-request1"];
        phraseObject.phrase1 = "You can create, view, edit, and delete blog posts. Or type home to go back to home page";
        
        var newCard = {
            title: phraseObject.title,
            content: phraseObject.content
        }

        arrayOfCards.push(newCard);
        
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards,
        });
    }
    else {
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards,
        });
    }

    if (phraseObject.state == "create finished") {
        phraseObject.state = "step 0";
    }
}

export function checkHome(req1, res1) {
    if (req1.body["user-request1"] == "home") {
        phraseObject.state = "step 0";
        phraseObject.phrase1 = "You can create, view, edit, and delete blog posts. Or type home to go back to home page"
        res1.render("index.ejs", {
            phrase: phraseObject.phrase1,
            arrayOfCards1: arrayOfCards
        });
        return true;
    };
}