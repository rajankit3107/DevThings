## Write to a file

Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

solution-

const fs = require('fs');

// Content to write to the file
const content = "This is the content that will be written to the file.";

// Write to a file
fs.writeFile('output.txt', content, (err) => {
if (err) {
console.error("Error writing to file:", err);
return;
}

console.log("Write operation completed. Check the output.txt file.");
});
