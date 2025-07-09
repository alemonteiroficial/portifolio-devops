import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configuração do Supabase como banco principal
const SUPABASE_URL = 'https://txtqnsldwdjrhkgewock.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dHFuc2xkd2RqcmhrZ2V3b2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjU2MTcsImV4cCI6MjA2NzY0MTYxN30.5lu6iEBe8vVVtCroP76fR-X2e61QQRZH1-u93835t9A';

console.log('🔗 Conectando ao Supabase via API REST...');

// Função para fazer requisições ao Supabase
async function supabaseRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

// Cliente customizado para Supabase
export const supabase = {
  from: (table: string) => ({
    select: async (columns = '*') => {
      return supabaseRequest(`/${table}?select=${columns}`);
    },
    insert: async (data: any[]) => {
      return supabaseRequest(`/${table}`, {
        method: 'POST',
        headers: {
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data),
      });
    },
    update: async (data: any, filter: string) => {
      return supabaseRequest(`/${table}?${filter}`, {
        method: 'PATCH',
        headers: {
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data),
      });
    },
    delete: async (filter: string) => {
      return supabaseRequest(`/${table}?${filter}`, {
        method: 'DELETE',
      });
    },
  }),
};

// Manter conexão Neon como backup
neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
}

export { pool, db };

export const supabaseConfig = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY
};