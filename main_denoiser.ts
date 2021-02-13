import * as fs from 'fs';
import waifu2x from 'waifu2x';
import * as PDFDocument from 'pdfkit';

// Customizable Options
const inputPath = "./input", outputPath = "./output", upscaledPath = "./upscaled";
const paperSize = "B6";
const paperSizePTS: [number, number] = [354, 498];

// De-noise and upscale
async function denoise() {
    console.log("> Upscaling photos in folder: " + inputPath + ", output folder: " + outputPath);
    await waifu2x.upscaleImages(inputPath, upscaledPath, {recursive: true, noise: 3, scale: 2, mode: "noise"}, (current: number, total: number) => {
        console.log(`Current Image: ${current} of ${total}`);
    }).then(upscaledFiles => toPDF(upscaledFiles));
}

function toPDF(inputFiles: string[]): void {
    // Get files
    console.log("\n> Found the following files:");
    inputFiles.forEach(file => console.log(file));

    // Create PDF
    const doc = new PDFDocument({"autoFirstPage": false});
    doc.pipe(fs.createWriteStream(outputPath + "/output.pdf"));

    // Add images
    inputFiles.forEach(image => {
        doc.addPage({size: paperSize});
        doc.image(image, 0, 0, {fit: paperSizePTS, align: 'center', valign: 'center'});
    })

    doc.end();

    console.log("> Done! Output in output folder " + outputPath);
}

// Actually run it
denoise();