'use server'
import { startSession } from '@/lib/services/startSession'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/auth/getProfile'
export async function startSessionAction() {
  const profile = await getProfile()
  const session = await startSession(profile.id)
  console.log(session)
  redirect(`/session?sessionId=${session.sessionId}`)
}
