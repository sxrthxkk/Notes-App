import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function SignIn({ onSignInSuccess, onSwitchToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('SignIn data:', data, 'Error:', error)

    if (error) setMessage(error.message)
    else if (data.user) onSignInSuccess(data.user)
    else setMessage('Login failed, try again.')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignIn}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign In
      </button>
      {message && <p className="text-red-500">{message}</p>}
      <p>
        Don't have an account?{' '}
        <button
          onClick={onSwitchToSignUp}
          className="text-blue-500 underline cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </div>
  )
}
