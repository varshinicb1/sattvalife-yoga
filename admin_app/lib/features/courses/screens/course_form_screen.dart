import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class CourseFormScreen extends StatefulWidget {
  final String? courseId;
  const CourseFormScreen({super.key, this.courseId});

  @override
  State<CourseFormScreen> createState() => _CourseFormScreenState();
}

class _CourseFormScreenState extends State<CourseFormScreen> {
  String _instructor = 'Amisha';
  String _duration = '60 min';
  String _location = 'Oadby';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.courseId == null ? 'Create Class' : 'Edit Class'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const TextField(decoration: InputDecoration(labelText: 'Class Name', border: OutlineInputBorder())),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: _instructor,
                  decoration: const InputDecoration(labelText: 'Instructor', border: OutlineInputBorder()),
                  items: ['Amisha', 'James', 'Sarah', 'David'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                  onChanged: (val) => setState(() => _instructor = val!),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(child: TextField(decoration: InputDecoration(labelText: 'Date & Time', border: OutlineInputBorder(), suffixIcon: Icon(Icons.calendar_today)), readOnly: true, onTap: () {})),
                    const SizedBox(width: 16),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        value: _duration,
                        decoration: const InputDecoration(labelText: 'Duration', border: OutlineInputBorder()),
                        items: ['30 min', '45 min', '60 min', '90 min'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                        onChanged: (val) => setState(() => _duration = val!),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Expanded(child: TextField(decoration: InputDecoration(labelText: 'Max Capacity', border: OutlineInputBorder()), keyboardType: TextInputType.number)),
                    const SizedBox(width: 16),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        value: _location,
                        decoration: const InputDecoration(labelText: 'Location', border: OutlineInputBorder()),
                        items: ['Oadby', 'Thurnby', 'Online'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                        onChanged: (val) => setState(() => _location = val!),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                const TextField(decoration: InputDecoration(labelText: 'Description', border: OutlineInputBorder()), maxLines: 4),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(onPressed: () => context.pop(), child: const Text('Cancel')),
                    const SizedBox(width: 16),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF5A8D5E), foregroundColor: Colors.white),
                      onPressed: () => context.pop(),
                      child: const Text('Save Class'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
