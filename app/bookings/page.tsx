import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, XCircle, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "My Bookings | Sattvalife Yoga",
  description: "View and manage your Sattvalife Yoga class bookings. Cancel or reschedule classes from your booking history.",
};

const currentBookings = [
  {
    id: "SL-ABC123",
    className: "Vinyasa Flow",
    instructor: "Amisha Soni",
    date: "Tuesday, 18 July 2025",
    time: "6:30 PM - 7:30 PM",
    location: "Trinity Methodist Church, Oadby",
    status: "confirmed" as const,
    bookedOn: "10 July 2025",
  },
  {
    id: "SL-DEF456",
    className: "Hatha Yoga",
    instructor: "Nish Soni",
    date: "Thursday, 20 July 2025",
    time: "7:00 PM - 8:00 PM",
    location: "Thurnby Memorial Hall",
    status: "confirmed" as const,
    bookedOn: "10 July 2025",
  },
];

const bookingHistory = [
  {
    id: "SL-GHI789",
    className: "Vinyasa Flow",
    date: "Tuesday, 11 July 2025",
    time: "6:30 PM - 7:30 PM",
    location: "Trinity Methodist Church, Oadby",
    status: "completed" as const,
  },
  {
    id: "SL-JKL012",
    className: "Hatha Yoga",
    date: "Thursday, 6 July 2025",
    time: "7:00 PM - 8:00 PM",
    location: "Thurnby Memorial Hall",
    status: "completed" as const,
  },
  {
    id: "SL-MNO345",
    className: "Vinyasa Flow",
    date: "Tuesday, 4 July 2025",
    time: "6:30 PM - 7:30 PM",
    location: "Trinity Methodist Church, Oadby",
    status: "cancelled" as const,
  },
];

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10">
                <Button variant="ghost" size="sm" asChild className="mb-4">
                  <Link href="/dashboard">
                    <ChevronLeft className="h-4 w-4" /> Back to Dashboard
                  </Link>
                </Button>
                <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-2">
                  My Bookings
                </h1>
                <p className="text-muted-foreground">View and manage your class bookings.</p>
              </div>

              {/* Current Bookings */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Upcoming Classes ({currentBookings.length})
                </h2>

                {currentBookings.length === 0 ? (
                  <Card className="border-dashed border-2">
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">No upcoming bookings.</p>
                      <p className="text-sm text-muted-foreground mb-4">Book a class to get started.</p>
                      <Button asChild>
                        <Link href="/register">Book a Class</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {currentBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                  {booking.className}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                  {booking.status}
                                </span>
                              </div>
                              <h3 className="font-display text-lg font-semibold mb-1">
                                {booking.className} with {booking.instructor}
                              </h3>
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
                              <p className="text-xs text-muted-foreground mt-2">Booking ref: {booking.id}</p>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                                <XCircle className="h-4 w-4" /> Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Booking History */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Booking History</h2>
                <div className="space-y-3">
                  {bookingHistory.map((booking) => (
                    <Card key={booking.id} className={booking.status === "cancelled" ? "opacity-60" : ""}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="font-medium">{booking.className}</div>
                              <div className="text-sm text-muted-foreground">{booking.date} &middot; {booking.time}</div>
                              <div className="text-xs text-muted-foreground">{booking.location} &middot; Ref: {booking.id}</div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {booking.status === "completed" ? "Completed" : "Cancelled"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
