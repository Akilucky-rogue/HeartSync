"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/date-ideas", label: "Date Ideas" },
  { href: "/goals", label: "Goals" },
  { href: "/calendar", label: "Calendar" },
  { href: "/photos", label: "Photos" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <>
      <Link href="/" className="flex items-center gap-2 font-bold">
        <span className="text-xl">HeartSync</span>
      </Link>
      <nav className="ml-6 hidden md:flex gap-6">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                initial={false}
                animate={pathname === item.href ? { width: "100%" } : { width: "0%" }}
              />
            </Link>
          </motion.div>
        ))}
      </nav>
    </>
  )
}

