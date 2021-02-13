import * as fs from 'fs';
import * as path from 'path';
import waifu2x from 'waifu2x';
import * as PDFDocument from 'pdfkit';

// Customizable Options
const inputPath = path.join(process.cwd(), "./input"), outputPath = path.join(process.cwd(), "./output"), upscaledPath = path.join(process.cwd(), "./upscaled");
const paperSize = "B6";
const paperSizePTS: [number, number] = [354, 498];

// De-noise and upscale
async function denoise() {
    console.log("> Upscaling photos in folder: " + inputPath + ", output folder: " + outputPath + ", intermediate folder: " + upscaledPath);
    await waifu2x.upscaleImages(inputPath, upscaledPath, {recursive: true, rename: "", noise: 3, scale: 2, mode: "noise"}, (current: number, total: number) => {
        console.log(`Current Image: ${current} of ${total}`);
    }).then(() => toPDF());
}

function toPDF(): void {
    // Get files
    let inputFiles = fs.readdirSync(upscaledPath);
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