import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'  // Make sure to import your Supabase client
import CustomCursor from '../components/CustomCursor'


export default function ViewPage() {
  const [videos, setVideos] = useState([]) // Store video data
  const [loading, setLoading] = useState(true) // To show loading state

  // Fetch videos from Supabase when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('videos') // Make sure your table is named 'videos'
        .select('*') // Adjust this if you need specific fields
        .order('created_at', { ascending: false }) // Adjust ordering as necessary

      if (error) {
        console.error('Error fetching videos:', error)
      } else {
        setVideos(data)
      }
      setLoading(false)
    }

    fetchVideos()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 cursor-none">
      <CustomCursor/> 
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[url('/night-sky.jpg')] bg-cover bg-center opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-blue-950/40 to-gray-950" />

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

      {/* First star layer */}
      <div className="absolute inset-0 bg-[url('/night-sky1.png')] bg-cover bg-center opacity-100 animate-twinkle1" />

      {/* Second star layer */}
      <div className="absolute inset-0 bg-[url('/night-sky2.png')] bg-cover bg-center opacity-0 animate-twinkle2" />

      {/* Third star layer */}
      <div className="absolute inset-0 bg-[url('/night-sky3.png')] bg-cover bg-center opacity-0 animate-twinkle3" />

      {/* Centered blur box */}
      <div className="relative flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-white text-center ">Family Videos</h1>
          
          {loading ? (
            <div className="text-white text-center">Loading videos...</div>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <a
                  key={video.id} // Ensure 'id' is a valid field in your videos table
                  href={video.url} // Make sure your 'url' field has the video URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-none block text-center w-full bg-white text-gray-900 py-3 rounded-lg mt-4 hover:bg-gray-300 font-semibold transition"
                >
                  {video.title} {/* Assuming 'title' is a field in your videos table */}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Twinkle animations */}
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
