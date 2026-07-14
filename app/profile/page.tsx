import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, User, Mail, Phone, Lock, Bell, ShieldAlert, Save, Eye, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "My Profile | Sattvalife Yoga",
  description: "Manage your Sattvalife Yoga profile, update personal details, change password, and manage notification preferences.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <Button variant="ghost" size="sm" asChild className="mb-4">
                  <Link href="/dashboard">
                    <ChevronLeft className="h-4 w-4" /> Back to Dashboard
                  </Link>
                </Button>
                <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-2">
                  My Profile
                </h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
              </div>

              <div className="space-y-8">
                {/* Personal Details */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                          <input id="firstName" name="firstName" type="text" defaultValue="Your" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                          <input id="lastName" name="lastName" type="text" defaultValue="Name" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 flex items-center gap-1">
                          <Mail className="h-4 w-4" /> Email
                        </label>
                        <input id="email" name="email" type="email" defaultValue="you@example.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1 flex items-center gap-1">
                          <Phone className="h-4 w-4" /> Phone
                        </label>
                        <input id="phone" name="phone" type="tel" defaultValue="+44 7xxx xxxxxx" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                      </div>
                      <Button type="submit" size="lg" className="flex items-center gap-2">
                        <Save className="h-5 w-5" /> Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Change Password */}
                <Card className="border-accent/20">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <Lock className="h-5 w-5 text-accent" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">Current Password</label>
                        <div className="relative">
                          <input id="currentPassword" name="currentPassword" type="password" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="••••••••" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                          <input id="newPassword" name="newPassword" type="password" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Min. 8 characters" />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</label>
                          <input id="confirmPassword" name="confirmPassword" type="password" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Re-enter new password" />
                        </div>
                      </div>
                      <Button type="submit" size="lg" variant="accent" className="flex items-center gap-2">
                        <Save className="h-5 w-5" /> Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: "Booking confirmations", desc: "Receive email when you book a class", defaultChecked: true },
                        { label: "Class reminders", desc: "Get a reminder 24 hours before class", defaultChecked: true },
                        { label: "Schedule changes", desc: "Notifications about cancellations or changes", defaultChecked: true },
                        { label: "Newsletter & offers", desc: "Monthly updates and special promotions", defaultChecked: false },
                        { label: "WhatsApp notifications", desc: "Receive booking updates via WhatsApp", defaultChecked: true },
                      ].map((pref) => (
                        <label key={pref.label} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                          <input type="checkbox" defaultChecked={pref.defaultChecked} className="mt-1 accent-primary" />
                          <div>
                            <p className="font-medium text-sm">{pref.label}</p>
                            <p className="text-xs text-muted-foreground">{pref.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <Button size="lg" className="mt-6">Save Preferences</Button>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2 text-red-600">
                      <ShieldAlert className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
                      <p className="text-sm text-red-800">
                        Once you delete your account, all your data including booking history and class passes 
                        will be permanently removed. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" size="lg">
                      Delete My Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
