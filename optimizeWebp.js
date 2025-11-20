const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Helper function to perform optimization on a single file
const processFile = async (file) => {
    const originalSize = fs.statSync(file).size;
    const outputBuffer = await sharp(file)
        .webp({ quality: 50 }) // Optimize with 80% quality
        .toBuffer();

    fs.writeFileSync(file, outputBuffer);
    const optimizedSize = fs.statSync(file).size;

    console.log(`Optimized: ${file} (Original: ${originalSize} bytes, Optimized: ${optimizedSize} bytes, Saved: ${originalSize - optimizedSize} bytes)`);
};

const optimizeWebp = async (filePath = null) => { // Added filePath parameter
    const assetPaths = [
        'src/assets/**/*.webp',
        'flutter_lib/assets/icons/**/*.webp'
    ];

    try {
        if (filePath) { // Optimize a single file if provided
            console.log(`Optimizing single file: ${filePath}`);
            await processFile(filePath);
            console.log('Single file WebP optimization complete!');
        } else { // Otherwise, optimize all files based on glob patterns
            console.log('Starting WebP optimization for all assets...');
            for (const pattern of assetPaths) {
                const files = glob.sync(pattern);

                for (const file of files) {
                    await processFile(file);
                }
            }
            console.log('WebP optimization complete!');
        }
    } catch (err) {
        console.error('Error during WebP optimization:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};

// Export the function for testing
module.exports = optimizeWebp;

// Run the function if the script is executed directly
if (require.main === module) {
    // This allows calling with an argument for a single file: `node optimizeWebp.js /path/to/file.webp`
    const singleFilePath = process.argv[2];
    optimizeWebp(singleFilePath).catch(error => {
        console.error('Failed to optimize WebP:', error);
        process.exit(1);
    });
}
