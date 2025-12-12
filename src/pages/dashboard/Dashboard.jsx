import React from 'react'
import Tasks from './Tasks'
import ProfileCard from './ProfileCard'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold text-gray-700">Quick Actions</h4>
              <p className="text-xs text-gray-500 mt-2">Create tasks and manage your profile</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href="#add-task" className="block text-sm bg-indigo-600 text-white px-3 py-2 rounded text-center">Add Task</a>
                <a href="#profile" className="block text-sm border px-3 py-2 rounded text-center">Edit Profile</a>
              </div>
            </div>

            <div id="profile" className="bg-white p-4 rounded-lg shadow-sm">
              <ProfileCard />
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <div className="text-sm text-gray-500">Manage tasks — create, update, delete</div>
            </div>

            <Tasks />
          </div>
        </main>
      </div>
    </div>
  )
}
