"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AnniversaryCountdownProps {
  anniversaryDate: string
  title: string
  description?: string
}

export function AnniversaryCountdown({ anniversaryDate, title, description }: AnniversaryCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    percentage: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const targetDate = new Date(anniversaryDate)

      // If the anniversary has passed this year, set it for next year
      if (now > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1)
      }

      const difference = targetDate.getTime() - now.getTime()

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      // Calculate percentage (assuming 365 days in a year)
      const totalDaysInYear = 365
      const daysLeft = days + hours / 24 + minutes / (24 * 60) + seconds / (24 * 60 * 60)
      const percentage = 100 - (daysLeft / totalDaysInYear) * 100

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        percentage: Math.min(100, Math.max(0, percentage)),
      })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clean up
    return () => clearInterval(timer)
  }, [anniversaryDate])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
          </motion.div>
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <div className="text-center">
            <div className="text-3xl font-bold">{timeLeft.days}</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs text-muted-foreground">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs text-muted-foreground">Seconds</div>
          </div>
        </div>
        <Progress value={timeLeft.percentage} className="h-2" />
      </CardContent>
    </Card>
  )
}
