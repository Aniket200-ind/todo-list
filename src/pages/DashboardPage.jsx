//! File: src/pages.DashboardPage.jsx

import ActivityChart from "@/components/dashboard/ActivityChart"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Stats from "@/components/dashboard/Stats"

export const Dashboard = () => {
  return (
    <section className="space-y-10">
      <DashboardHeader />
      <Stats />
      <ActivityChart />
    </section>
  )
}