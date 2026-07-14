import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, ChevronRight, PersonStanding, Sparkles, Award, Users, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "My Dashboard | Sattvalife Yoga",
  description: "Your Sattvalife Yoga dashboard — view upcoming bookings, class history, and manage your profile.",
};

const upcomingBookings = [
  {
    id: "1",
    className: "Vinyasa Flow",
    instructor: "Amisha Soni",
    date: "Tuesday, 18 July 2025",
    time: "6:30 PM - 7:30 PM",
    location: "Trinity Methodist Church, Oadby",
    status: "confirmed",
  },
  {
    id: "2",
    className: "Hatha Yoga",
    instructor: "Nish Soni",
    date: "Thursday, 20 July 2025",
    time: "7:00 PM - 8:00 PM",
    location: "Thurnby Memorial Hall",
    status: "confirmed",
  },
];

const pastBookings = [
  {
    id: "3",
    className: "Vinyasa Flow",
    date: "Tuesday, 11 July 2025",
    time: "6:30 PM - 7:30 PM",
    status: "completed",
  },
  {
    id: "4",
    className: "Hatha Yoga",
    date: "Thursday, 6 July 2025",
    time: "7:00 PM - 8:00 PM",
    status: "completed",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Welcome */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Welcome back
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-2">
                  My Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">Manage your yoga journey at Sattvalife.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Calendar, label: "Upcoming Classes", value: "2" },
                  { icon: Award, label: "Classes Attended", value: "12" },
                  { icon: Activity, label: "Current Streak", value: "3 weeks" },
                  { icon: Users, label: "Member Since", value: "2024" },
                ].map((stat) => (
                  <Card key={stat.label} className="border-primary/10">
                    <CardContent className="p-4 md:p-6 text-center">
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Upcoming Bookings */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-semibold text-foreground">Upcoming Bookings</h2>
                    <Button size="sm" asChild>
                      <Link href="/register">Book New Class</Link>
                    </Button>
                  </div>

                  {upcomingBookings.length === 0 ? (
                    <Card className="border-dashed border-2">
                      <CardContent className="p-12 text-center">
                        <Calendar className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No upcoming classes booked yet.</p>
                        <Button asChild>
                          <Link href="/register">Book Your First Class</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                  {booking.className}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                  Confirmed
                                </span>
                              </div>
                              <h3 className="font-display text-lg font-semibold mb-2">{booking.className} with {booking.instructor}</h3>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" /> {booking.date}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" /> {booking.time}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" /> {booking.location}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href="/bookings">View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}

                  {/* Past Bookings */}
                  <div className="mt-10">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Recent Classes</h2>
                    <div className="space-y-3">
                      {pastBookings.map((booking) => (
                        <Card key={booking.id} className="opacity-80">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{booking.className}</div>
                                <div className="text-sm text-muted-foreground">{booking.date} &middot; {booking.time}</div>
                              </div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                                Completed
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-6">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-display text-xl">Profile Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-xl font-bold">
                          Y
                        </div>
                        <div>
                          <p className="font-semibold">Your Name</p>
                          <p className="text-sm text-muted-foreground">you@example.com</p>
                        </div>
                      </div>
                      <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Plan</span>
                          <span className="font-medium">10-Class Pass</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Classes Remaining</span>
                          <span className="font-medium">6</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Member Since</span>
                          <span className="font-medium">January 2024</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/profile">Edit Profile <ChevronRight className="h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground border-0">
                    <CardContent className="p-6 text-center">
                      <PersonStanding className="h-10 w-10 mx-auto mb-3 opacity-80" />
                      <h3 className="font-display text-lg font-semibold mb-2">Book Your Next Class</h3>
                      <p className="text-sm opacity-80 mb-4">Spaces are limited to 20 per class.</p>
                      <Button variant="secondary" className="w-full" asChild>
                        <Link href="/register">Book Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
