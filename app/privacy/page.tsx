import type { Metadata } from "next"
import Link from "next/link"
import { Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | HeartSync",
  description: "How HeartSync handles your data.",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b bg-background">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl">HeartSync</span>
          </Link>
        </div>
      </header>
      <main className="container max-w-3xl flex-1 py-12">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Version 2026-07-06 · Last updated July 6, 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-6 text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">The short version</h2>
            <p>
              HeartSync is a private space for you and your partner. What you put in it is meant for the two of
              you — not for advertisers, not for sale, and not for anyone else. HeartSync shows no ads and uses no
              third-party trackers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">What we collect today (preview)</h2>
            <p>
              The current version of HeartSync is an early preview with simulated accounts. When you
              &quot;sign up&quot; or &quot;log in&quot;, the name and email you enter are stored only in your own
              browser (localStorage) on your device. They are not sent to or stored on any server, and we cannot
              see them. Clearing your browser data removes them completely.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">What will change when real accounts launch</h2>
            <p>
              When HeartSync launches real accounts, we will need to store data on servers so you and your partner
              can share it: your email and profile details, and the content of your shared space (memories,
              photos, messages, moods, goals, and events). Before that happens, this policy will be updated with
              the specifics — including where the data is hosted and how long it is kept — and you will be asked
              to accept the updated version.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Who can see your content</h2>
            <p>
              Content in a couple&apos;s shared space is visible to exactly two people: you and the partner you
              link with. We do not sell personal data, and we do not share it with third parties except for the
              infrastructure providers needed to run the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Security</h2>
            <p>
              Messages, moods, and photos are intimate data, and we treat them that way: access is restricted to
              the two members of a couple, and connections to the service are encrypted in transit. No system is
              perfectly secure, so please use a strong, unique password when real accounts launch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
            <p>
              In the preview, you can erase everything HeartSync knows about you by clearing your browser data.
              Once real accounts exist, you will be able to export your data and delete your account — and all of
              its content — from within Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p>
              Questions about privacy? Reach out via the{" "}
              <Link href="/contact" className="text-rose-500 hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
