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

function cat(path, pathAction) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.log(`Error reading file located at ${path}: ${error}`)
            process.exit(1);
        } else {
            readOrWrite(data, pathAction);
        }
    });
}

// Used in the step1, not for step 2
// cat('./one.txt');

/**
 * STEP2 - This is a filereader app for local files and web content
 * 
 * functions:
 *  webCat(url): Fetches and prints the contents of the web page at the given url.
 *   @param {string} url - The URL of the web page to read.
 * 
 */

async function webCat(url, pathAction) {
    try {
        let res = await axios.get(url);
        readOrWrite(res.data, pathAction);
    } catch (error) {
        console.log(`Error returning your requested url: ${url}: ${error}`);
        process.exit(1);
    }
}

// These variables will store the path for the file to read or write, and the action to execute (read or write)
let path;
let pathAction;

// Using the process.argv to get the file path from the command line arguments argv[2] will return the second argument passed in the command line
if (process.argv[2] === '--out') {
    path = process.argv[4];
    pathAction = process.argv[3];
} else {
    path = process.argv[2];
    pathAction = null;
}

if (path.slice(0, 5) === 'https') {
    webCat(path, pathAction);
} else {
    cat(path, pathAction);
}


/**
 * STEP 3 - readOrWrite
 * 
 * This function will either read a file or write to a file based on the provided path.
 * 
 * @param {string} text - The text to write to the file if a path is provided.
 * @param {string} pathAction - The path to the file to write to. If not provided, it will print the text to the console.
 */

function readOrWrite(text, pathAction) {
    if (pathAction) {
        fs.writeFile(pathAction, text, 'utf8', function (error) {
            if (error) {
                console.log(`Error in writing ${pathAction}: ${error}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}