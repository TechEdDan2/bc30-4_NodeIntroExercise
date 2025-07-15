const fs = require('fs');
const process = require('process');

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

cat('./one.txt');