import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Honest empty state for features whose data arrives in later phases.
 * No fake content — just what this space is for and (optionally) an action.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
        <Icon className="h-6 w-6 text-rose-500" />
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
