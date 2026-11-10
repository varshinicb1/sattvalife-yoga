import 'package:flutter/material.dart';

class MessagesScreen extends StatelessWidget {
  const MessagesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF5A8D5E),
        child: const Icon(Icons.edit, color: Colors.white),
      ),
      body: Row(
        children: [
          Expanded(
            flex: 1,
            child: Container(
              decoration: BoxDecoration(border: Border(right: BorderSide(color: Colors.grey.shade200))),
              child: ListView.separated(
                itemCount: 8,
                separatorBuilder: (context, index) => const Divider(height: 1),
                itemBuilder: (context, index) {
                  final isUnread = index < 2;
                  return ListTile(
                    contentPadding: const EdgeInsets.all(16),
                    leading: CircleAvatar(backgroundColor: const Color(0xFFE8F5E9), child: Text('S$index')),
                    title: Text('Student $index', style: TextStyle(fontWeight: isUnread ? FontWeight.bold : FontWeight.normal)),
                    subtitle: Text('Looking forward to the class today!', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontWeight: isUnread ? FontWeight.bold : FontWeight.normal)),
                    trailing: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('10:4$index AM', style: TextStyle(fontSize: 12, color: isUnread ? const Color(0xFF5A8D5E) : Colors.grey)),
                        if (isUnread) ...[
                          const SizedBox(height: 4),
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: const BoxDecoration(color: Color(0xFF5A8D5E), shape: BoxShape.circle),
                            child: const Text('1', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ],
                    ),
                    tileColor: isUnread ? Colors.grey.shade50 : null,
                    onTap: () {},
                  );
                },
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(border: Border(bottom: BorderSide(color: Colors.grey.shade200))),
                  child: Row(
                    children: [
                      const CircleAvatar(backgroundColor: Color(0xFFE8F5E9), child: Text('S0')),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Student 0', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                            Text('Online', style: TextStyle(color: Colors.green, fontSize: 12)),
                          ],
                        ),
                      ),
                      IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView(
                    padding: const EdgeInsets.all(24),
                    children: [
                      _MessageBubble('Hi, is there space in tomorrow\'s 6:30PM class?', false, '10:40 AM'),
                      _MessageBubble('Hello! Yes, we still have 3 spots left. Would you like me to book one for you?', true, '10:45 AM'),
                      _MessageBubble('Yes please, that would be great. Thanks!', false, '10:46 AM'),
                      _MessageBubble('All done! You will receive a confirmation email shortly.', true, '10:48 AM'),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: Colors.white, border: Border(top: BorderSide(color: Colors.grey.shade200))),
                  child: Row(
                    children: [
                      IconButton(icon: const Icon(Icons.attach_file), onPressed: () {}),
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: 'Type a message...',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                            filled: true,
                            fillColor: Colors.grey.shade100,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      CircleAvatar(
                        backgroundColor: const Color(0xFF5A8D5E),
                        child: IconButton(icon: const Icon(Icons.send, color: Colors.white, size: 20), onPressed: () {}),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  final String text;
  final bool isMe;
  final String time;

  const _MessageBubble(this.text, this.isMe, this.time);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.4),
        child: Column(
          crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isMe ? const Color(0xFF5A8D5E) : Colors.grey.shade100,
                borderRadius: BorderRadius.circular(16).copyWith(
                  bottomRight: isMe ? const Radius.circular(0) : const Radius.circular(16),
                  bottomLeft: !isMe ? const Radius.circular(0) : const Radius.circular(16),
                ),
              ),
              child: Text(text, style: TextStyle(color: isMe ? Colors.white : Colors.black87)),
            ),
            const SizedBox(height: 4),
            Text(time, style: TextStyle(fontSize: 10, color: Colors.grey.shade500)),
          ],
        ),
      ),
    );
  }
}
