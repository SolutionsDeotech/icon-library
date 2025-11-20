import { iconMap } from './iconMap';
console.log('iconMap loaded in utils.js:', iconMap);

const iconCache = {}; // Cache for storing resolved icon URLs

export function getIconUrl(iconName) {
  // Check if the icon URL is already in the cache
  if (iconCache[iconName]) {
    console.log(`Icon "${iconName}" found in cache.`);
    return iconCache[iconName];
  }

  const imageUrl = iconMap[iconName];
  if (!imageUrl) {
    console.warn(`Icon "${iconName}" not found in iconMap. Returning null.`);
    return null;
  }

  // Store the resolved URL in the cache before returning
  iconCache[iconName] = imageUrl;
  console.log(`Icon "${iconName}" resolved to "${imageUrl}" and cached.`);
  return imageUrl;
}
