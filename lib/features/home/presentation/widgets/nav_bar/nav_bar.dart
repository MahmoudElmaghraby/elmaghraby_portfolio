import 'dart:ui';
import 'package:flutter/material.dart';
import '../../../../../core/constants/app_colors.dart';
import '../../../../../core/constants/app_strings.dart';
import '../../../../../core/widgets/section_wrapper.dart';
import 'package:url_launcher/url_launcher.dart';

class NavBar extends StatelessWidget {
  const NavBar({super.key});

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final bool isDesktop = screenWidth > 1050;

    return ClipRRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
        child: Container(
          height: 80,
          color: const Color(0xFF0F0F0F).withOpacity(0.2), // Frosted glass tint
          child: SectionWrapper(
            child: Stack(
            alignment: Alignment.center,
            children: [
              // Left: Logo
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  AppStrings.logoText,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              
              // Center: Navigation Links (Desktop Only)
              if (isDesktop)
                const Align(
                  alignment: Alignment.center,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _NavBarItem(title: AppStrings.navProjects),
                      _NavBarItem(title: AppStrings.navAbout),
                      _NavBarItem(title: AppStrings.navSkills),
                      _NavBarItem(title: AppStrings.navExperience),
                      _NavBarItem(title: AppStrings.navContact),
                    ],
                  ),
                ),
                
              // Right: Buttons
              Align(
                alignment: Alignment.centerRight,
                child: isDesktop
                    ? OutlinedButton.icon(
                        onPressed: () async {
                          final Uri url = Uri.parse(AppStrings.resumeUrl);
                          await launchUrl(url, webOnlyWindowName: '_blank');
                        },
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppColors.primary,
                          side: const BorderSide(color: AppColors.primary),
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                          textStyle: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        icon: const Icon(Icons.arrow_outward, size: 16),
                        label: const Text(AppStrings.btnResume),
                      )
                    : Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          OutlinedButton.icon(
                            onPressed: () async {
                              final Uri url = Uri.parse(AppStrings.resumeUrl);
                              await launchUrl(url, webOnlyWindowName: '_blank');
                            },
                            style: OutlinedButton.styleFrom(
                              foregroundColor: AppColors.primary,
                              side: const BorderSide(color: AppColors.primary),
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                              textStyle: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            icon: const Icon(Icons.arrow_outward, size: 14),
                            label: const Text(AppStrings.btnResume),
                          ),
                          const SizedBox(width: 16),
                          IconButton(
                            onPressed: () {
                              Scaffold.of(context).openEndDrawer();
                            },
                            icon: const Icon(Icons.menu, color: Colors.white),
                          ),
                        ],
                      ),
              ),
            ],
          ),
          ),
        ),
      ),
    );
  }
}

class _NavBarItem extends StatelessWidget {
  final String title;

  const _NavBarItem({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: TextButton(
        onPressed: () {},
        style: TextButton.styleFrom(
          foregroundColor: AppColors.secondaryText,
        ),
        child: Text(
          title,
          style: const TextStyle(fontSize: 16),
        ),
      ),
    );
  }
}
