import 'package:flutter/material.dart';

class BlogScreen extends StatelessWidget {
  const BlogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) => Dialog(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Container(
                width: 600,
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Create New Post', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 24),
                    const TextField(decoration: InputDecoration(labelText: 'Title', border: OutlineInputBorder())),
                    const SizedBox(height: 16),
                    const TextField(
                      decoration: InputDecoration(labelText: 'Content', border: OutlineInputBorder()),
                      maxLines: 8,
                    ),
                    const SizedBox(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
                        const SizedBox(width: 16),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF5A8D5E), foregroundColor: Colors.white),
                          onPressed: () => Navigator.pop(context),
                          child: const Text('Publish'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
        backgroundColor: const Color(0xFF5A8D5E),
        child: const Icon(Icons.edit, color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          _BlogPostCard(title: 'Benefits of Morning Yoga', excerpt: 'Starting your day with a gentle flow can drastically improve your focus...', date: 'Oct 12, 2023', status: 'Published'),
          _BlogPostCard(title: 'Breathing Techniques for Anxiety', excerpt: 'Pranayama has been used for centuries to calm the nervous system...', date: 'Oct 5, 2023', status: 'Published'),
          _BlogPostCard(title: '5 Poses for Desk Workers', excerpt: 'Combat the negative effects of sitting all day with these simple poses...', date: 'Sep 28, 2023', status: 'Draft'),
          _BlogPostCard(title: 'Introduction to Meditation', excerpt: 'Meditation doesn\'t have to be complicated. Here is how to start...', date: 'Sep 20, 2023', status: 'Published'),
        ],
      ),
    );
  }
}

class _BlogPostCard extends StatelessWidget {
  final String title;
  final String excerpt;
  final String date;
  final String status;

  const _BlogPostCard({required this.title, required this.excerpt, required this.date, required this.status});

  @override
  Widget build(BuildContext context) {
    final isPublished = status == 'Published';

    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey.shade200)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Chip(
                  label: Text(status, style: TextStyle(color: isPublished ? Colors.green : Colors.orange, fontSize: 12, fontWeight: FontWeight.bold)),
                  backgroundColor: (isPublished ? Colors.green : Colors.orange).withValues(alpha: 0.1),
                  side: BorderSide.none,
                ),
                Text(date, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
              ],
            ),
            const SizedBox(height: 12),
            Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text(excerpt, style: TextStyle(color: Colors.grey.shade700)),
            const SizedBox(height: 16),
            Row(
              children: [
                TextButton.icon(onPressed: () {}, icon: const Icon(Icons.edit, size: 16), label: const Text('Edit')),
                const SizedBox(width: 8),
                TextButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.delete, size: 16, color: Colors.red),
                  label: const Text('Delete', style: TextStyle(color: Colors.red)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
