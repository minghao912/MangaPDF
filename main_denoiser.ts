import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import waifu2x from 'waifu2x';

// Customizable Options
const inputPath = path.join(process.cwd(), "./input"), outputPath = path.join(process.cwd(), "./output"), upscaledPath = path.join(process.cwd(), "./upscaled");
const paperSize = "B6";
const paperSizePTS: [number, number] = [354, 498];

// De-noise and upscale
async function denoise() {
    console.log("> Upscaling photos in folder: " + inputPath + ", output folder: " + outputPath + ", intermediate folder: " + upscaledPath);
    await waifu2x.upscaleImages(inputPath, upscaledPath, null, (current: number, total: number) => {
        console.log(`Current Image: ${current} of ${total}`);
    }).then(upscaledFiles => toPDF(upscaledFiles), rejectReason => console.error(rejectReason));
    // Options: {recursive: true, rename: "", noise: 0, scale: 1.5, mode: "noise"}
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

    console.log("\n> Done! Output in output folder " + outputPath);
}

// Actually run it
denoise();