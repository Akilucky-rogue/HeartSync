import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  buttonText: string
  iconColor?: string
  iconBgColor?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  buttonText,
  iconColor = "text-rose-500",
  iconBgColor = "bg-rose-100",
}: FeatureCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
