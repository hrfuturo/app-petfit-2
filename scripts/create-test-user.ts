import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'usuarioteste@gmail.com',
      password: '123456',
      email_confirm: true
    })

    if (error) {
      console.error('❌ Erro ao criar usuário:', error.message)
      return
    }

    console.log('✅ Usuário de teste criado com sucesso!')
    console.log('📧 Email: usuarioteste@gmail.com')
    console.log('🔑 Senha: 123456')
    console.log('🆔 User ID:', data.user.id)
  } catch (err) {
    console.error('❌ Erro:', err)
  }
}

createTestUser()
