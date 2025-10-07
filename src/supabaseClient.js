
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mfmundxeyptsmmufnrvs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbXVuZHhleXB0c21tdWZucnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3ODI0NzIsImV4cCI6MjA3NTM1ODQ3Mn0.AAlffzr8hucFjJyhWcDWDXwq1hlrvTGHGyaZ8055rGo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
