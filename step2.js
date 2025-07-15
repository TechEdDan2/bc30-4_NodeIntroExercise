const fs = require('fs');
const process = require('process');
const axios = require('axios');

/**
 * STEP1 - This is a filereader app
 * 
 * The app will accept a file path and read the content. If there is an error, it will send the info to console and exit the process. Else, the information, or "data", will be printed in the terminal
 *  
 * 
 * Functions:
 *   cat(path): Reads and prints the contents of the file at the given path.
 *     @param {string} path - The path to the file to read.
 * 
 */

function cat(path) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.log(`Error reading file located at ${path}: ${error}`)
            process.exit(1);
        } else {
            console.log(data)
        }
    });
}

// Used in the step1, not for step 2
// cat('./one.txt');

/**
 * STEP2 - This is a filereader app for local files and 
 *  web content
 * 
 * functions:
 *  webCat(url): Fetches and prints the contents of the web page at the given url.
 *   @param {string} url - The URL of the web page to read.
 * 
 */

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (error) {
        console.log(`Error returning your requested url: ${url}: ${error}`);
        process.exit(1);
    }
}

// Using the process.argv to get the file path from the command line arguments argv[2] will return the second argument passed in the command line
let path = process.argv[2];

if (path.slice(0, 5) === 'https') {
    webCat(path);
} else {
    cat(path);
}
