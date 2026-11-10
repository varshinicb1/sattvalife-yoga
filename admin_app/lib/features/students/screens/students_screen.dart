import 'package:flutter/material.dart';

class StudentsScreen extends StatelessWidget {
  const StudentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Search students...',
                      prefixIcon: const Icon(Icons.search),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      filled: true,
                      fillColor: Colors.grey.shade50,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                DropdownButton<String>(
                  value: 'All Memberships',
                  items: ['All Memberships', 'Unlimited', '10-Pack', 'Drop-in'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                  onChanged: (v) {},
                ),
              ],
            ),
            const SizedBox(height: 24),
            Expanded(
              child: ListView.builder(
                itemCount: 10,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 0,
                    margin: const EdgeInsets.only(bottom: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
                    child: ListTile(
                      leading: CircleAvatar(backgroundColor: const Color(0xFFD7B26D), child: Text('S$index', style: const TextStyle(color: Colors.white))),
                      title: Text('Student Name $index', style: const TextStyle(fontWeight: FontWeight.bold)),
                      subtitle: const Text('student@example.com • Last attended: 2 days ago'),
                      trailing: const Chip(label: Text('Unlimited', style: TextStyle(fontSize: 12)), backgroundColor: Color(0xFFE8F5E9), side: BorderSide.none),
                      onTap: () {
                        showModalBottomSheet(
                          context: context,
                          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
                          builder: (context) => Padding(
                            padding: const EdgeInsets.all(24.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Row(
                                  children: [
                                    CircleAvatar(radius: 30, backgroundColor: const Color(0xFFD7B26D), child: Text('S$index', style: const TextStyle(color: Colors.white, fontSize: 24))),
                                    const SizedBox(width: 16),
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Student Name $index', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                                        const Text('student@example.com'),
                                      ],
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 24),
                                const Text('Current Membership: Unlimited', style: TextStyle(fontWeight: FontWeight.bold)),
                                const SizedBox(height: 16),
                                const Text('Attendance History', style: TextStyle(fontWeight: FontWeight.bold)),
                                const ListTile(title: Text('Vinyasa Flow'), subtitle: Text('Yesterday'), trailing: Icon(Icons.check, color: Colors.green)),
                                const ListTile(title: Text('Hatha Flow'), subtitle: Text('Last week'), trailing: Icon(Icons.check, color: Colors.green)),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
