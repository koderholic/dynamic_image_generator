const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

/**
 * Generates an image based on a base image and an array of elements to add on top.
 * @param {string} basePath - The path to the base image.
 * @param {Array} elements - An array of elements to draw on the base image.
 * @param {string} outputPath - The path to save the generated image.
 */
const generateImage = async (basePath, elements, outputPath) => {
    const baseImage = await loadImage(basePath);
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the base image
    ctx.drawImage(baseImage, 0,0);

    // Iterate over elements and draw them
    for (const element of elements) {
        if (element.type === 'image') {
            const img = await loadImage(element.path);
            const position = positionTrait(element.traitType);
            ctx.drawImage(img, position.x, position.y, element.width, element.height);
        } else if (element.type === 'text') {
            ctx.font = element.font || '30px Arial';
            ctx.fillStyle = element.color || 'black';
            const position = positionTrait(element.traitType);
            ctx.fillText(element.text, position.x, position.y);
        }
        // Add more types as needed
    }

    const promise = new Promise((resolve, reject) => {
        const out = fs.createWriteStream(outputPath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish',resolve);
        out.on('error', reject)
    })

    return promise;
};

const positionTrait = (traitType) => {
    switch(traitType) {
        case 'head':
            return {x: 135, y: 20};
        case 'eye':
            return {x: 124, y: 100};
        default:
            return {x: 0, y: 0};
    }
}

module.exports = generateImage;
