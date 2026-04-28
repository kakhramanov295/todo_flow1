import { supabase } from '../lib/supabase';

export const taskService = {
  getTasks: async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('taskService: Error fetching tasks:', error.message);
      throw error;
    }
    return data;
  },

  createTask: async (title) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { 
          title: title.trim(), 
          completed: false, 
          user_id: user.id 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('taskService: Error creating task:', error.message);
      throw error;
    }
    return data;
  },

  updateTask: async (id, updates) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('taskService: Error updating task:', error.message);
      throw error;
    }
    return data;
  },

  deleteTask: async (id) => {
    console.group('🛠️ Supabase Deletion Debug');
    console.log('Target ID:', id);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.groupEnd();
      throw new Error('User not authenticated');
    }

    // Explicitly using eq().eq() for maximum compatibility with RLS
    const { error, status, statusText } = await supabase
      .from('tasks')
      .delete({ count: 'exact' }) // Request exact count of deleted rows
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('❌ Supabase Delete Error:', error.message);
      console.groupEnd();
      throw error;
    }

    console.log('📡 Response Status:', status, statusText);
    console.log('✅ Deletion request completed');
    console.groupEnd();
    
    return id;
  }
};
