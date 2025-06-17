import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "travis";
const yourPassword = "phantom";
const yourAPIKey = "6aa6372f-85c7-4566-9237-89c7ee331408";
const yourBearerToken = "6986d151-66ca-470d-946b-445150eea483";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => { //CRIS/ the async is used so that the await keyword can be used below in the try catch block
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.

  try { //CRIS/ this try catch block will try to get information from the external server and will take care of any errors
    const result = await axios.get(API_URL + "/random"); //CRIS/ the await means that our server can go do other stuff while it's waiting to get the data
    res.render("index.ejs", { content: JSON.stringify(result.data) }); //CRIS/ once we have the object with data, we'll use the keyword data and then our EJS file can use that keyword to access the object
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

  //CRIS/ this config object can hold data that can be passed to the axios.get method. 
  //CRIS/ Inside the config object, we can include things like query parameters, token authentication, api keys, and basic authentication
  const config = {
    auth: {
      username: yourUsername,
      password: yourPassword
    }
  };

  try { //CRIS/ this try catch block will try to get information from the external server and will take care of any errors
    //CRIS/ the await means that our server can go do other stuff while it's waiting to get the data
    const result = await axios.get(API_URL + "/all?page=2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) }); //CRIS/ once we have the object with data, we'll use the keyword data and then our EJS file can use that keyword to access the object
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  const config = {
    params: {
      score: 5,
      apiKey: yourAPIKey
    }
  };

  //CRIS/ for query parameters, we can include it inside of the axios request by passing an object as one of the parameters
  try {
    const result = await axios.get(API_URL + "/filter", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  const config = {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    }
  };

  //CRIS/ we can pass an object with a key of headers and a value of our token
  try { //CRIS/ this try catch block will try to get information from the external server and will take care of any errors
    const result = await axios.get(API_URL + "/secrets/42", config); //CRIS/ the await means that our server can go do other stuff while it's waiting to get the data
    res.render("index.ejs", { content: JSON.stringify(result.data) }); //CRIS/ once we have the object with data, we'll use the keyword data and then our EJS file can use that keyword to access the object
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
