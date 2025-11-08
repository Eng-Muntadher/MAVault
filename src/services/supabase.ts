import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://peyltusqwfaezuhrfece.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleWx0dXNxd2ZhZXp1aHJmZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzUzNzYsImV4cCI6MjA3ODExMTM3Nn0.8pSd1bIlWfLORvy1mMhIVzMMAmNGYFWKMEL87MCopzc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
