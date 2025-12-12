import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register: registerUser } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <input {...register('name', { required: true })} className="w-full border p-2 rounded" />
            {errors.name && <p className="text-red-500 text-sm mt-1">Name required</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input {...register('email', { required: true })} type="email" className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email required</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input {...register('password', { required: true, minLength: 6 })} type="password" className="w-full border p-2 rounded" />
            {errors.password && <p className="text-red-500 text-sm mt-1">Password must be 6+ chars</p>}
          </div>

          <button disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded">Create account</button>
        </form>
      </div>
    </div>
  )
}
