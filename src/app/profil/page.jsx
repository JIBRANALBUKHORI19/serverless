// pages/profil.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import SearchItem from "../component/searching";
import Sidebar from "@/app/component/sidebar";

export default function Profile() {


  // State untuk menyimpan data profil pengguna
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [isEditing, setIsEditing] = useState(false); // Menandakan apakah form sedang dalam mode edit

  // Fungsi untuk menangani perubahan data
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  // Fungsi untuk menyimpan perubahan
  const handleSaveChanges = () => {
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
    // Di sini, Anda bisa menambahkan logika untuk mengirim data ke server
  };

  // Fungsi untuk navigasi ke halaman "Mulai Jual"

  return (
    <div>
      <SearchItem/>
      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div style={containerStyle}>
          <h1>Profil Pengguna</h1>

          <div style={profileContainerStyle}>
            {/* Nama */}
            <div style={profileItemStyle}>
              <label>Nama:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  style={inputStyle}
                />
              ) : (
                <p>{name}</p>
              )}
            </div>

            {/* Email */}
            <div style={profileItemStyle}>
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  style={inputStyle}
                />
              ) : (
                <p>{email}</p>
              )}
            </div>

            {/* Tombol untuk mengedit */}
            <div style={buttonContainerStyle}>
              {isEditing ? (
                <>
                  <button onClick={handleSaveChanges} style={buttonStyle}>
                    Simpan
                  </button>
                  <button onClick={() => setIsEditing(false)} style={buttonStyle}>
                    Batal
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} style={buttonStyle}>
                  Edit Profil
                </button>
              )}
              {/* Tombol Mulai Jual */}
            <Link href="/admin/profiladmin" style={buttonStyle}>
              admin
            </Link>
            </div>
          </div>
        </div>
       </div> 
    </div>
  );
}

// Styling
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const profileContainerStyle = {
  marginTop: '20px',
};

const profileItemStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '300px',
};

const buttonContainerStyle = {
  marginTop: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};
