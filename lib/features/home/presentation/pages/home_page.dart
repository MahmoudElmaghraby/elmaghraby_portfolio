import 'package:flutter/material.dart';
import '../widgets/hero/hero_section.dart';
import '../widgets/background/animated_background.dart';
import '../widgets/nav_bar/nav_bar.dart';
import '../widgets/nav_bar/mobile_drawer.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      endDrawer: const MobileDrawer(),
      body: Stack(
        children: [
          // Layer 1: Animated Background
          const AnimatedBackground(),
          
          // Layer 2: Scrollable Content
          Positioned.fill(
            child: SingleChildScrollView(
              child: Column(
                children: const [
                  SizedBox(height: 100), // Push content below NavBar
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: 40),
                    child: HeroSection(),
                  ),
                ],
              ),
            ),
          ),
          
          // Layer 3: Sticky NavBar
          const Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: NavBar(),
          ),
        ],
      ),
    );
  }
}
