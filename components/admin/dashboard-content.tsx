"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  MessageSquare,
  MapPin,
  Zap,
  Plus,
  UserPlus,
  PenTool,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { cn } from '@/lib/utils';

const stats = [
  { 
    title: 'Total Revenue (MTD)', 
    value: '£12,450', 
    change: '+12.5%', 
    trend: 'up', 
    icon: DollarSign, 
    color: 'text-green-600 bg-green-100',
    description: 'vs last month'
  },
  { 
    title: 'Active Bookings', 
    value: '142', 
    change: '+8', 
    trend: 'up', 
    icon: Calendar, 
    color: 'text-blue-600 bg-blue-100',
    description: 'this month'
  },
  { 
    title: 'Active Students', 
    value: '89', 
    change: '+5.2%', 
    trend: 'up', 
    icon: Users, 
    color: 'text-purple-600 bg-purple-100',
    description: 'registered'
  },
  { 
    title: 'Classes This Week', 
    value: '14', 
    change: '0', 
    trend: 'neutral', 
    icon: Clock, 
    color: 'text-orange-600 bg-orange-100',
    description: 'scheduled'
  },
];

const recentBookings = [
  { id: 'BK-2024-001', student: 'Sarah Mitchell', course: 'Vinyasa Flow - Tue', date: 'Today, 6:30 PM', status: 'confirmed', amount: '£15' },
  { id: 'BK-2024-002', student: 'James Chen', course: 'Hatha Yoga - Thu', date: 'Tomorrow, 7:00 PM', status: 'confirmed', amount: '£15' },
  { id: 'BK-2024-003', student: 'Priya Sharma', course: 'Vinyasa Flow - Tue', date: 'Today, 6:30 PM', status: 'waitlisted', amount: '£15' },
  { id: 'BK-2024-004', student: 'Michael Brown', course: 'Corporate Session', date: 'Wed, 12:00 PM', status: 'confirmed', amount: '£180' },
  { id: 'BK-2024-005', student: 'Emma Wilson', course: 'Hatha Yoga - Thu', date: 'Tomorrow, 7:00 PM', status: 'cancelled', amount: '£0' },
];

const upcomingClasses = [
  { time: '6:30 PM', course: 'Vinyasa Flow', instructor: 'Amisha Soni', location: 'Trinity Methodist', spots: '12/20', color: 'bg-primary/10 text-primary' },
  { time: '7:00 PM', course: 'Hatha Yoga', instructor: 'Nish Soni', location: 'Thurnby Memorial', spots: '8/20', color: 'bg-accent/10 text-accent' },
];

const revenueData = [
  { month: 'Jan', revenue: 8200, bookings: 95 },
  { month: 'Feb', revenue: 9100, bookings: 102 },
  { month: 'Mar', revenue: 10500, bookings: 118 },
  { month: 'Apr', revenue: 11200, bookings: 125 },
  { month: 'May', revenue: 11800, bookings: 132 },
  { month: 'Jun', revenue: 12450, bookings: 142 },
];

export function DashboardContent() {
  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      waitlisted: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
      pending: 'bg-blue-100 text-blue-700',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening at Sattvalife Yoga.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/admin/bookings/new">New Booking</a>
          </Button>
          <Button size="sm" asChild>
            <a href="/admin/courses/new">Add Class</a>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                )}>
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                  {stat.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Revenue Overview
              <select className="text-sm border border-border rounded px-2 py-1 bg-background">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2 px-4">
              {revenueData.map((d) => {
                const height = ((d.revenue - 8000) / 9000) * 100;
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-primary/20 rounded-t" style={{ height: `${Math.max(height, 5)}%` }}>
                      <div className="w-full h-full bg-primary rounded-t opacity-60" style={{ height: '100%' }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
              <span>Total: £{revenueData[revenueData.length - 1].revenue.toLocaleString()}</span>
              <span>Avg/Month: £{Math.round(revenueData.reduce((a, b) => a + b.revenue, 0) / revenueData.length).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Class Occupancy This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls.color}`}>
                        {cls.course}
                      </span>
                      <span className="text-sm font-medium">{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {cls.spots}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {cls.location}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${parseInt(cls.spots.split('/')[0]) / parseInt(cls.spots.split('/')[1]) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3" asChild>
              <Link href="/admin/courses/new">
                <Calendar className="h-4 w-4" />
                <span>Create New Class</span>
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" asChild>
              <Link href="/admin/bookings/new">
                <Plus className="h-4 w-4" />
                <span>Manual Booking</span>
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" asChild>
              <Link href="/admin/students/new">
                <UserPlus className="h-4 w-4" />
                <span>Register Student</span>
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" asChild>
              <Link href="/admin/corporate/new">
                <Building2 className="h-4 w-4" />
                <span>New Corporate Lead</span>
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" asChild>
              <Link href="/admin/blog/new">
                <PenTool className="h-4 w-4" />
                <span>Write Blog Post</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/bookings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Booking ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Class</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-4 px-4 font-mono text-sm text-muted-foreground">{booking.id}</td>
                      <td className="py-4 px-4 font-medium">{booking.student}</td>
                      <td className="py-4 px-4 text-sm">{booking.course}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{booking.date}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((cls, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls.color}`}>
                    {cls.course}
                  </span>
                  <span className="text-sm font-medium">{cls.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {cls.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {cls.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spots: {cls.spots}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/bookings?course=${cls.course}`}>Manage</Link>
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/admin/schedule">View Full Schedule</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Corporate Enquiries */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              Corporate Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="font-medium text-blue-900">NEXT - Leicester Office</p>
              <p className="text-sm text-blue-700 mt-1">150 employees • Wellness programme enquiry</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">New</span>
                <span className="text-xs text-blue-600">Received 2 hours ago</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="font-medium text-green-900">Leicester City Council</p>
              <p className="text-sm text-green-700 mt-1">50 employees • Stress management workshop</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Proposal Sent</span>
                <span className="text-xs text-green-600">Sent yesterday</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/corporate">View All Enquiries</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm">Sarah Mitchell</p>
              <p className="text-sm text-muted-foreground">"Can I switch my Tuesday class to Thursday this week?"</p>
              <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm">James Chen</p>
              <p className="text-sm text-muted-foreground">"Thanks for the great class today! When does the next term start?"</p>
              <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/messages">View All Messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusBadge(status: string) {
  const styles = {
    confirmed: 'bg-green-100 text-green-700',
    waitlisted: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
    pending: 'bg-blue-100 text-blue-700',
  };
  return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
}