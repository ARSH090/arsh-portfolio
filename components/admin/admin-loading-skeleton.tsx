import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48 bg-white/5" />
        <Skeleton className="h-10 w-32 bg-white/5" />
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
        <Skeleton className="h-10 w-full bg-white/10" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-2">
            <Skeleton className="h-8 w-8 rounded-lg bg-white/5" />
            <Skeleton className="h-6 flex-1 bg-white/5" />
            <Skeleton className="h-6 w-24 bg-white/5" />
            <Skeleton className="h-8 w-16 rounded-md bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
