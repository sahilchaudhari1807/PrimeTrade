import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function ProfileCard() {
  const { user, setUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const { register, handleSubmit, reset } = useForm({ defaultValues: { name: user?.name || '', email: user?.email || '' } })

  const onSubmit = async (data) => {
    try {
      const res = await api.put('/auth/me', data)
      setUser(res.data)
      setEditing(false)
      alert('Profile updated')
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    <div>
      {!editing ? (
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg">{(user?.name||'U').charAt(0)}</div>
            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <input {...register('name')} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input {...register('email')} className="w-full border p-2 rounded" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
            <button type="button" onClick={() => { setEditing(false); reset() }} className="px-3 py-1 border rounded">Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}
