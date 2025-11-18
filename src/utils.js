import { iconMap } from './iconMap';

export function getIconUrl(iconName) {
  const relativePath = iconMap[iconName];
  if (!relativePath) {
    console.warn(`Icon "${iconName}" not found in iconMap.`);
    return null;
  }
  // In a real-world scenario, you might need a more sophisticated way to resolve
  // the public path, especially if the library is consumed in different environments.
  // For a Vite-built library, assets referenced via relative paths in the source
  // will be handled by Vite's asset processing during the library build.
  // So, the relativePath itself should be sufficient for the consuming app to resolve.
  return `/${relativePath.replace('./', '')}`;
}
