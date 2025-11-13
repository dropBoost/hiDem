'use server'

import { redirect } from 'next/navigation'
import { supabase } from "@/lib/supabaseClient"
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function loginFormSubmit(formData) {

  const username = formData.get('username')
  const password = formData.get('password')

  if (username && password){
    console.log("complimenti")
  } else (
    console.log("coglione")
  )
  
}

export async function login(formData) {
  const supabase = await createClient()

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    redirect('/error?reason=missing_credentials')
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    redirect(`/error?reason=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    redirect('/error?reason=missing_credentials')
  }

  const { error } = await supabase.auth.signUp({ email, password })
  if (error) {
    redirect(`/error?reason=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login') // cambia se vuoi
}