import type { Metadata } from "next"
import Link from "next/link"
import { Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | HeartSync",
  description: "The terms that apply when you use HeartSync.",
}

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Version 2026-07-06 · Last updated July 6, 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-6 text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. About HeartSync</h2>
            <p>
              HeartSync is a private space for two people in a relationship to share memories, messages, moods,
              goals, and important dates. It is an independent project, currently offered as an early preview.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. Preview status</h2>
            <p>
              HeartSync is under active development. In the current preview, accounts are simulated and the
              content you see is example data. Features may change, break, or be removed without notice, and
              anything you enter may not be saved. Please don&apos;t rely on the preview to store anything
              important.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Acceptance</h2>
            <p>
              By creating an account or using HeartSync, you agree to these Terms and to the{" "}
              <Link href="/privacy" className="text-rose-500 hover:underline">
                Privacy Policy
              </Link>
              . If you don&apos;t agree, please don&apos;t use HeartSync. You must be at least 18 years old to use
              HeartSync.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Your account and your partner</h2>
            <p>
              You are responsible for your account and for keeping your credentials secure. HeartSync is built
              around a shared space between you and one partner: content you add to that shared space (such as
              memories, photos, messages, and events) is visible to your partner. Only invite someone you trust,
              and only add content you are comfortable sharing with them.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Your content</h2>
            <p>
              Your content belongs to you and your partner. You grant HeartSync only the limited rights needed to
              store and display that content inside your shared space. HeartSync does not sell your content and
              does not use it for advertising.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Acceptable use</h2>
            <p>
              Don&apos;t use HeartSync to do anything unlawful, to harass or harm anyone, to upload content you
              don&apos;t have the right to share, or to attempt to break, probe, or overload the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">7. Ending things</h2>
            <p>
              You can stop using HeartSync and request deletion of your account at any time. We may suspend or
              terminate accounts that violate these Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">8. Disclaimer</h2>
            <p>
              HeartSync is provided &quot;as is&quot;, without warranties of any kind. To the maximum extent
              permitted by law, HeartSync and its creator are not liable for any indirect or consequential damages
              or for loss of data arising from your use of the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">9. Changes to these Terms</h2>
            <p>
              We may update these Terms as the product evolves. The version and date at the top of this page will
              change when we do, and material changes will be flagged in the app.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">10. Contact</h2>
            <p>
              Questions about these Terms? Reach out via the{" "}
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
