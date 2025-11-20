
const sharp = require('sharp');
const path = require('path');

const imagePath = path.resolve(__dirname, '../workleisure_restaurant_FE/public/WL.webp');

async function getImageMetadata() {
    try {
        const metadata = await sharp(imagePath).metadata();
        console.log('Image Metadata for WL.webp:', metadata);
    } catch (error) {
        console.error('Error getting image metadata:', error);
    }
}

getImageMetadata();
