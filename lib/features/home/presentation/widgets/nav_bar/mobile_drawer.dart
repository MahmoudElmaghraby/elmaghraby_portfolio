import 'package:flutter/material.dart';
import '../../../../../core/constants/app_colors.dart';
import '../../../../../core/constants/app_strings.dart';
import 'package:url_launcher/url_launcher.dart';

class MobileDrawer extends StatelessWidget {
  const MobileDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.background,
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.white10)),
            ),
            child: const Align(
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
          ),
          _buildDrawerItem(AppStrings.navProjects),
          _buildDrawerItem(AppStrings.navAbout),
          _buildDrawerItem(AppStrings.navSkills),
          _buildDrawerItem(AppStrings.navExperience),
          _buildDrawerItem(AppStrings.navContact),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: OutlinedButton.icon(
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
          ),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(String title) {
    return ListTile(
      title: Text(
        title,
        style: const TextStyle(color: AppColors.secondaryText, fontSize: 16),
      ),
      onTap: () {
        // Handle navigation later
      },
    );
  }
}
