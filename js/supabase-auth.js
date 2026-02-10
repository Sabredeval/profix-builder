import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufjwmzhnoinxbdcaoucw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmandtemhub2lueGJkY2FvdWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTg1OTUsImV4cCI6MjA4NTYzNDU5NX0.5ZJpbFSR2-DhBGBQVQAq94I02PpJQqa-iuN4yQxvGLg';
const supabase = createClient(supabaseUrl, supabaseKey);

export const auth = {
  async login(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return user;
  },
  
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
  
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  }
};