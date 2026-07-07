// Invite service — partner pairing via short invite codes.
//
// Flow: partner A generates a code (invites/{CODE}), shares it out-of-band,
// partner B redeems it. Redemption runs in a transaction that creates the
// couples/{id} doc with both UIDs. The couple is discovered by both clients
// through a members array-contains query (see AuthContext), so A's UI updates
// live the moment B redeems.

import { collection, doc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore"
import { getFirebase } from "@/lib/firebase"

// No 0/O or 1/I — codes are read aloud and typed by humans.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
const CODE_LENGTH = 6

export function generateInviteCode(): string {
  const bytes = new Uint8Array(CODE_LENGTH)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("")
}

export async function createInvite(me: { uid: string; name: string }): Promise<string> {
  const { db } = getFirebase()
  const code = generateInviteCode()
  await setDoc(doc(db, "invites", code), {
    fromUid: me.uid,
    fromName: me.name,
    status: "pending",
    createdAt: serverTimestamp(),
  })
  return code
}

export async function redeemInvite(rawCode: string, me: { uid: string; name: string }): Promise<string> {
  const { db } = getFirebase()
  const code = rawCode.trim().toUpperCase()
  if (code.length !== CODE_LENGTH) {
    throw new Error(`Invite codes are ${CODE_LENGTH} characters long.`)
  }

  let coupleId = ""
  await runTransaction(db, async (tx) => {
    const inviteRef = doc(db, "invites", code)
    const inviteSnap = await tx.get(inviteRef)
    if (!inviteSnap.exists()) {
      throw new Error("That code doesn't exist. Double-check it and try again.")
    }
    const invite = inviteSnap.data() as { fromUid: string; fromName?: string; status: string }
    if (invite.status !== "pending") {
      throw new Error("That code has already been used.")
    }
    if (invite.fromUid === me.uid) {
      throw new Error("That's your own invite code — send it to your partner instead.")
    }

    const coupleRef = doc(collection(db, "couples"))
    coupleId = coupleRef.id
    tx.set(coupleRef, {
      members: [invite.fromUid, me.uid],
      memberNames: { [invite.fromUid]: invite.fromName ?? "Partner", [me.uid]: me.name },
      createdAt: serverTimestamp(),
      relationshipStart: null,
    })
    tx.update(inviteRef, { status: "accepted", acceptedBy: me.uid, coupleId: coupleRef.id })
    tx.set(doc(db, "users", me.uid), { coupleId: coupleRef.id }, { merge: true })
  })
  return coupleId
}
