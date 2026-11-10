import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  String _dateRange = 'This Week';

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Performance Overview', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            DropdownButton<String>(
              value: _dateRange,
              items: ['This Week', 'This Month', 'This Year'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
              onChanged: (v) => setState(() => _dateRange = v!),
            ),
          ],
        ),
        const SizedBox(height: 24),
        Row(
          children: [
            Expanded(child: _SummaryCard('Average Class Size', '14.5', Icons.group)),
            const SizedBox(width: 16),
            Expanded(child: _SummaryCard('Peak Day', 'Tuesday', Icons.trending_up)),
            const SizedBox(width: 16),
            Expanded(child: _SummaryCard('Popular Class', 'Hatha Flow', Icons.star)),
          ],
        ),
        const SizedBox(height: 32),
        const Text('Weekly Attendance', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        SizedBox(
          height: 300,
          child: BarChart(
            BarChartData(
              alignment: BarChartAlignment.spaceAround,
              maxY: 50,
              barTouchData: BarTouchData(enabled: false),
              titlesData: FlTitlesData(
                show: true,
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: (double value, TitleMeta meta) {
                      const style = TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 12);
                      String text;
                      switch (value.toInt()) {
                        case 0: text = 'Mon'; break;
                        case 1: text = 'Tue'; break;
                        case 2: text = 'Wed'; break;
                        case 3: text = 'Thu'; break;
                        case 4: text = 'Fri'; break;
                        case 5: text = 'Sat'; break;
                        case 6: text = 'Sun'; break;
                        default: text = ''; break;
                      }
                      return SideTitleWidget(axisSide: meta.axisSide, child: Text(text, style: style));
                    },
                  ),
                ),
                leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: true, reservedSize: 40)),
                topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              ),
              borderData: FlBorderData(show: false),
              barGroups: [
                BarChartGroupData(x: 0, barRods: [BarChartRodData(toY: 30, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
                BarChartGroupData(x: 1, barRods: [BarChartRodData(toY: 45, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
                BarChartGroupData(x: 2, barRods: [BarChartRodData(toY: 25, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
                BarChartGroupData(x: 3, barRods: [BarChartRodData(toY: 40, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
                BarChartGroupData(x: 4, barRods: [BarChartRodData(toY: 35, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
                BarChartGroupData(x: 5, barRods: [BarChartRodData(toY: 20, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
                BarChartGroupData(x: 6, barRods: [BarChartRodData(toY: 10, color: const Color(0xFF5A8D5E), width: 16, borderRadius: BorderRadius.circular(4))]),
              ],
            ),
          ),
        ),
        const SizedBox(height: 32),
        const Text('Monthly Revenue Trend', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        SizedBox(
          height: 300,
          child: LineChart(
            LineChartData(
              gridData: FlGridData(show: true, drawVerticalLine: false),
              titlesData: FlTitlesData(
                show: true,
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: (value, meta) {
                      const style = TextStyle(color: Colors.grey, fontSize: 12);
                      Widget text;
                      switch (value.toInt()) {
                        case 1: text = const Text('Week 1', style: style); break;
                        case 2: text = const Text('Week 2', style: style); break;
                        case 3: text = const Text('Week 3', style: style); break;
                        case 4: text = const Text('Week 4', style: style); break;
                        default: text = const Text(''); break;
                      }
                      return SideTitleWidget(axisSide: meta.axisSide, child: text);
                    },
                  ),
                ),
                leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: true, reservedSize: 40)),
                topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              ),
              borderData: FlBorderData(show: false),
              lineBarsData: [
                LineChartBarData(
                  spots: const [FlSpot(1, 1000), FlSpot(2, 1200), FlSpot(3, 1100), FlSpot(4, 1500)],
                  isCurved: true,
                  color: const Color(0xFFD7B26D),
                  barWidth: 4,
                  isStrokeCapRound: true,
                  dotData: FlDotData(show: true),
                  belowBarData: BarAreaData(show: true, color: const Color(0xFFD7B26D).withValues(alpha: 0.1)),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;

  const _SummaryCard(this.title, this.value, this.icon);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Icon(icon, color: const Color(0xFF5A8D5E), size: 32),
            const SizedBox(height: 12),
            Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(title, style: TextStyle(color: Colors.grey.shade600, fontSize: 12), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
