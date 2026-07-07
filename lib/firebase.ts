// Firebase client initialization — lazy singleton.
//
// The config values are public identifiers (NEXT_PUBLIC_*); security lives in
// Firestore security rules, not in hiding these keys. See docs/FIREBASE_SETUP.md.
//
// getFirebase() must only be called in the browser (event handlers / effects).
// When the env vars are missing (e.g. a fresh clone or a preview deploy without
// configuration), `isFirebaseConfigured` is false and the UI degrades honestly
// instead of crashing at build/prerender time.

import { getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

export function getFirebase(): { app: FirebaseApp; auth: Auth; db: Firestore } {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Copy .env.example to .env.local — see docs/FIREBASE_SETUP.md.")
  }
  if (!app) {
    app = getApps()[0] ?? initializeApp(firebaseConfig)
    auth = getAuth(app)
    // Offline-first: persistent local cache with multi-tab coordination.
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    })
  }
  return { app, auth: auth!, db: db! }
}
