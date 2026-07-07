# Firebase Setup — HeartSync

One-time setup to bring accounts and pairing to life. Takes about 10 minutes.
Do steps 1–5 **before** pushing Phase 1 to production, so the live site never
shows the "not connected to Firebase" notice.

## 1. Create the Firebase project

Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** →
name it `heartsync-prod` (Analytics optional — HeartSync doesn't use it).

## 2. Register the web app and grab the keys

Project overview → **</> (Web)** → nickname `heartsync-web` (no Firebase Hosting needed —
Vercel serves the app). Copy the `firebaseConfig` values shown.

Create `.env.local` in the repo root (copy `.env.example`) and fill in:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=heartsync-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=heartsync-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=heartsync-prod.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

These are public identifiers — security lives in the Firestore rules (step 4).

## 3. Enable Email/Password sign-in

Build → **Authentication** → Get started → Sign-in method → enable **Email/Password**
(leave passwordless email link off).

## 4. Create Firestore and deploy the rules

Build → **Firestore Database** → Create database → **Production mode** → region
`asia-south1` (Mumbai) or wherever your users are.

Then deploy the rules from the repo:

```
npm i -g firebase-tools
firebase login
firebase init firestore        # pick the existing project; keep firestore.rules as the rules file
firebase deploy --only firestore:rules
```

(Or paste the contents of `firestore.rules` into Console → Firestore → Rules → Publish.)

No composite indexes are needed for Phase 1 — the couple lookup
(`members array-contains uid, limit 1`) works out of the box.

## 5. Add the env vars to Vercel

Vercel → your project → Settings → **Environment Variables** → add all six
`NEXT_PUBLIC_FIREBASE_*` values (Production + Preview). Then push (or redeploy).

## 6. Smoke test

1. `pnpm dev` → register a new account → you land on **/pair**.
2. Generate an invite code.
3. In a private/incognito window, register a second account → redeem the code.
4. Both dashboards should now show "Together with …" — the inviter's tab updates
   live without a refresh.
5. Log out, log back in, and try the forgot-password flow (check spam).

## Troubleshooting

- **"HeartSync isn't connected to Firebase yet"** — env vars missing where it's
  running (`.env.local` locally; Vercel env vars in prod). Restart/redeploy after adding.
- **`permission-denied` in the console** — rules not deployed (step 4), or you're
  reading data that belongs to another couple (working as intended).
- **Invite redeem fails with "already been used"** — codes are single-use; generate a new one.
- **Reset email never arrives** — check spam; Authentication → Templates lets you
  customize the sender name.
