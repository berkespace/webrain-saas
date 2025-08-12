import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function UrunlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
