"use client"

// Live calendar month grid — always shows the actual current month.
// Rendered client-side after mount so the statically prerendered page never
// bakes in a stale build-time date (and there's no hydration mismatch).

import { useEffect, useState } from "react"
import { format, getDay, getDaysInMonth, startOfMonth } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function MonthGrid() {
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    setToday(new Date())
  }, [])

  const offset = today ? getDay(startOfMonth(today)) : 0
  const daysInMonth = today ? getDaysInMonth(today) : 35 - 0

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>{today ? format(today, "MMMM yyyy") : " "}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-sm font-medium text-muted-foreground">
              {d}
            </div>
          ))}
          {today
            ? (
                <>
                  {Array.from({ length: offset }).map((_, i) => (
                    <div key={`blank-${i}`} className="aspect-square p-1" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const isToday = day === today.getDate()
                    return (
                      <div key={day} className={`aspect-square p-1 ${isToday ? "rounded-md bg-rose-100" : ""}`}>
                        <div className={`text-right text-sm ${isToday ? "font-bold text-rose-500" : ""} p-1`}>
                          {day}
                        </div>
                      </div>
                    )
                  })}
                </>
              )
            : Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse p-1">
                  <div className="h-full w-full rounded-md bg-muted/50" />
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
