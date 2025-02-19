// pages/tambah-profile/page.js
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import EditProfileUser from "../componentUser/editprofil";

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    redirect("/login");
  }

  return <EditProfileUser />;
}
