import CalendarClientPage from "./CalendarClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar | HeartSync",
  description: "Track important dates and events",
}

export default function CalendarPage() {
  return <CalendarClientPage />
}
