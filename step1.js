const fs = require('fs');
const process = require('process');

/**
 * STEP1 - 
 * 
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