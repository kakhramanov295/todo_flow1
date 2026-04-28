import React from 'react';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { TaskSkeleton } from './Skeleton';

export const TaskList = ({ tasks, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="task-list">
        {[1, 2, 3, 4].map(i => <TaskSkeleton key={i} />)}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
