import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class CoursesScreen extends StatelessWidget {
  const CoursesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.go('/courses/new'),
        backgroundColor: const Color(0xFF5A8D5E),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                hintText: 'Search classes...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                filled: true,
                fillColor: Colors.grey.shade50,
              ),
            ),
            const SizedBox(height: 24),
            Expanded(
              child: ListView(
                children: const [
                  _CourseCard(name: 'Hatha Flow', instructor: 'Amisha', time: 'Tue 6:30 PM', capacity: 20, enrolled: 18, status: 'Active'),
                  _CourseCard(name: 'Vinyasa', instructor: 'James', time: 'Wed 7:00 AM', capacity: 15, enrolled: 15, status: 'Full'),
                  _CourseCard(name: 'Meditation', instructor: 'Sarah', time: 'Thu 8:00 PM', capacity: 30, enrolled: 10, status: 'Active'),
                  _CourseCard(name: 'Breathwork', instructor: 'Amisha', time: 'Fri 7:00 AM', capacity: 20, enrolled: 5, status: 'Active'),
                  _CourseCard(name: 'Corporate Yoga', instructor: 'David', time: 'Mon 12:00 PM', capacity: 50, enrolled: 45, status: 'Active'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CourseCard extends StatelessWidget {
  final String name;
  final String instructor;
  final String time;
  final int capacity;
  final int enrolled;
  final String status;

  const _CourseCard({
    required this.name,
    required this.instructor,
    required this.time,
    required this.capacity,
    required this.enrolled,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    final isFull = status == 'Full' || enrolled >= capacity;
    final statusColor = isFull ? Colors.red : (status == 'Active' ? Colors.green : Colors.grey);

    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Chip(
                  label: Text(isFull ? 'Full' : status, style: TextStyle(color: statusColor, fontWeight: FontWeight.bold)),
                  backgroundColor: statusColor.withValues(alpha: 0.1),
                  side: BorderSide.none,
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.person, size: 16, color: Colors.grey),
                const SizedBox(width: 4),
                Text(instructor, style: const TextStyle(color: Colors.grey)),
                const SizedBox(width: 16),
                const Icon(Icons.access_time, size: 16, color: Colors.grey),
                const SizedBox(width: 4),
                Text(time, style: const TextStyle(color: Colors.grey)),
              ],
            ),
            const SizedBox(height: 12),
            LinearProgressIndicator(
              value: enrolled / capacity,
              backgroundColor: Colors.grey.shade200,
              color: isFull ? Colors.red : const Color(0xFF5A8D5E),
            ),
            const SizedBox(height: 8),
            Text('$enrolled / $capacity Enrolled', style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
