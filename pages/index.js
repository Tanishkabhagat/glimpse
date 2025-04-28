import { useState } from 'react'
import { useRouter } from 'next/router'
import CustomCursor from '../components/CustomCursor'


const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'hello' // Use environment variable for password

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (password === ADMIN_PASSWORD) {
      router.push('/admin')  // Redirect to admin page
    } else {
      setError('Incorrect password, try again!')
    }

    setLoading(false)
  }

  const handleGuestLogin = () => {
    router.push('/view')  // Redirect to guest view
  }

  return (
    
    <div  className="relative min-h-screen flex justify-center items-center overflow-hidden bg-gray-950 p-4 cursor-none">
      <CustomCursor/> 
      {/* Simple "stars" using multiple tiny divs */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random(),
            animation: `twinkle ${Math.random() * 5 + 5}s infinite ease-in-out`
          }}
        />
      ))}

      {/* Base dark background */}
      <div className="absolute inset-0 bg-[url('/night-sky.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-blue-950/40 to-gray-950" />

      {/* First star layer */}
      <div className="absolute inset-0 bg-[url('/night-sky1.png')] bg-cover bg-center opacity-100 animate-twinkle1" />

      {/* Second star layer */}
      <div className="absolute inset-0 bg-[url('/night-sky2.png')] bg-cover bg-center opacity-0 animate-twinkle2" />

      {/* Third star layer */}
      <div className="absolute inset-0 bg-[url('/night-sky3.png')] bg-cover bg-center opacity-0 animate-twinkle3" />

      {/* Login box */}
      <div className="relative z-10 max-w-md w-full backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl text-white font-bold text-center mb-6">Welcome</h1>

        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        {/* Admin + Guest Buttons */}
        {!showPasswordInput && (
          <div className="mb-6 text-center space-y-4">
            <button
              onClick={() => setShowPasswordInput(true)}
              className="bg-white text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-300 w-full font-semibold transition cursor-none"
            >
              Admin Login
            </button>

            <button
              onClick={handleGuestLogin}
              className="bg-white text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-300 w-full font-semibold transition cursor-none"
            >
              Guest View
            </button>
          </div>
        )}

        {/* Admin Login (password input) */}
        {showPasswordInput && (
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
              <input
                id="password"
                type="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError('')  // clear error on typing
                }}
                
                
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-white text-gray-900 py-3 rounded-lg mt-4 hover:bg-gray-300 font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes twinkle1 {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        @keyframes twinkle2 {
          0%, 25%, 75%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes twinkle3 {
          0%, 50%, 100% { opacity: 0.6; }
          25%, 75% { opacity: 0.2; }
        }
        .animate-twinkle1 {
          animation: twinkle1 10s infinite ease-in-out;
        }
        .animate-twinkle2 {
          animation: twinkle2 10s infinite ease-in-out;
        }
        .animate-twinkle3 {
          animation: twinkle3 10s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
