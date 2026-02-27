"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color?: string
}

export function FeatureCard({ title, description, icon, href, color = "bg-pink-500" }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="h-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${color.includes("bg-") ? color : `bg-${color}-100`}`}
            >
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href={href}>
              <span>Explore {title}</span>
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
