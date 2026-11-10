import 'package:flutter/material.dart';

class BookingsScreen extends StatelessWidget {
  const BookingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Column(
        children: [
          const TabBar(
            tabs: [Tab(text: 'Upcoming'), Tab(text: 'Past'), Tab(text: 'Cancelled')],
            labelColor: Color(0xFF5A8D5E),
            indicatorColor: Color(0xFF5A8D5E),
          ),
          Expanded(
            child: TabBarView(
              children: [
                _buildList(context, 'Confirmed', Colors.green),
                _buildList(context, 'Completed', Colors.grey),
                _buildList(context, 'Cancelled', Colors.red),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildList(BuildContext context, String status, Color statusColor) {
    return ListView.builder(
      padding: const EdgeInsets.all(24),
      itemCount: 5,
      itemBuilder: (context, index) {
        return Dismissible(
          key: ValueKey(index),
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.only(right: 20),
            child: const Icon(Icons.cancel, color: Colors.white),
          ),
          direction: DismissDirection.endToStart,
          child: Card(
            elevation: 0,
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
            child: ListTile(
              leading: CircleAvatar(backgroundColor: const Color(0xFFE8F5E9), child: Text('S$index')),
              title: Text('Student $index'),
              subtitle: Text('Hatha Flow • Tue 6:30 PM'),
              trailing: Chip(
                label: Text(status, style: TextStyle(color: statusColor, fontSize: 12, fontWeight: FontWeight.bold)),
                backgroundColor: statusColor.withValues(alpha: 0.1),
                side: BorderSide.none,
              ),
            ),
          ),
        );
      },
    );
  }
}
