"use client"

import { useAppContext } from "@/lib/context/app-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function useAuth(requireAuth = true) {
  const { state } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If authentication is required but user is not authenticated
    if (requireAuth && !state.isAuthenticated) {
      // Store the intended destination
      sessionStorage.setItem("redirectAfterLogin", pathname)
      router.push("/login")
    }

    // If user is authenticated but on login/register page
    if (state.isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/dashboard"
      sessionStorage.removeItem("redirectAfterLogin")
      router.push(redirectPath)
    }
  }, [state.isAuthenticated, pathname, router, requireAuth])

  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }
}

