// pages/tambah-profile/page.js
import { createClient } from "../utils/supabase/server";
import TambahProfileClient from "../componentUser/tambahprofile";
import { redirect } from "next/navigation";

export default async function TambahProfilePage() {
  const supabase = await createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    redirect("/login");
  }

  return <TambahProfileClient />;
}
