# @deotech-solutions/icon-library

## Project Overview

The `@deotech-solutions/icon-library` is a comprehensive, framework-agnostic solution designed to centralize and manage custom icons for Restaurant and Booking applications/CMS. Our primary goal is to provide a consistent and easily consumable set of visual assets across various platforms, including web (JavaScript/React) and mobile (Flutter).

**Key Features:**

*   **Centralized Icon Management**: All custom icons are maintained in a single repository, ensuring consistency and ease of updates.
*   **Automated Asset Processing**: A dedicated script (`generateIconMap.js`) automatically processes raw SVG/image files from the `src/assets` directory. It converts filenames into PascalCase icon names and generates platform-specific mapping files.
*   **Dual-Environment Support**: The library provides distinct outputs tailored for:
    *   **JavaScript/Web Environments**: An `iconMap.js` file containing icon names mapped to their relative asset paths, suitable for use in React, Vue, Angular, or plain JavaScript applications.
    *   **Flutter Environments**: A `icon_map.dart` file and bundled assets, allowing seamless integration into Flutter mobile applications.
*   **Framework-Agnostic Design**: While examples are provided for React and Flutter, the core library provides raw asset paths, allowing developers to integrate icons into any framework or environment using their preferred asset loading mechanisms.

This automated approach ensures that once an icon is added to the `src/assets` folder, it becomes available across all consuming applications with minimal manual intervention.



## Installation

This library is designed to be consumed as a published package.

### For JavaScript/Web Projects (via npm)

To install the library in your JavaScript or web-based project (e.g., React, Vue, Angular):

```bash
npm install @deotech-solutions/icon-library
# or
yarn add @deotech-solutions/icon-library
```

### For Flutter Projects (via pub.dev)

To use this library in your Flutter application, add it as a dependency in your `pubspec.yaml` file:

```yaml
dependencies:
  # ... other dependencies
  deotech_icon_library: ^1.0.0 # Use the latest version available on pub.dev
```

After adding the dependency, run `flutter pub get` in your project's root directory.

## Usage

This library exports `iconMap` (a mapping of icon names to their asset paths) and `getIconUrl` (a utility function to retrieve an icon's URL). It is designed to be consumed by framework-specific wrapper components in your application.

### Generic Usage

You can use `iconMap` and `getIconUrl` directly in any JavaScript environment.

```javascript
import { iconMap, getIconUrl } from '@deotech-solutions/icon-library';

// To get the URL for a specific icon
const iconName = 'Icon247Acess'; // Use the exact PascalCase name
const iconRelativePath = getIconUrl(iconName);

if (iconRelativePath) {
  console.log(`Relative path for ${iconName}: ${iconRelativePath}`);
  // In a web environment, you would typically combine this with your base URL
  // or handle asset loading based on your build setup.
  // Example for a web project (assuming assets are served from /dist/assets):
  const fullIconUrl = `/dist/assets/${iconRelativePath}`;
  console.log(`Full URL for ${iconName}: ${fullIconUrl}`);

  // You can also iterate through all available icons
  console.log('All available icons:');
  for (const name in iconMap) {
    console.log(`- ${name}: ${iconMap[name]}`);
  }
} else {
  console.log(`Icon "${iconName}" not found.`);
}
```

This library provides the mapping and utility to get the relative path to the icon asset. How you load and display these assets (e.g., using `<img>` tags, CSS `background-image`, or framework-specific components) is up to your application's architecture.

### Flutter Usage

This library provides a Dart-compatible `icon_map.dart` and the icon assets for use in Flutter applications. When installed via pub.dev, the `deotech_icon_library` package includes everything you need.

#### 1. Declare Assets

In your Flutter project's `pubspec.yaml`, declare the icon assets. This step is crucial for Flutter to correctly bundle and locate the icons from the package:

```yaml
flutter:
  uses-material-design: true
  assets:
    - packages/deotech_icon_library/assets/icons/
```

#### 2. Use in Flutter

The `deotech_icon_library` package provides a `DeotechIcon` widget for easier consumption of the icons. This widget handles the loading and display of the icons from the package's assets.

```dart
import 'package:flutter/material.dart';
import 'package:deotech_icon_library/deotech_icon.dart'; // Import the DeotechIcon widget from the package

class MyFlutterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DeotechIcon(iconName: 'Icon247Acess', width: 24, height: 24, color: Colors.blue),
        DeotechIcon(iconName: 'IconCoffee', width: 32, height: 32, color: Colors.brown),
        // Use the exact PascalCase name generated for each icon.
        // Refer to the icon_map.dart file within the installed package for a complete list.
      ],
    );
  }
}
```



### Available Icons

Refer to the `src/iconMap.js` file within the package (or the `node_modules/@deotech-solutions/icon-library/src/iconMap.js` after installation) for a complete list of available icon names. Each key in the `iconMap` object represents an icon name that can be passed to the `name` prop of your custom `Icon` component.

## Contribution Guidelines

We welcome contributions to the `@deotech-solutions/icon-library`! By contributing, you help us maintain a rich and consistent icon set across all Workleisure applications.

### How to Contribute

1.  **Fork the Repository**: Start by forking the `workleisure_icon_library` repository to your GitHub account.
2.  **Clone Your Fork**: Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/your-username/workleisure_icon_library.git
    cd workleisure_icon_library
    ```
3.  **Install Dependencies**: Install the necessary Node.js dependencies.
    ```bash
    npm install
    ```
4.  **Create a New Branch**: Create a new branch for your feature or bug fix.
    ```bash
    git checkout -b feature/your-feature-name
    ```

### Adding New Icons

To add a new icon:

1.  **Prepare Your SVG/Image File**:
    *   Ensure your icon is in a supported format (e.g., SVG, PNG, WEBP).
    *   Place the icon file in the `src/assets/` directory.
    *   **Naming Convention**: Name your file descriptively using `kebab-case` or `snake_case`. The `generateIconMap.js` script will automatically convert this to `PascalCase` for the icon name in the `iconMap`. For example, `my-new-icon.svg` will become `MyNewIcon`.
2.  **Run the Icon Map Generator**: After adding your new icon(s), run the generation script to update `iconMap.js` and `icon_map.dart`. This script also copies the assets to the Flutter library.
    ```bash
    npm run generate:icons
    ```
3.  **Verify**: Check `src/iconMap.js` and `flutter_lib/lib/icon_map.dart` to ensure your new icon is correctly listed.

### Updating Existing Icons

To update an existing icon, simply replace the corresponding file in `src/assets/` with the new version (keeping the same filename). Then, run `npm run generate:icons` to ensure the changes are reflected in the generated maps.

### Running Tests

Before submitting a pull request, please ensure all tests pass.

```bash
npm test
```

### Submitting a Pull Request

1.  **Commit Your Changes**: Commit your changes with a clear and concise commit message.
    ```bash
    git commit -m "feat: Add new icon MyNewIcon"
    ```
2.  **Push to Your Fork**: Push your changes to your forked repository.
    ```bash
    git push origin feature/your-feature-name
    ```
3.  **Create a Pull Request**: Open a pull request from your fork to the `main` branch of the original repository. Provide a detailed description of your changes.

### Code Style

Please adhere to the existing code style. We use Prettier for code formatting.

## Publishing

This library is designed for multi-platform distribution, with packages published to both npm (for JavaScript/Web environments) and pub.dev (for Flutter environments).

### Versioning

We follow Semantic Versioning (SemVer) for releases. All changes are documented in the `CHANGELOG.md` file.

### How to Publish (Maintainers Only)

Publishing new versions requires maintainer access to both npm and pub.dev.

1.  **Update Version**: Increment the version number according to SemVer guidelines. Update the `version` field in `package.json` (for npm) and `pubspec.yaml` (for pub.dev). Ensure these versions are synchronized.
2.  **Build & Generate Icons**: Ensure the library is built and icon maps are generated for both platforms.
    ```bash
    npm run build
    npm run generate:icons # Ensure latest assets are copied and maps generated
    ```
3.  **Publish to npm**:
    ```bash
    npm publish --access public
    ```
4.  **Publish to pub.dev**:
    ```bash
    cd flutter_lib
    flutter pub publish
    ```
    Follow the prompts and ensure the package is successfully uploaded.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.