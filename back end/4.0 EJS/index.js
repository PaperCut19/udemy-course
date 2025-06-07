import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
var today;
var dayOfWeek;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// app.get("/", (req, res) => {
//     const today = new Date(2025, 4, 31);
//     const dayOfWeek = today.getDay(); // Returns 0 (Sunday) to 6 (Saturday)

//     let type = "a weekday";
//     let adv = "it's time work a hard";

//     if (dayOfWeek == 0 || dayOfWeek == 6) {
//         type = "a weekend";
//         adv = "it's time to party dawg";
//     };

//     res.render("index.ejs", {
//         dayType: type,
//         advice: adv
//     });
// })

app.get("/", figureOutDay);

function figureOutDay(req, res, next) {
    today = new Date();
    dayOfWeek = today.getDay(); // Returns 0 (Sunday) to 6 (Saturday)

    res.render("index.ejs", {
        dayType: returnData(dayOfWeek, "day"),
        advice: returnData(dayOfWeek, "advice")
    });
}

app.post("/submit", (req, res) => {
    var day1 = req.body["dayOfWeek1"];

    res.render("index.ejs", {
        dayType: returnData(day1, "day"),
        advice: returnData(day1, "advice")
    });
})

function returnData(dayOfWeek4, whichOne) {
    var dayType1 = "a weekday";
    var advice1 = "it's time work a hard";

    var dayOfWeek2 = dayOfWeek4;

    if (typeof dayOfWeek2 === "string") {
        dayOfWeek2 = dayOfWeek4.toLowerCase().trimEnd();
    };
    

    if ( dayOfWeek2 == 0 || dayOfWeek2 == "sunday") {
        dayType1 = "it's Serendipitous Sunday";
        advice1 = "every day is beautiful";
    } else if ( dayOfWeek2 == 1 || dayOfWeek2 == "monday") {
        dayType1 = "it's Money Monday";
        advice1 = "get that bread";
    } else if ( dayOfWeek2 == 2 || dayOfWeek2 == "tuesday") {
        dayType1 = "it's Taco Tuesday";
        advice1 = "Tacobell All Day! Live Mas";
    } else if ( dayOfWeek2 == 3 || dayOfWeek2 == "wednesday") {
        dayType1 = "it's Wackey Wednesday";
        advice1 = "you never know what to expect";
    } else if ( dayOfWeek2 == 4 || dayOfWeek2 == "thursday") {
        dayType1 = "it's Thankful Thursday";
        advice1 = "thanks for being there, bro";
    } else if ( dayOfWeek2 == 5 || dayOfWeek2 == "friday") {
        dayType1 = "it's Fancypants Friday";
        advice1 = "be fancy nancy yo";
    } else if ( dayOfWeek2 == 6 || dayOfWeek2 == "saturday") {
        dayType1 = "it's Soulmate Saturday";
        advice1 = "put a ring on it";    
    };

    var dayAndAdvice = [dayType1, advice1];

    if (whichOne == "day") {
        return dayAndAdvice[0];
    } else if (whichOne == "advice") {
        return dayAndAdvice[1];
    };

}