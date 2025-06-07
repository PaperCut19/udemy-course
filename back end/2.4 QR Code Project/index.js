/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image'
 


inquirer
    .prompt([
        /* Pass your questions in here */
        {
            message: "type a URL in here",
            name: "userAnswer",
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        var userAnswer1 = answers.userAnswer;

        var qr_png = qr.image(userAnswer1);
        qr_png.pipe(fs.createWriteStream('qr-image.png'));
        fs.writeFile("url.txt", userAnswer1, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log("error");
        } else {
            // Something else went wrong
            console.log("error1");
        }
    });