import React from 'react';

export const Skeleton = ({ className, style }) => {
  return <div className={`skeleton ${className}`} style={style} />;
};

export const TaskSkeleton = () => (
  <div className="task-item" style={{ borderStyle: 'dashed', opacity: 0.5 }}>
    <div className="task-content" style={{ width: '100%' }}>
      <Skeleton className="skeleton-avatar" style={{ borderRadius: '6px', width: '1.5rem', height: '1.5rem' }} />
      <Skeleton className="skeleton-text" style={{ width: '40%' }} />
    </div>
    <div className="task-actions">
      <Skeleton className="skeleton-avatar" style={{ width: '2rem', height: '2rem', borderRadius: '8px' }} />
      <Skeleton className="skeleton-avatar" style={{ width: '2rem', height: '2rem', borderRadius: '8px' }} />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="app-container">
    <div className="header" style={{ opacity: 0.7 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Skeleton className="skeleton-avatar" style={{ width: '3rem', height: '3rem', borderRadius: '10px' }} />
        <div>
          <Skeleton className="skeleton-text" style={{ width: '100px', height: '1.5rem', marginBottom: '0.5rem' }} />
          <Skeleton className="skeleton-text" style={{ width: '150px', height: '0.8rem' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Skeleton className="skeleton-avatar" style={{ width: '120px', height: '2.5rem', borderRadius: '12px' }} />
        <Skeleton className="skeleton-avatar" style={{ width: '80px', height: '2.5rem', borderRadius: '12px' }} />
      </div>
    </div>
    <main>
      <Skeleton className="skeleton-text" style={{ width: '150px', marginBottom: '2rem' }} />
      <div className="input-container" style={{ borderStyle: 'dashed', opacity: 0.5 }}>
        <Skeleton style={{ flex: 1, height: '3.5rem', borderRadius: '12px' }} />
        <Skeleton style={{ width: '120px', height: '3.5rem', borderRadius: '12px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Skeleton className="skeleton-btn" />
          <Skeleton className="skeleton-btn" />
          <Skeleton className="skeleton-btn" />
        </div>
        <Skeleton className="skeleton-text" style={{ width: '60px' }} />
      </div>
      <div className="task-list">
        {[1, 2, 3, 4].map(i => <TaskSkeleton key={i} />)}
      </div>
    </main>
  </div>
);
