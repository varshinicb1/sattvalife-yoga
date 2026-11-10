import 'package:flutter/material.dart';

class InstructorsScreen extends StatelessWidget {
  const InstructorsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final instructors = [
      {'name': 'Amisha Patel', 'spec': 'Hatha, Breathwork', 'classes': 8},
      {'name': 'James Chen', 'spec': 'Vinyasa Flow', 'classes': 5},
      {'name': 'Sarah Mitchell', 'spec': 'Meditation, Restorative', 'classes': 3},
    ];

    return GridView.builder(
      padding: const EdgeInsets.all(24),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        crossAxisSpacing: 24,
        mainAxisSpacing: 24,
        childAspectRatio: 0.8,
      ),
      itemCount: instructors.length,
      itemBuilder: (context, index) {
        final instructor = instructors[index];
        return Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
          child: InkWell(
            onTap: () {}, // view schedule
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: const Color(0xFFE8F5E9),
                    child: Text(instructor['name'].toString().substring(0, 1), style: const TextStyle(fontSize: 32, color: Color(0xFF5A8D5E))),
                  ),
                  const SizedBox(height: 16),
                  Text(instructor['name'].toString(), style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text(instructor['spec'].toString(), textAlign: TextAlign.center, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(color: const Color(0xFF5A8D5E).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(20)),
                    child: Text('${instructor['classes']} classes this week', style: const TextStyle(color: Color(0xFF5A8D5E), fontWeight: FontWeight.bold, fontSize: 12)),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
