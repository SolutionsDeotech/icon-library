import 'package:flutter/material.dart';
import 'package:deotech_icon_library/icon_map.dart';

class DeotechIcon extends StatelessWidget {
  final String iconName;
  final double? width;
  final double? height;
  final Color? color;
  final BoxFit? fit;

  const DeotechIcon({
    Key? key,
    required this.iconName,
    this.width,
    this.height,
    this.color,
    this.fit,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final String? assetPath = IconMap.iconMap[iconName];

    if (assetPath == null) {
      // You can return a placeholder, an error icon, or throw an error
      // depending on your desired behavior.
      return SizedBox(
        width: width ?? 24,
        height: height ?? 24,
        child: const Placeholder(), // Or Icon(Icons.error)
      );
    }

    return Image(
      image: AssetImage(assetPath, package: 'deotech_icon_library'),
      width: width,
      height: height,
      color: color,
      fit: fit,
      errorBuilder: (context, error, stackTrace) {
        return SizedBox(
          width: width ?? 24,
          height: height ?? 24,
          child: const Placeholder(), // Fallback for image loading errors
        );
      },
    );
  }
}