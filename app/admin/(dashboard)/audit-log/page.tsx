"use client"

import { useState, useEffect } from "react"
import {
  History,
  Search,
  Eye,
  ShieldAlert,
  ArrowRight,
  Clock,
  Database,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore, type AuditLogEntry } from "@/lib/admin-store"

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [inspectLog, setInspectLog] = useState<AuditLogEntry | null>(null)

  useEffect(() => {
    setLogs(AdminStore.getAuditLogs())
  }, [])

  const filteredLogs = logs.filter(
    (l) =>
      l.table_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.record_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getActionBadgeColor = (action: string) => {
    switch (action.toUpperCase()) {
      case "INSERT":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "UPDATE":
        return "bg-purple-600/20 text-purple-300 border-purple-500/30"
      case "DELETE":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-white/10 text-white/70 border-white/10"
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Security & Audit Trail"
        description="Immutable record of administrative actions, edits, creations, and deletions across all content tables."
      />

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search by table, action, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-white/30 text-sm"
          />
        </div>

        <div className="text-xs text-white/50 flex items-center">
          <Database className="w-3.5 h-3.5 mr-1 text-purple-400" />
          Postgres Trigger Synchronized
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <AdminEmptyState
          icon={History}
          title="No audit entries"
          description="Every save or delete action will automatically generate an immutable audit entry here."
        />
      ) : (
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <Card
              key={log.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <History className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </Badge>
                      <span className="font-mono text-sm font-semibold text-white">
                        {log.table_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                      <span className="font-mono truncate max-w-[200px]">ID: {log.record_id}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-white/40" />
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setInspectLog(log)}
                  className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5 self-end sm:self-center"
                >
                  <Eye className="w-3.5 h-3.5 mr-1 text-purple-400" /> Inspect JSON
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Inspect JSON Dialog */}
      {inspectLog && (
        <Dialog open={!!inspectLog} onOpenChange={() => setInspectLog(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-purple-400" /> Audit Log Record Inspection
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
                <div>
                  <span className="text-white/40 block">Table:</span>
                  <span className="font-semibold text-white">{inspectLog.table_name}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Action:</span>
                  <Badge className={getActionBadgeColor(inspectLog.action)}>
                    {inspectLog.action}
                  </Badge>
                </div>
              </div>

              {inspectLog.after && (
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-purple-300">New / Modified State (after):</span>
                  <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-white/80 border border-white/10 overflow-x-auto max-h-60">
                    {JSON.stringify(inspectLog.after, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
