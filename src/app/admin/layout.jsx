import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }) {
  // Membuat instance client Supabase
  const supabase = await createClient()

  // Mendapatkan data user yang sedang login
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect ke halaman login jika user belum login
  if (!user) {
    redirect('/loginAdmin')
  }

  // Mendapatkan data role user dari tabel roles
  const { data: roleData } = await supabase
    .from('roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  // Redirect ke home jika user bukan admin
  if (!roleData || roleData.role !== 'admin') {
    redirect('/home')
  }

  return <>{children}</>
}
