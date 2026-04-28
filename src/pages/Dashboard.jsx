import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { FilterBar } from '../components/FilterBar';
import { TaskList } from '../components/TaskList';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { 
    tasks, 
    loading, 
    error, 
    filter, 
    setFilter, 
    addTask, 
    toggleTask, 
    editTask, 
    deleteTask 
  } = useTasks();
  
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsSubmitting(true);
    await addTask(inputValue);
    setInputValue('');
    setIsSubmitting(false);
  };

  if (!user) return null;

  return (
    <div className="app-container">
      <Header />
      
      <main>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
          <Sparkles size={18} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Your Workspace</span>
        </div>

        <form className="input-container" onSubmit={handleAddTask}>
          <input 
            type="text" 
            className="task-input" 
            placeholder="Add a new task to your flow..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSubmitting}
            style={{ height: '3.5rem' }}
          />
          <button 
            type="submit" 
            className="add-btn"
            disabled={!inputValue.trim() || isSubmitting}
            style={{ padding: '0 2rem' }}
          >
            <Plus size={20} />
            Add Task
          </button>
        </form>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <TaskList 
          tasks={tasks} 
          loading={loading && tasks.length === 0} 
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
};
