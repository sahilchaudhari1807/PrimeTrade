import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../../api/axios'

export default function TaskForm({ onCreate }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    if (!data.title.trim()) return
    try {
      const res = await api.post('/tasks', data)
      onCreate(res.data)
      reset()
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed')
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-3 w-full"
    >
      <input
        {...register('title', { required: true })}
        placeholder="Task title"
        className="border p-2 rounded w-full"
      />

      <input
        {...register('description')}
        placeholder="Description (optional)"
        className="border p-2 rounded w-full"
      />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-indigo-600 text-white py-2 rounded w-full"
      >
        Add
      </button>
    </form>
  )
}
