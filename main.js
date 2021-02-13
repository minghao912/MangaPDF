const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Customizable Options
const inputPath = "./input", outputPath = "./output";
const validExtensions = [".png", ".jpg"];
const paperSize = "B6";
const paperSizePTS = [354, 498];

// Get files
console.log("> Checking input folder: " + inputPath);
const inputDirFiles = fs.readdirSync(inputPath);
let inputFiles = [];
inputDirFiles.forEach(file => {
    if (validExtensions.includes(file.substring(file.lastIndexOf("."))))
        inputFiles.push(file);
});

console.log("> Found the following files with valid extensions:");
console.log(inputFiles + '\n');

// No output needed
if (inputFiles.length == 0) {
    console.log("> No files found, terminating...");
    return;
}

// Create PDF
const doc = new PDFDocument({"autoFirstPage": false});
doc.pipe(fs.createWriteStream(outputPath + "/output.pdf"));

// Add images
inputFiles.forEach(image => {
    doc.addPage({size: paperSize});
    doc.image(inputPath + "/" + image, 0, 0, {fit: paperSizePTS, align: 'center', valign: 'center'});
})

doc.end();

console.log("> Done! Output in output folder " + outputPath);