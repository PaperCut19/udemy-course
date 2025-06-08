import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.

//CRIS/ this is the axios piece of code that will interact with the server of the appbrewery website
app.get("/", async (req, res) => {
  try { //CRIS/ this try catch block will take care of any errors
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result }); //CRIS/ once we have the object with data, we'll use the keyword data and then our EJS file can use that keyword to access the object
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."

  try {
    //CRIS/ we'll turn the user's data into variables that we can put inside of the link that we'll use to get the data from the external website
    var activity = req.body["type"];
    var participants = req.body["participants"];

    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activity}&participants=${participants}`);
    const result = response.data;
    res.render("index.ejs", { data: result[Math.floor(Math.random() * result.length)] }); //CRIS/ using axios, we'll get back an array from the external website. We'll use Math.random to get a random object from that array
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "no activity that matches your request",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
