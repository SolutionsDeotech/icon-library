const fs = require('fs');
const path = require('path');
const generateIconMaps = require('../generateIconMap'); // Import the exported function

// Mock fs module
jest.mock('fs', () => ({
  ...jest.requireActual('fs'), // Import and retain default behavior
  readdir: jest.fn(),
  writeFile: jest.fn((path, content, callback) => {
    // Immediately call the callback to simulate successful write
    callback(null);
  }),
}));

describe('generateIconMap', () => {
  const MOCK_ASSETS_DIR = path.join(__dirname, '../src/assets');
  const MOCK_ICON_MAP_JS_PATH = path.join(__dirname, '../src/iconMap.js');
  const MOCK_ICON_MAP_DART_PATH = path.join(__dirname, '../flutter_lib/lib/icon_map.dart');

  beforeEach(() => {
    // Clear all mocks before each test
    fs.readdir.mockClear();
    fs.writeFile.mockClear();
    // Mock console.log and console.error to prevent test output pollution
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks after each test
  });

  test('should generate iconMap.js and icon_map.dart correctly', async () => {
    // Mock asset files
    fs.readdir.mockImplementationOnce((dir, callback) => {
      if (dir === MOCK_ASSETS_DIR) {
        callback(null, ['icon1.webp', 'another-icon.png']);
      } else {
        callback(new Error('Unknown directory'), null);
      }
    });

    await generateIconMaps(); // Call the exported function

    // Assert that writeFile was called for iconMap.js
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_JS_PATH,
      expect.stringContaining('export const iconMap = {'),
      expect.any(Function)
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_JS_PATH,
      expect.stringContaining('"Icon1": \'./assets/icon1.webp\','),
      expect.any(Function)
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_JS_PATH,
      expect.stringContaining('"AnotherIcon": \'./assets/another-icon.png\','),
      expect.any(Function)
    );

    // Assert that writeFile was called for icon_map.dart
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_DART_PATH,
      expect.stringContaining('class IconMap {'),
      expect.any(Function)
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_DART_PATH,
      expect.stringContaining("  static const Map<String, String> iconMap = {"),
      expect.any(Function)
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_DART_PATH,
      expect.stringContaining("    'Icon1': 'assets/icons/icon1.webp',"),
      expect.any(Function)
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      MOCK_ICON_MAP_DART_PATH,
      expect.stringContaining("    'AnotherIcon': 'assets/icons/another-icon.png',"),
      expect.any(Function)
    );

    // Ensure both files were attempted to be written
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
  }, 10000); // Increase timeout to 10 seconds

  test('should handle errors when reading assets directory', async () => {
    const errorMessage = 'Permission denied';
    fs.readdir.mockImplementationOnce((dir, callback) => {
      if (dir === MOCK_ASSETS_DIR) {
        callback(new Error(errorMessage), null);
      } else {
        callback(null, []);
      }
    });

    await expect(generateIconMaps()).rejects.toThrow(errorMessage); // Expect the promise to reject
    expect(console.error).toHaveBeenCalledWith('Error reading assets directory:', expect.any(Error));
    expect(fs.writeFile).not.toHaveBeenCalled(); // No files should be written on readdir error
  });
});