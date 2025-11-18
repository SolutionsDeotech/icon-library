const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const optimizeWebp = async () => {
    const assetPaths = [
        'src/assets/**/*.webp',
        'flutter_lib/assets/icons/**/*.webp'
    ];

    try {
        for (const pattern of assetPaths) {
            const files = glob.sync(pattern);

            for (const file of files) {
                const originalSize = fs.statSync(file).size;
                const outputBuffer = await sharp(file)
                    .webp({ quality: 80 }) // Optimize with 80% quality
                    .toBuffer();
                
                fs.writeFileSync(file, outputBuffer);
                const optimizedSize = fs.statSync(file).size;

                console.log(`Optimized: ${file} (Original: ${originalSize} bytes, Optimized: ${optimizedSize} bytes, Saved: ${originalSize - optimizedSize} bytes)`);
            }
        }
        console.log('WebP optimization complete!');
    } catch (err) {
        console.error('Error during WebP optimization:', err);
        process.exit(1); // This will now be caught by the mock in the test
    }
};

// Export the function for testing
module.exports = optimizeWebp;

// Run the function if the script is executed directly
if (require.main === module) {
    optimizeWebp(); // The function now handles its own errors
}
