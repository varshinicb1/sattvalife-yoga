import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DashboardContent } from '@/components/admin/dashboard-content';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Sattvalife Yoga Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn || session.user?.role !== 'admin') {
    redirect('/login?redirect=/admin');
  }

  return (
    <AdminLayout user={session.user!}>
      <DashboardContent />
    </AdminLayout>
  );
}