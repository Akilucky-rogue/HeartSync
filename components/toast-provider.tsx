"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function ToastProvider() {
  const { currentToast, dismissToast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !currentToast) return null

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-md">
      <Toast variant={currentToast.variant}>
        <div>
          <ToastTitle>{currentToast.title}</ToastTitle>
          <ToastDescription>{currentToast.description}</ToastDescription>
        </div>
        <ToastClose onClick={dismissToast} />
      </Toast>
    </div>,
    document.body,
  )
}
