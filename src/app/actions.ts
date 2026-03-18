'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function addToWaitlist(formData: FormData) {
  const email = formData.get('email') as string

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' }
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials are missing in environment variables.')
    return { error: 'Server configuration error. Please try again later.' }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      console.error('Supabase error:', error)
      if (error.code === '23505') {
        return { error: 'You are already on the waitlist!' }
      }
      return { error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Waitlist exception:', err)
    return { error: 'Something went wrong. Please try again later.' }
  }
}
