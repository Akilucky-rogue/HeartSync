"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { SunIcon, MoonIcon } from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import { useEffect } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { state, updateSettings } = useAppContext()

  // Sync theme with app context
  useEffect(() => {
    if (state.settings.theme !== theme) {
      updateSettings({ theme: theme as "light" | "dark" | "system" })
    }
  }, [theme, state.settings.theme, updateSettings])

  // Sync app context with theme
  useEffect(() => {
    if (theme !== state.settings.theme) {
      setTheme(state.settings.theme)
    }
  }, [state.settings.theme, setTheme, theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
      }}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

