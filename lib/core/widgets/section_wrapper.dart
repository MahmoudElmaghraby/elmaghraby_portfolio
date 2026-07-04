import 'package:flutter/material.dart';
import '../constants/app_constants.dart';

class SectionWrapper extends StatelessWidget {
  final Widget child;

  const SectionWrapper({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: AppConstants.maxContentWidth),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppConstants.defaultPadding),
          child: child,
        ),
      ),
    );
  }
}
