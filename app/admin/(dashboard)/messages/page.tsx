"use client"

import { useState, useEffect } from "react"
import {
  MessageSquare,
  Search,
  Star,
  Trash2,
  Mail,
  Download,
  CheckCircle2,
  Clock,
  User,
  Reply,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore, type Message } from "@/lib/admin-store"
import { toast } from "sonner"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setMessages(AdminStore.getMessages())
  }, [])

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.body.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "unread") return matchesSearch && !m.is_read
    if (filter === "starred") return matchesSearch && m.is_starred
    return matchesSearch
  })

  const toggleRead = (id: string) => {
    AdminStore.toggleMessageRead(id)
    setMessages(AdminStore.getMessages())
  }

  const toggleStar = (id: string) => {
    AdminStore.toggleMessageStar(id)
    setMessages(AdminStore.getMessages())
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteMessage(deleteId)
      setMessages(AdminStore.getMessages())
      setDeleteId(null)
      toast.success("Message deleted.")
    }
  }

  const exportCSV = () => {
    if (messages.length === 0) {
      toast.error("No messages to export.")
      return
    }

    const headers = ["ID", "Name", "Email", "Subject", "Body", "Created At"]
    const rows = messages.map((m) => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      `"${m.body.replace(/"/g, '""')}"`,
      m.created_at,
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `portfolio-messages-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Messages exported as CSV!")
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Contact Messages & Inquiries"
        description="View contact form submissions, manage inquiries, reply directly via email, or export to CSV."
      >
        <Button
          onClick={exportCSV}
          variant="outline"
          className="border-white/10 text-white/80 hover:bg-white/10 text-xs"
        >
          <Download className="w-3.5 h-3.5 mr-1 text-purple-400" /> Export CSV
        </Button>
      </AdminPageHeader>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search messages by name, email, text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-white/30 text-sm"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {(["all", "unread", "starred"] as const).map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={filter === tab ? "default" : "outline"}
              onClick={() => setFilter(tab)}
              className={
                filter === tab
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs capitalize"
                  : "border-white/10 text-white/70 hover:bg-white/10 text-xs capitalize"
              }
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <AdminEmptyState
          icon={MessageSquare}
          title="No messages found"
          description="Inquiries sent from your public contact form will arrive here in real time."
        />
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <Card
              key={msg.id}
              className={`backdrop-blur-md transition-all duration-200 overflow-hidden ${
                msg.is_read
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-purple-900/15 border-purple-500/40 shadow-lg shadow-purple-500/5"
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-start space-x-3">
                    <button
                      type="button"
                      onClick={() => toggleStar(msg.id)}
                      className="mt-0.5 text-white/30 hover:text-yellow-400 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          msg.is_starred ? "fill-yellow-400 text-yellow-400" : ""
                        }`}
                      />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-sm">{msg.name}</h3>
                        {!msg.is_read && (
                          <Badge className="bg-purple-600 text-white text-[9px] py-0 px-1.5">
                            New
                          </Badge>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-purple-300 hover:underline font-mono"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto text-xs text-white/50">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pl-7 space-y-2">
                  <h4 className="text-xs font-semibold text-white/90">
                    Subject: {msg.subject || "(No Subject)"}
                  </h4>
                  <p className="text-xs text-white/70 whitespace-pre-wrap leading-relaxed">
                    {msg.body}
                  </p>
                </div>

                <div className="pl-7 pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleRead(msg.id)}
                      className="border-white/10 text-white/70 hover:bg-white/10 text-xs h-7"
                    >
                      {msg.is_read ? "Mark Unread" : "Mark as Read"}
                    </Button>

                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Contact")}`}
                    >
                      <Button
                        size="sm"
                        className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs h-7"
                      >
                        <Reply className="w-3 h-3 mr-1" /> Reply via Email
                      </Button>
                    </a>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(msg.id)}
                    className="text-white/40 hover:text-red-400 text-xs h-7 px-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Message?"
        description="Are you sure you want to permanently delete this inquiry?"
        confirmText="Delete Message"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
