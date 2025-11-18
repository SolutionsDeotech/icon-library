const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

// Mock the external dependencies
jest.mock('glob');
jest.mock('fs');
jest.mock('sharp');

// Import the function to be tested
const optimizeWebp = require('../optimizeWebp');

describe('optimizeWebp', () => {
    const mockWebpFiles = [
        'src/assets/image1.webp',
        'flutter_lib/assets/icons/image2.webp',
    ];
    const optimizedBuffer = Buffer.from('optimized_image_data'); // Consistent optimized data

    let writtenFileSizes = {}; // To track sizes of written files

    beforeEach(() => {
        // Reset mocks before each test
        glob.sync.mockClear();
        fs.statSync.mockClear();
        fs.writeFileSync.mockClear();
        sharp.mockClear();
        writtenFileSizes = {}; // Clear for each test

        // Mock glob to return our test files
        glob.sync.mockImplementation((pattern) => {
            if (pattern.includes('src/assets')) {
                return mockWebpFiles.filter(f => f.startsWith('src/assets'));
            }
            if (pattern.includes('flutter_lib/assets/icons')) {
                return mockWebpFiles.filter(f => f.startsWith('flutter_lib/assets/icons'));
            }
            return [];
        });

        // Mock fs.statSync to return a dummy size, dynamically
        fs.statSync.mockImplementation((filePath) => {
            if (writtenFileSizes[filePath] !== undefined) {
                return { size: writtenFileSizes[filePath] };
            }
            if (filePath.includes('image1.webp')) {
                return { size: 10000 }; // Original size for image1
            }
            if (filePath.includes('image2.webp')) {
                return { size: 20000 }; // Original size for image2
            }
            return { size: 0 };
        });

        // Mock fs.writeFileSync to store the size of the written data
        fs.writeFileSync.mockImplementation((filePath, data) => {
            writtenFileSizes[filePath] = data.length;
        });

        // Mock sharp chainable methods
        const mockSharpInstance = {
            webp: jest.fn().mockReturnThis(),
            toBuffer: jest.fn(() => Promise.resolve(optimizedBuffer)),
        };
        sharp.mockReturnValue(mockSharpInstance);

        // Mock console.log and console.error to prevent cluttering test output
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore console mocks (log/error)
    });

    it('should call glob to find webp files in specified paths', async () => {
        await optimizeWebp();
        expect(glob.sync).toHaveBeenCalledWith('src/assets/**/*.webp');
        expect(glob.sync).toHaveBeenCalledWith('flutter_lib/assets/icons/**/*.webp');
    });

    it('should optimize each found webp file', async () => {
        await optimizeWebp();

        // Expect sharp to be called for each file
        expect(sharp).toHaveBeenCalledTimes(mockWebpFiles.length);
        expect(sharp).toHaveBeenCalledWith(mockWebpFiles[0]);
        expect(sharp).toHaveBeenCalledWith(mockWebpFiles[1]);

        // Expect webp and toBuffer to be called on sharp instance
        expect(sharp().webp).toHaveBeenCalledWith({ quality: 80 });
        expect(sharp().toBuffer).toHaveBeenCalledTimes(mockWebpFiles.length);
    });

    it('should overwrite the original file with optimized data', async () => {
        await optimizeWebp();

        expect(fs.writeFileSync).toHaveBeenCalledTimes(mockWebpFiles.length);
        expect(fs.writeFileSync).toHaveBeenCalledWith(mockWebpFiles[0], optimizedBuffer);
        expect(fs.writeFileSync).toHaveBeenCalledWith(mockWebpFiles[1], optimizedBuffer);
    });

    it('should log optimization details including saved bytes', async () => {
        await optimizeWebp();

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Optimized: src/assets/image1.webp (Original: 10000 bytes, Optimized: ${optimizedBuffer.length} bytes, Saved: ${10000 - optimizedBuffer.length} bytes)`));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Optimized: flutter_lib/assets/icons/image2.webp (Original: 20000 bytes, Optimized: ${optimizedBuffer.length} bytes, Saved: ${20000 - optimizedBuffer.length} bytes)`));
        expect(console.log).toHaveBeenCalledWith('WebP optimization complete!');
    });
});
