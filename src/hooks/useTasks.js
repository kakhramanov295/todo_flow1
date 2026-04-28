import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title) => {
    if (!title.trim()) return;
    try {
      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const tempTask = { id: tempId, title, completed: false, isOptimistic: true };
      setTasks(prev => [...prev, tempTask]);

      const newTask = await taskService.createTask(title);
      setTasks(prev => prev.map(t => t.id === tempId ? newTask : t));
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
      fetchTasks(); // Revert on failure
    }
  };

  const toggleTask = async (id, currentStatus) => {
    try {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
      await taskService.updateTask(id, { completed: !currentStatus });
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      fetchTasks();
    }
  };

  const editTask = async (id, newTitle) => {
    if (!newTitle.trim()) return;
    try {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t));
      await taskService.updateTask(id, { title: newTitle });
    } catch (err) {
      setError('Failed to edit task');
      console.error(err);
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    const cleanId = id?.toString().trim();
    
    if (!cleanId || cleanId.startsWith('temp-')) {
      console.warn('useTasks: Skipping delete for temporary or empty ID:', id);
      return;
    }

    try {
      console.log('useTasks: Initiating delete for ID:', cleanId);
      // Optimistic update
      setTasks(prev => prev.filter(t => t.id !== id));
      
      await taskService.deleteTask(cleanId);
      console.log('useTasks: Delete confirmed for ID:', cleanId);
    } catch (err) {
      console.error('useTasks: Delete failed for ID:', cleanId, err);
      setError('Failed to delete task from server');
      fetchTasks(); // Revert on failure
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    refreshTasks: fetchTasks
  };
};
