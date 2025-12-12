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
    // allow wrap, make children shrink as needed
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-center gap-2">
      {/* flex-1 + min-w-0 lets input shrink instead of forcing overflow */}
      <input
        {...register('title', { required: true })}
        placeholder="Task title"
        className="flex-1 min-w-0 border p-2 rounded focus:outline-none"
      />

      {/* description will be hidden on very small screens, but shrink properly on larger */}
      <input
        {...register('description')}
        placeholder="Description (optional)"
        className="flex-1 min-w-0 border p-2 rounded focus:outline-none hidden md:inline-block"
      />

      {/* Add button shouldn't shrink */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-indigo-600 text-white px-4 py-2 rounded flex-shrink-0"
      >
        Add
      </button>
    </form>
  )
}
