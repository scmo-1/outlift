'use server'
import { redirect } from 'next/navigation'
import { getSupabase } from '@/lib/DB/utils'

export async function login(formData: FormData) {
  const supabase = await getSupabase()

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(error.message)

  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await getSupabase()

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const username = String(formData.get('username') ?? '')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })

  if (error) throw new Error(error.message)

  redirect('/')
}

export async function logout() {
  const supabase = await getSupabase()
  await supabase.auth.signOut()
  redirect('/login')
}
