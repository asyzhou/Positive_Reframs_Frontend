import { createClient } from '@supabase/supabase-js'


const URL = 'https://sdifbbloqkkoieptcckg.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkaWZiYmxvcWtrb2llcHRjY2tnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjAwODk2MCwiZXhwIjoxOTk3NTg0OTYwfQ.NIiEkHGJGUlo-m3my2KKgvb-q3mmengrv0HuxC9UhkY';

export const supabase = createClient(URL, API_KEY);