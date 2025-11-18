const { getIconUrl } = require('../src/utils');
const { iconMap } = require('../src/iconMap'); // Assuming iconMap is generated and available

// Mock iconMap for testing purposes
jest.mock('../src/iconMap', () => ({
  iconMap: {
    'TestIcon': './assets/test-icon.webp',
    'AnotherTestIcon': './assets/another-test-icon.png',
  },
}));

describe('getIconUrl', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // Mock console.warn
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks after each test
  });

  test('should return the correct URL for an existing icon', () => {
    const url = getIconUrl('TestIcon');
    expect(url).toBe('./assets/test-icon.webp');
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('should return the correct URL for another existing icon', () => {
    const url = getIconUrl('AnotherTestIcon');
    expect(url).toBe('./assets/another-test-icon.png');
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('should return null and log a warning for a non-existent icon', () => {
    const url = getIconUrl('NonExistentIcon');
    expect(url).toBeNull();
    expect(console.warn).toHaveBeenCalledWith('Icon "NonExistentIcon" not found in iconMap.');
  });
});
