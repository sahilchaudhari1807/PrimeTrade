import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../../api/axios'

export default function TaskForm({ onCreate }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    if (!data.title || data.title.trim() === '') return
    try {
      const res = await api.post('/tasks', data)
      onCreate(res.data)
      reset()
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center">
      <input {...register('title', { required: true })} placeholder="Task title" className="flex-1 border p-2 rounded focus:outline-none" />
      <input {...register('description')} placeholder="Description (optional)" className="flex-1 border p-2 rounded focus:outline-none hidden md:inline-block" />
      <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  )
}
