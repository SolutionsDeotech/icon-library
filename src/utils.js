import { iconMap } from './iconMap';

export async function getIconUrl(iconName) {
  const importFunction = iconMap[iconName];
  if (!importFunction) {
    console.warn(`Icon "${iconName}" not found in iconMap or is not a valid import function.`);
    return null;
  }
  try {
    const module = await importFunction();
    return module.default;
  } catch (error) {
    console.error(`Error importing icon "${iconName}":`, error);
    return null;
  }
}
