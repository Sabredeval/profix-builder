import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grffvgtgvtcoiaegadap.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZmZ2Z3RndnRjb2lhZWdhZGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjg0NTcsImV4cCI6MjA1OTYwNDQ1N30.DJtyW5sRugSeIy_m0PRRpxU86UAjcMjxBh0gTQbIT4k';
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