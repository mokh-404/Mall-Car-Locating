import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yrbunyunyzsbksrwmpfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnVueXVueXpzYmtzcndtcGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTg2NzcsImV4cCI6MjA2MzMzNDY3N30.tMdiTzzQcpZcw1C9LZdi0DL9xWtRaMv-laTmypH556w';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on our schema
export type CarTable = {
  id: string;
  license_plate: string;
  location: string;
  image_url: string;
  extracted_text: string;
  created_at: string;
  nearest_gate_id: string;
};

export type GateTable = {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
};