import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded flex items-center justify-center text-white font-bold">P</div>
            <span className="text-lg font-semibold">PrimeTrade</span>
          </Link>

          <nav className="hidden md:flex gap-4 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-800">Home</Link>
            {user && <Link to="/dashboard" className="hover:text-gray-800">Dashboard</Link>}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-sm text-gray-700">Hi, <span className="font-medium">{user.name}</span></div>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow-sm">Logout</button>
              </div>

              {/* avatar / mobile menu */}
              <div className="relative md:hidden">
                <button onClick={() => setOpen(v => !v)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">{(user.name || 'U').charAt(0)}</span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                    <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                    <button onClick={() => { setOpen(false); handleLogout() }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hidden sm:inline">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white text-sm px-3 py-1 rounded shadow-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
