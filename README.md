# MangaPDF
Takes in a bunch of images, de-noises them, and combines them into a single PDF.

Written in Typescript with Node.js. Uses [waifu2x](https://github.com/Tenpi/waifu2x) as the de-noiser, and [PDFKit](https://pdfkit.org/) to make PDFs.

By default, images are put into the ./input directory, upscaled and de-noised images are stored in the ./upscaled directory, and the final output will output in the ./output directory as output.pdf. This can all be changed in the main .ts file.


# Sample
You should probably download this image and view it, it takes a very long time to load and you can't even see the differences in this preview window.

![sample](sample-01.png)
