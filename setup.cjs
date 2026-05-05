const fs = require('fs');
const path = require('path');

// 1. Criar .env.local
const envContent = `VITE_SUPABASE_URL=https://dgvxoaxmsghcvnmnnkev.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_UupXZwwnXstv1D77-FV5Kg_PsVTxvTq
`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ .env.local criado');

// 2. Criar pasta lib
const libDir = path.join('src', 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}
console.log('✅ Pasta src/lib criada');

// 3. Criar supabase.ts
const supabaseContent = `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
`;

fs.writeFileSync(path.join('src', 'lib', 'supabase.ts'), supabaseContent);
console.log('✅ src/lib/supabase.ts criado');

// 4. Criar vite-env.d.ts
const viteEnvContent = `/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
`;

fs.writeFileSync('vite-env.d.ts', viteEnvContent);
console.log('✅ vite-env.d.ts criado');

// 5. Criar .gitignore
const gitignoreContent = `.env.local
.env
node_modules
dist
.DS_Store
*.local
`;

fs.writeFileSync('.gitignore', gitignoreContent);
console.log('✅ .gitignore atualizado');

console.log('\n🎉 Setup completo! Todos os arquivos foram criados.');