import os
import json

# Criar .env.local
env_content = """VITE_SUPABASE_URL=https://dgvxoaxmsghcvnmnnkev.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_UupXZwwnXstv1D77-FV5Kg_PsVTxvTq
"""

with open('.env.local', 'w', encoding='utf-8') as f:
    f.write(env_content)
print("✅ .env.local criado")

# Criar pasta lib
os.makedirs('src/lib', exist_ok=True)
print("✅ Pasta src/lib criada")

# Criar supabase.ts
supabase_content = """import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
"""

with open('src/lib/supabase.ts', 'w', encoding='utf-8') as f:
    f.write(supabase_content)
print("✅ src/lib/supabase.ts criado")

# Criar vite-env.d.ts
vite_env_content = """/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
"""

with open('vite-env.d.ts', 'w', encoding='utf-8') as f:
    f.write(vite_env_content)
print("✅ vite-env.d.ts criado")

# Criar .gitignore (adicionar .env.local)
gitignore_content = """.env.local
.env
node_modules
dist
.DS_Store
*.local
"""

with open('.gitignore', 'w', encoding='utf-8') as f:
    f.write(gitignore_content)
print("✅ .gitignore atualizado")

print("\n🎉 Setup completo! Todos os arquivos foram criados.")