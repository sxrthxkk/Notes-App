import { supabase } from './supabaseClient'

export default function Dashboard({ user, onSignOut }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onSignOut?.()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  )
}

