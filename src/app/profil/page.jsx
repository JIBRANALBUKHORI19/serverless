import ProfileClient from "../componentUser/ProfileUser"
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export const revalidate = 0;
 
export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    redirect("/login");
  }

  const user = userData.user;

  const { data: profile, error } = await supabase
    .from("profile")
    .select()
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
  }


  return (
    <div>
        <div >
        <ProfileClient
          nama={profile?.nama}
          email={profile?.email}
          alamat={profile?.alamat}
          telepon={profile?.telepon}
          gambar={profile?.gambar}
          deskripsi={profile?.deskripsi}
        />

        </div>
      </div>
    
  );
}
