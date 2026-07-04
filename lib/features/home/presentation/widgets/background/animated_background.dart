import 'dart:math';
import 'package:flutter/material.dart';
import '../../../../../core/constants/app_colors.dart';

class Particle {
  double x;
  double y;
  double dx;
  double dy;
  double radius;

  Particle({
    required this.x,
    required this.y,
    required this.dx,
    required this.dy,
    required this.radius,
  });
}

class AnimatedBackground extends StatefulWidget {
  const AnimatedBackground({super.key});

  @override
  State<AnimatedBackground> createState() => _AnimatedBackgroundState();
}

class _AnimatedBackgroundState extends State<AnimatedBackground>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<Particle> _particles = [];
  final Random _random = Random();
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..addListener(() {
        setState(() {}); // Trigger repaint
      });
    _controller.repeat();
  }

  void _initParticles(Size size) {
    if (_isInitialized) return;
    for (int i = 0; i < 50; i++) {
      _particles.add(
        Particle(
          x: _random.nextDouble() * size.width,
          y: _random.nextDouble() * size.height,
          dx: (_random.nextDouble() - 0.5) * 1.5, // Slow random speed X
          dy: (_random.nextDouble() - 0.5) * 1.5, // Slow random speed Y
          radius: _random.nextDouble() * 2 + 2, // Radius between 2 and 4
        ),
      );
    }
    _isInitialized = true;
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = Size(constraints.maxWidth, constraints.maxHeight);
        
        // Ensure we only initialize once constraints are available
        if (!_isInitialized && size.width > 0 && size.height > 0) {
          _initParticles(size);
        }
        
        // Update positions on every tick before painting
        for (var particle in _particles) {
          particle.x += particle.dx;
          particle.y += particle.dy;

          // Wrap around screen edges
          if (particle.x < 0) particle.x = size.width;
          if (particle.x > size.width) particle.x = 0;
          if (particle.y < 0) particle.y = size.height;
          if (particle.y > size.height) particle.y = 0;
        }

        return CustomPaint(
          size: Size.infinite,
          painter: _BackgroundPainter(particles: _particles),
        );
      },
    );
  }
}

class _BackgroundPainter extends CustomPainter {
  final List<Particle> particles;

  _BackgroundPainter({required this.particles});

  @override
  void paint(Canvas canvas, Size size) {
    // 1. Draw Faint Grid
    final Paint gridPaint = Paint()
      ..color = Colors.white.withOpacity(0.04) // Faint lines
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    const double gridSize = 50.0;
    
    for (double i = 0; i < size.width; i += gridSize) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), gridPaint);
    }
    for (double i = 0; i < size.height; i += gridSize) {
      canvas.drawLine(Offset(0, i), Offset(size.width, i), gridPaint);
    }

    // 2. Draw Glowing Particles
    final Paint particlePaint = Paint()
      ..color = AppColors.primary.withOpacity(0.8)
      ..style = PaintingStyle.fill
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3.0); // Subtle glow

    for (var particle in particles) {
      canvas.drawCircle(
        Offset(particle.x, particle.y),
        particle.radius,
        particlePaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _BackgroundPainter oldDelegate) => true;
}
