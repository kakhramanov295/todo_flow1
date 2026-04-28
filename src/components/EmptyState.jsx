import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon-container">
        <Sparkles size={32} />
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Your Flow is Clear</h3>
      <p style={{ maxWidth: '320px', lineHeight: '1.6', color: 'var(--text-dim)' }}>
        No tasks found in this view. Start something great by adding a task above.
      </p>
    </div>
  );
};
