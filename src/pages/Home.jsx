import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">Welcome to the assignment starter</h1>

      <div className="flex gap-3">
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Get started</Link>
        <Link to="/dashboard" className="bg-gray-200 px-4 py-2 rounded">View Dashboard</Link>
      </div>
    </div>
  )
}
