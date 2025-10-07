import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function SignUp({ onSignUpSuccess, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    console.log('SignUp data:', data, 'Error:', error)

    if (error) setMessage(error.message)
    else if (data.user) {
      setUser(data.user) 
      onSignUpSuccess?.()
    } else {
      setMessage('Signup successful! Check your email to confirm.')
      onSignUpSuccess?.()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>
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
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign Up
      </button>
      {message && <p className="text-red-500">{message}</p>}
      <p>
        Already have an account?{' '}
        <button
          onClick={() => onSignUpSuccess?.()}
          className="text-blue-500 underline cursor-pointer"
        >
          Sign In
        </button>
      </p>
    </div>
  )
}
