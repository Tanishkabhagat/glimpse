import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import CustomCursor from '../components/CustomCursor'


const AdminPage = () => {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLinks = async () => {
      let { data: links, error } = await supabase
        .from('links')
        .select('*')
      if (error) {
        console.log('Error fetching links:', error)
      } else {
        setLinks(links)
      }
    }
    fetchLinks()
  }, [])

  const handleAddLink = async () => {
    if (!newLink || !newTitle) {
      setError('Please enter both a title and a valid link.')
      return
    }

    const { data, error } = await supabase
      .from('links')
      .insert([{ title: newTitle, url: newLink }])

    if (error) {
      setError('Failed to add link: ' + error.message)
    } else {
      setLinks([...links, ...data])
      setNewLink('')
      setNewTitle('')
      setError('')
    }
  }

  const handleDeleteLink = async (id) => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)

    if (error) {
      console.log('Error deleting link:', error)
    } else {
      setLinks(links.filter(link => link.id !== id))
    }
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-[#0d0d2b] p-4">
      <CustomCursor/>    
      {/* Starry background */}
      <div className="absolute inset-2 z-2">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Simple "stars" using multiple tiny divs */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full inset-1"
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
        </div>
      </div>
      <div className="absolute inset-1 bg-gradient-to-t from-blue-900/10 via-blue-950/40 to-gray-950" />
          <div className="absolute inset-0 bg-[url('/night-sky.jpg')] bg-cover bg-center opacity-50" />
       

      {/* Main content */}
      <div className="relative z-10 max-w-3xl w-full bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white ">Admin Dashboard</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-lg font-medium text-white mb-2">Video Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <div>
            <label className="block text-lg font-medium  text-white mb-2">Video Link</label>
            <input
              type="text"
              placeholder="Enter new video link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>

          <button
            onClick={handleAddLink}
             className="w-full bg-white text-gray-900 py-3 rounded-lg mt-4 hover:bg-gray-300 font-semibold transition"
          >
            Add New Link
          </button>
        </div>

        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="flex items-center bg-gray-100 p-4 rounded-lg space-x-4">
              <button
                onClick={() => window.open(link.url, '_blank')}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-left"
              >
                {link.title}
              </button>
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tiny star twinkle animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default AdminPage
