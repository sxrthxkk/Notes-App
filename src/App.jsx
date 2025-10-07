import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from './Dashboard'

export default function App() {
  const [user, setUser] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user || null)
    }
    getSession()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (user) return <Dashboard user={user} onSignOut={() => setUser(null)} />

  return showSignUp ? (
    <SignUp onSignUpSuccess={() => setShowSignUp(false)} setUser={setUser} />
  ) : (
    <SignIn 
      onSignInSuccess={setUser} 
      onSwitchToSignUp={() => setShowSignUp(true)} 
    />
  )
}
