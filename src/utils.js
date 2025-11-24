import { iconMap } from './iconMap';
console.log('iconMap loaded in utils.js:', iconMap);

const iconCache = {}; // Cache for storing resolved icon URLs

export function getIconUrl(iconName) {
  // Check if the icon URL is already in the cache
  if (iconCache[iconName]) {
    return iconCache[iconName];
  }

  const imageUrl = iconMap[iconName];
  if (!imageUrl) {
    console.warn(`Icon "${iconName}" not found in iconMap. Returning null.`);
    return null;
  }

  // Store the resolved URL in the cache before returning
  iconCache[iconName] = imageUrl;
  return imageUrl;
}
