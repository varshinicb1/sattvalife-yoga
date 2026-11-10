import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        Row(
          children: [
            Expanded(child: _StatCard(title: "Today's Classes", value: '4', icon: Icons.calendar_today, color: Colors.blue)),
            const SizedBox(width: 16),
            Expanded(child: _StatCard(title: 'Total Students', value: '142', icon: Icons.people, color: Colors.green)),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(child: _StatCard(title: 'Bookings Today', value: '18', icon: Icons.check_circle, color: Colors.orange)),
            const SizedBox(width: 16),
            Expanded(child: _StatCard(title: 'Revenue', value: '£420', icon: Icons.attach_money, color: const Color(0xFFD7B26D))),
          ],
        ),
        const SizedBox(height: 32),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Recent Activity', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            Row(
              children: [
                ElevatedButton.icon(
                  onPressed: () => context.go('/courses/new'),
                  icon: const Icon(Icons.add),
                  label: const Text('Add Class'),
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF5A8D5E), foregroundColor: Colors.white),
                ),
                const SizedBox(width: 8),
                OutlinedButton.icon(
                  onPressed: () => context.go('/bookings'),
                  icon: const Icon(Icons.book_online),
                  label: const Text('View Bookings'),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 16),
        _ActivityItem(title: 'Sarah Mitchell booked Vinyasa Flow', subtitle: '2 minutes ago', icon: Icons.bookmark),
        _ActivityItem(title: 'James Chen checked in to Hatha Yoga', subtitle: '15 minutes ago', icon: Icons.check_circle_outline),
        _ActivityItem(title: 'New Student Registration: Priya Sharma', subtitle: '1 hour ago', icon: Icons.person_add),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const _StatCard({required this.title, required this.value, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 32),
            const SizedBox(height: 16),
            Text(value, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
            Text(title, style: TextStyle(color: Colors.grey.shade600, fontSize: 14)),
          ],
        ),
      ),
    );
  }
}

class _ActivityItem extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;

  const _ActivityItem({required this.title, required this.subtitle, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
      child: ListTile(
        leading: CircleAvatar(backgroundColor: const Color(0xFFE8F5E9), child: Icon(icon, color: const Color(0xFF5A8D5E))),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
      ),
    );
  }
}
