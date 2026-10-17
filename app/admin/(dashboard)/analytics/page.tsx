"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Eye,
  Download,
  MessageSquare,
  FolderGit2,
  Calendar,
  Users,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AdminPageHeader from "@/components/admin/admin-page-header"

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d")

  const analyticsStats = {
    totalViews: 4280,
    uniqueVisitors: 2890,
    resumeDownloads: 342,
    contactSubmissions: 28,
  }

  const topProjects = [
    { title: "CityVision - AI Road Anomaly Detection", views: 1840, share: "43%" },
    { title: "Amdox AI Cloud ERP", views: 1420, share: "33%" },
    { title: "CivicPulse - AI Platform", views: 980, share: "22%" },
    { title: "SafeBrowse - Parental Control", views: 760, share: "18%" },
    { title: "EmpirialProps FinTech", views: 510, share: "12%" },
  ]

  const dailyViews = [
    { day: "Mon", views: 145 },
    { day: "Tue", views: 230 },
    { day: "Wed", views: 310 },
    { day: "Thu", views: 290 },
    { day: "Fri", views: 420 },
    { day: "Sat", views: 380 },
    { day: "Sun", views: 350 },
  ]

  const maxDaily = Math.max(...dailyViews.map((d) => d.views))

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Visitor Analytics & Performance"
        description="Monitor portfolio traffic, project case-study views, CV downloads, and recruiter inquiries."
      >
        <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-1">
          {(["7d", "30d", "all"] as const).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={timeRange === r ? "default" : "ghost"}
              onClick={() => setTimeRange(r)}
              className={
                timeRange === r
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs h-7"
                  : "text-white/60 hover:text-white text-xs h-7"
              }
            >
              {r.toUpperCase()}
            </Button>
          ))}
        </div>
      </AdminPageHeader>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Total Page Views</p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {analyticsStats.totalViews.toLocaleString()}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400 mt-4">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>+18.4% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Unique Visitors</p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {analyticsStats.uniqueVisitors.toLocaleString()}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400 mt-4">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>+12.1% recruiter traffic</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Resume Downloads</p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {analyticsStats.resumeDownloads}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Download className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-purple-300 mt-4">
              <span>Avg 11 downloads/week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Contact Inquiries</p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {analyticsStats.contactSubmissions}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/30 flex items-center justify-center text-green-400">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400 mt-4">
              <span>96% response rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Traffic Chart */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-purple-400" /> Daily Page Views
            </h3>

            <div className="flex items-end justify-between h-48 pt-6 px-2">
              {dailyViews.map((item) => {
                const heightPercent = Math.round((item.views / maxDaily) * 100)
                return (
                  <div key={item.day} className="flex flex-col items-center flex-1 space-y-2">
                    <span className="text-[10px] text-white/50">{item.views}</span>
                    <div className="w-full max-w-[32px] bg-slate-800 rounded-t-md h-36 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full rounded-t-md bg-gradient-to-t from-purple-600 to-pink-500 hover:brightness-110 transition-all"
                      />
                    </div>
                    <span className="text-xs text-white/60 font-medium">{item.day}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Projects */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <FolderGit2 className="w-4 h-4 mr-2 text-pink-400" /> Most Viewed Projects
            </h3>

            <div className="space-y-3 pt-2">
              {topProjects.map((p, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80 font-medium truncate max-w-[240px] sm:max-w-xs">
                      {p.title}
                    </span>
                    <span className="text-white/50">{p.views} views</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: p.share }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
