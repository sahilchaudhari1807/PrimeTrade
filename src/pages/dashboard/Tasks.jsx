import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import TaskForm from './TaskForm'
import { HiOutlineTrash, HiOutlineCheck, HiOutlineRefresh } from 'react-icons/hi'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const fetchTasks = async (q = '') => {
    setLoading(true)
    try {
      const res = await api.get('/tasks', { params: { q } })
      setTasks(res.data || [])
    } catch (err) {
      alert('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete task?')) return
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  const toggleComplete = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed })
      setTasks(prev => prev.map(t => t._id === task._id ? res.data : t))
    } catch (err) {
      alert('Update failed')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks" className="flex-1 sm:w-72 border p-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          <button onClick={() => fetchTasks(query)} className="bg-gray-700 text-white px-3 py-2 rounded">Search</button>
          <button onClick={() => { setQuery(''); fetchTasks('') }} className="bg-gray-100 px-3 py-2 rounded">Clear</button>
        </div>

        <div id="add-task" className="w-full sm:w-auto">
          <TaskForm onCreate={task => setTasks(prev => [task, ...prev])} />
        </div>
      </div>

      {loading ? <div className="py-8 text-center text-gray-500">Loading tasks…</div> : (
        <ul className="space-y-3">
          {tasks.length === 0 && <li className="text-gray-500">No tasks yet — create one above.</li>}
          {tasks.map(t => (
            <li key={t._id} className="flex items-center justify-between gap-4 border p-3 rounded hover:shadow">
              <div>
                <div className={`font-medium ${t.completed ? 'line-through text-gray-400' : ''}`}>{t.title}</div>
                {t.description && <div className="text-sm text-gray-600 mt-1">{t.description}</div>}
                <div className="mt-2 text-xs flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${t.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {t.completed ? 'Completed' : 'Pending'}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{new Date(t.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button title="Toggle complete" onClick={() => toggleComplete(t)} className="p-2 rounded border hover:bg-gray-50">
                  <HiOutlineCheck className="w-5 h-5 text-indigo-600" />
                </button>
                <button title="Delete" onClick={() => handleDelete(t._id)} className="p-2 rounded border hover:bg-gray-50">
                  <HiOutlineTrash className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
