
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagePath = path.resolve(__dirname, '../workleisure_restaurant_FE/public/WL.webp');
const tempPath = path.resolve(__dirname, '../workleisure_restaurant_FE/public/WL_temp.webp');

async function resizeWLLogo() {
    try {
        console.log(`Resizing logo: ${imagePath}`);
        const originalSize = fs.statSync(imagePath).size;
        const metadata = await sharp(imagePath).metadata();
        console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

        await sharp(imagePath)
            .resize({ width: 500 }) // Resize to 500px width, height will be auto-adjusted
            .toFile(tempPath);
        
        fs.renameSync(tempPath, imagePath); // Replace original with resized

        const resizedSize = fs.statSync(imagePath).size;
        const resizedMetadata = await sharp(imagePath).metadata();
        console.log(`Resized dimensions: ${resizedMetadata.width}x${resizedMetadata.height}`);
        console.log(`Resized WL.webp (Original: ${originalSize} bytes, Resized: ${resizedSize} bytes, Saved: ${originalSize - resizedSize} bytes)`);
        console.log('WL.webp resizing complete!');
    } catch (error) {
        console.error('Error resizing WL.webp:', error);
        process.exit(1);
    } finally {
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath); // Clean up temporary file
        }
    }
}

resizeWLLogo();
