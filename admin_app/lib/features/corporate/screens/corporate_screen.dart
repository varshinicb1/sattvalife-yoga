import 'package:flutter/material.dart';

class CorporateScreen extends StatelessWidget {
  const CorporateScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF5A8D5E),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          Row(
            children: [
              Expanded(
                child: Card(
                  elevation: 0,
                  color: const Color(0xFFE8F5E9),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  child: const Padding(
                    padding: EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(Icons.business, color: Color(0xFF5A8D5E)),
                        SizedBox(height: 12),
                        Text('Total Clients', style: TextStyle(color: Color(0xFF5A8D5E))),
                        Text('12', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF5A8D5E))),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 24),
              Expanded(
                child: Card(
                  elevation: 0,
                  color: const Color(0xFFFFF8E1),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  child: const Padding(
                    padding: EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(Icons.event, color: Color(0xFFD7B26D)),
                        SizedBox(height: 12),
                        Text('Sessions This Month', style: TextStyle(color: Color(0xFFD7B26D))),
                        Text('24', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFFD7B26D))),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 32),
          const Text('Active Corporate Clients', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          _ClientCard(company: 'TechCorp Ltd', contact: 'john@techcorp.com', employees: 45, sessions: '2/week'),
          _ClientCard(company: 'Creative Media', contact: 'sarah@creative.com', employees: 20, sessions: '1/week'),
          _ClientCard(company: 'Law Partners', contact: 'admin@law.com', employees: 120, sessions: '3/week'),
        ],
      ),
    );
  }
}

class _ClientCard extends StatelessWidget {
  final String company;
  final String contact;
  final int employees;
  final String sessions;

  const _ClientCard({required this.company, required this.contact, required this.employees, required this.sessions});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(company, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.email, size: 16, color: Colors.grey),
                const SizedBox(width: 4),
                Text(contact, style: const TextStyle(color: Colors.grey)),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Chip(label: Text('$employees Employees', style: const TextStyle(fontSize: 12)), backgroundColor: Colors.grey.shade100, side: BorderSide.none),
                const SizedBox(width: 8),
                Chip(label: Text('$sessions Sessions', style: const TextStyle(fontSize: 12)), backgroundColor: Colors.grey.shade100, side: BorderSide.none),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
