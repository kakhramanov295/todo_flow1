import React, { useState, useRef, useEffect } from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editValue.trim() && editValue !== task.title) {
      onEdit(task.id, editValue);
    } else {
      setEditValue(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button 
          className={`checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggle(task.id, task.completed)}
          aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        >
          {task.completed && <Check size={14} color="white" strokeWidth={3} />}
        </button>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex' }}>
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              className="edit-input"
            />
          </form>
        ) : (
          <span className="task-text" title={task.title}>
            {task.title}
          </span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <button className="action-btn" onClick={() => setIsEditing(false)} aria-label="Cancel editing">
            <X size={16} />
          </button>
        ) : (
          <button className="action-btn" onClick={() => setIsEditing(true)} aria-label="Edit task">
            <Edit2 size={16} />
          </button>
        )}
        <button className="action-btn delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
