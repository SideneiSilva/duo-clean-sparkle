import { useState, useEffect } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'
import '../styles/TaskList.css'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addTask(e) {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const { error } = await supabase
        .from('tasks')
        .insert([{ title: newTask, status: 'pending' }])

      if (error) throw error
      setNewTask('')
      fetchTasks()
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
    }
  }

  async function deleteTask(id) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchTasks()
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  async function updateTaskStatus(id, newStatus) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchTasks()
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  if (!supabaseConfigured) {
    return (
      <div className="task-list">
        <h1>📋 Minhas Tarefas</h1>
        <p className="error">
          Erro de configuração: as variáveis de ambiente do Supabase não estão
          definidas.
        </p>
      </div>
    )
  }

  return (
    <div className="task-list">
      <h1>📋 Minhas Tarefas</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          className="task-input"
        />
        <button type="submit" className="btn-add">
          ➕ Adicionar
        </button>
      </form>

      {loading ? (
        <p className="loading">Carregando tarefas...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">Nenhuma tarefa ainda. Crie uma!</p>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item task-${task.status}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <small>Status: {task.status}</small>
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="completed">Concluída</option>
                </select>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn-delete"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}