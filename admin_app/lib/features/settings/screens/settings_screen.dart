import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  late final TextEditingController _nameController;
  late final TextEditingController _addressController;
  late final TextEditingController _phoneController;
  late final TextEditingController _emailController;

  bool _newBookingAlerts = true;
  bool _cancellationAlerts = true;
  bool _dailySummary = false;
  bool _whatsappConnected = true;
  bool _sendGridConnected = true;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: 'Sattvalife Yoga');
    _addressController = TextEditingController(text: 'Leicester, UK');
    _phoneController = TextEditingController(text: '+44 7700 900077');
    _emailController = TextEditingController(text: 'hello@sattvalife.com');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _addressController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const brandColor = Color(0xFF5A8D5E);

    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        const Text('Studio Info', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(labelText: 'Studio Name', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _addressController,
                  decoration: const InputDecoration(labelText: 'Address', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _phoneController,
                        decoration: const InputDecoration(labelText: 'Phone', border: OutlineInputBorder()),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: TextField(
                        controller: _emailController,
                        decoration: const InputDecoration(labelText: 'Email', border: OutlineInputBorder()),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Align(
                  alignment: Alignment.centerRight,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: brandColor, foregroundColor: Colors.white),
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Settings saved successfully')),
                      );
                    },
                    child: const Text('Save Changes'),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 32),
        const Text('Notifications', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
          child: Column(
            children: [
              SwitchListTile(
                title: const Text('New Booking Alerts'),
                subtitle: const Text('Get notified when a student books a class'),
                value: _newBookingAlerts,
                onChanged: (v) => setState(() => _newBookingAlerts = v),
                activeColor: brandColor,
              ),
              const Divider(height: 1),
              SwitchListTile(
                title: const Text('Cancellation Alerts'),
                subtitle: const Text('Get notified when a student cancels'),
                value: _cancellationAlerts,
                onChanged: (v) => setState(() => _cancellationAlerts = v),
                activeColor: brandColor,
              ),
              const Divider(height: 1),
              SwitchListTile(
                title: const Text('Daily Summary'),
                subtitle: const Text('Receive a daily email with upcoming classes'),
                value: _dailySummary,
                onChanged: (v) => setState(() => _dailySummary = v),
                activeColor: brandColor,
              ),
            ],
          ),
        ),
        const SizedBox(height: 32),
        const Text('Integrations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.chat),
                title: const Text('WhatsApp Business'),
                subtitle: Text(_whatsappConnected ? 'Connected' : 'Disconnected'),
                trailing: Switch(
                  value: _whatsappConnected,
                  onChanged: (v) => setState(() => _whatsappConnected = v),
                  activeColor: brandColor,
                ),
              ),
              const Divider(height: 1),
              ListTile(
                leading: const Icon(Icons.payment),
                title: const Text('Stripe'),
                subtitle: const Text('pk_live_•••••••••••••••••••••'),
                trailing: TextButton(onPressed: () {}, child: const Text('Configure')),
              ),
              const Divider(height: 1),
              ListTile(
                leading: const Icon(Icons.email),
                title: const Text('SendGrid Email'),
                subtitle: Text(_sendGridConnected ? 'Connected' : 'Disconnected'),
                trailing: Switch(
                  value: _sendGridConnected,
                  onChanged: (v) => setState(() => _sendGridConnected = v),
                  activeColor: brandColor,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 32),
        const Text('Account', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.lock_outline),
                title: const Text('Change Password'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
              ),
              const Divider(height: 1),
              ListTile(
                leading: const Icon(Icons.logout, color: Colors.red),
                title: const Text('Sign Out', style: TextStyle(color: Colors.red)),
                onTap: () {},
              ),
            ],
          ),
        ),
      ],
    );
  }
}

