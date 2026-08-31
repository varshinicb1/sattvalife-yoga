import 'package:flutter/material.dart';

void main() {
  runApp(const SattvalifeAdminApp());
}

class SattvalifeAdminApp extends StatelessWidget {
  const SattvalifeAdminApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sattvalife Admin',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF5A8D5E)),
        useMaterial3: true,
      ),
      home: const AdminHomeScreen(),
    );
  }
}

class AdminHomeScreen extends StatefulWidget {
  const AdminHomeScreen({super.key});

  @override
  State<AdminHomeScreen> createState() => _AdminHomeScreenState();
}

class _AdminHomeScreenState extends State<AdminHomeScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: const [
            Icon(Icons.spa, color: Color(0xFF5A8D5E)),
            SizedBox(width: 8),
            Text('Sattvalife Admin', style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.account_circle_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: [
        _buildDashboardTab(),
        _buildScheduleTab(),
        _buildBookingsTab(),
        _buildSettingsTab(),
      ][_selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dashboard_outlined), selectedIcon: Icon(Icons.dashboard), label: 'Dashboard'),
          NavigationDestination(icon: Icon(Icons.calendar_month_outlined), selectedIcon: Icon(Icons.calendar_month), label: 'Schedule'),
          NavigationDestination(icon: Icon(Icons.people_outline), selectedIcon: Icon(Icons.people), label: 'Bookings'),
          NavigationDestination(icon: Icon(Icons.settings_outlined), selectedIcon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }

  Widget _buildDashboardTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          elevation: 0,
          color: const Color(0xFFE8F5E9),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF5A8D5E),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.wb_sunny, color: Colors.white),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('Namaste, Amisha!', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      Text('2 studio classes scheduled this week', style: TextStyle(color: Colors.black54)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildMetricCard('Total Students', '89', Icons.group, Colors.blue),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildMetricCard('Active Bookings', '142', Icons.book_online, Colors.green),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _buildMetricCard('Live Online', '3 Sessions', Icons.videocam, Colors.orange),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildMetricCard('Reviews', '4.9 ★ (62)', Icons.star, Colors.amber),
            ),
          ],
        ),
        const SizedBox(height: 20),
        const Text('Upcoming Classes', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        _buildClassItem('Tuesday · 6:30 PM', 'Vinyasa Flow', 'Trinity Methodist, Oadby', '12/20 booked'),
        const SizedBox(height: 8),
        _buildClassItem('Thursday · 7:00 PM', 'Hatha Yoga', 'Thurnby Memorial Hall', '8/20 booked'),
      ],
    );
  }

  Widget _buildMetricCard(String title, String value, IconData icon, Color color) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: Colors.grey.shade200),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 12),
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            Text(title, style: TextStyle(color: Colors.grey.shade600, fontSize: 13)),
          ],
        ),
      ),
    );
  }

  Widget _buildClassItem(String time, String title, String venue, String spots) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: Colors.grey.shade200),
      ),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: const Color(0xFFE8F5E9),
          child: const Icon(Icons.self_improvement, color: Color(0xFF5A8D5E)),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text('$time\n$venue'),
        trailing: Chip(
          label: Text(spots, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
          backgroundColor: const Color(0xFFF5F5F5),
        ),
        isThreeLine: true,
      ),
    );
  }

  Widget _buildScheduleTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Weekly Timetable', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.add),
              label: const Text('Add Class'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF5A8D5E),
                foregroundColor: Colors.white,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        _buildClassItem('Tuesday · 6:30 - 7:30 PM', 'Vinyasa Flow (Weekly)', 'Trinity Methodist Church, LE2 5AB', '£10 / session'),
        const SizedBox(height: 8),
        _buildClassItem('Thursday · 7:00 - 8:00 PM', 'Hatha Yoga (Weekly)', 'Thurnby Memorial Hall, LE7 9PN', '£10 / session'),
        const SizedBox(height: 8),
        _buildClassItem('Tue & Thu · 7:00 AM', 'Online Morning Vinyasa', 'Live Zoom Stream', '£8 / session'),
      ],
    );
  }

  Widget _buildBookingsTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        Text('Recent Student Registrations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        SizedBox(height: 12),
        ListTile(
          leading: CircleAvatar(child: Text('SM')),
          title: Text('Sarah Mitchell'),
          subtitle: Text('Vinyasa Flow · Tuesday 6:30 PM'),
          trailing: Text('Paid · £10', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
        ),
        Divider(),
        ListTile(
          leading: CircleAvatar(child: Text('JC')),
          title: Text('James Chen'),
          subtitle: Text('Hatha Yoga · Thursday 7:00 PM'),
          trailing: Text('Paid · £10', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
        ),
        Divider(),
        ListTile(
          leading: CircleAvatar(child: Text('PS')),
          title: Text('Priya Sharma'),
          subtitle: Text('Online Morning Vinyasa'),
          trailing: Text('Paid · £8', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }

  Widget _buildSettingsTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text('Studio Configuration', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        ListTile(
          leading: const Icon(Icons.payment),
          title: const Text('Stripe Payments'),
          subtitle: const Text('Manage checkout links and test/live modes'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
        const Divider(),
        ListTile(
          leading: const Icon(Icons.email),
          title: const Text('Resend Email Confirmations'),
          subtitle: const Text('Configured automated booking receipts'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
        const Divider(),
        ListTile(
          leading: const Icon(Icons.analytics),
          title: const Text('Google Analytics & Web Metrics'),
          subtitle: const Text('Live traffic tracking'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
      ],
    );
  }
}
