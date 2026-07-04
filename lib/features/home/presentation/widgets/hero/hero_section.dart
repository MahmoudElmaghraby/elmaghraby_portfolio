import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../../../core/constants/app_colors.dart';
import '../../../../../core/constants/app_strings.dart';
import '../../../../../core/widgets/section_wrapper.dart';

class HeroSection extends StatelessWidget {
  const HeroSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SectionWrapper(
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isDesktop = constraints.maxWidth > 900;
          
          return isDesktop
              ? Padding(
                padding: const EdgeInsets.only(top: 100),
                child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        flex: 5,
                        child: _buildTextContent(isMobile: false),
                      ),
                      Expanded(
                        flex: 3,
                        child: _buildImageContent(),
                      ),
                    ],
                  ),
              )
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    _buildImageContent(),
                    const SizedBox(height: 40),
                    _buildTextContent(isMobile: true),
                  ],
                );
        },
      ),
    );
  }

  Widget _buildTextContent({required bool isMobile}) {
    return Column(
      crossAxisAlignment: isMobile
          ? CrossAxisAlignment.center
          : CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          AppStrings.heroPreTitle,
          style: const TextStyle(color: AppColors.secondaryText, fontSize: 18),
          textAlign: isMobile ? TextAlign.center : TextAlign.left,
        ),
        const SizedBox(height: 16),
        Text.rich(
          TextSpan(
            children: [

              TextSpan(
                text: '${AppStrings.heroName.split(' ')[0]} ',
                style: const TextStyle(color: AppColors.primaryText),
              ),
              TextSpan(
                text: AppStrings.heroName.split(' ')[1],
                style: const TextStyle(color: AppColors.primary),
              ),
            ],
          ),
          style: TextStyle(
            fontSize: isMobile ? 48 : 64,
            fontWeight: FontWeight.bold,
            height: 1.1,
          ),
          textAlign: isMobile ? TextAlign.center : TextAlign.left,
        ),
        const SizedBox(height: 16),
        Text(
          AppStrings.heroSubtitle,
          style: TextStyle(
            color: AppColors.primaryText,
            fontSize: isMobile ? 20 : 28,
            fontWeight: FontWeight.w500,
          ),
          textAlign: isMobile ? TextAlign.center : TextAlign.left,
        ),
        const SizedBox(height: 24),
        Text(
          AppStrings.heroDescription,
          style: const TextStyle(
            color: AppColors.secondaryText,
            fontSize: 18,
            height: 1.5,
          ),
          textAlign: isMobile ? TextAlign.center : TextAlign.left,
        ),
        const SizedBox(height: 48),
        Wrap(
          spacing: 16,
          runSpacing: 16,
          alignment: isMobile ? WrapAlignment.center : WrapAlignment.start,
          children: [
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: AppColors.primaryText,
                padding: const EdgeInsets.symmetric(
                  horizontal: 32,
                  vertical: 20,
                ),
                textStyle: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              child: const Text(AppStrings.btnViewProjects),
            ),
            OutlinedButton(
              onPressed: () async {
                final Uri url = Uri.parse(AppStrings.resumeUrl);
                await launchUrl(url, webOnlyWindowName: '_blank');
              },
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.primaryText,
                side: const BorderSide(color: AppColors.primaryText, width: 2),
                padding: const EdgeInsets.symmetric(
                  horizontal: 32,
                  vertical: 20,
                ),
                textStyle: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              child: const Text(AppStrings.btnResume),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: isMobile
              ? MainAxisAlignment.center
              : MainAxisAlignment.start,
          children: [
            IconButton(
              icon: const FaIcon(FontAwesomeIcons.github),
              iconSize: 20,
              color: AppColors.secondaryText,
              onPressed: () {
                launchUrl(Uri.parse(AppStrings.githubUrl));
              },
            ),
            const SizedBox(width: 8),
            IconButton(
              icon: const FaIcon(FontAwesomeIcons.linkedinIn),
              iconSize: 20,
              color: AppColors.secondaryText,
              onPressed: () {
                launchUrl(Uri.parse(AppStrings.linkedinUrl));
              },
            ),
            const SizedBox(width: 8),
            IconButton(
              icon: const Icon(Icons.email_outlined),
              iconSize: 20,
              color: AppColors.secondaryText,
              onPressed: () async {
                final Uri emailUri = Uri.parse(AppStrings.emailAddress);
                if (await canLaunchUrl(emailUri)) {
                  await launchUrl(emailUri, webOnlyWindowName: '_self');
                }
              },
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildImageContent() {
    return Center(
      child: Container(
        width: 350,
        height: 350,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withOpacity(0.3),
              blurRadius: 60,
              spreadRadius: 20,
            ),
          ],
        ),
        child: const CircleAvatar(
          backgroundColor: AppColors.cardBackground,
          backgroundImage: AssetImage('assets/images/profile_pic.jpeg'),
          radius: 175,
        ),
      ),
    );
  }
}
