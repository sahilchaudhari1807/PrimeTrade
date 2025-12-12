import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input {...register('email', { required: true })} type="email" className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email required</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input {...register('password', { required: true })} type="password" className="w-full border p-2 rounded" />
            {errors.password && <p className="text-red-500 text-sm mt-1">Password required</p>}
          </div>

          <button disabled={isSubmitting} className="w-full bg-green-600 text-white py-2 rounded">Sign in</button>
        </form>
      </div>
    </div>
  )
}
