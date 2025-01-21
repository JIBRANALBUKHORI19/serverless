"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaEye } from "react-icons/fa"; // Import ikon dari react-icons

export default function Navbar() {
    const router = useRouter();
    const [nama, setNama] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulasi status login (ganti dengan logika aktual dari auth)

    return (
        <nav className="bg-green-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center">
                    <a href="/">
                        <img
                            src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1734459516/logo_navbar_bhsuhq.png"
                            alt="Logo Hasil Tani"
                            className="h-16 w-auto"
                        />
                    </a>
                </div>

                {/* Search Bar */}
                <div className="w-1/3">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full border rounded-md p-2 pl-4"
                            placeholder="Searching Buah Atau Sayur"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md"
                            onClick={() => router.push(`/kategorinama/${nama}`)}
                        >
                            Cari
                        </button>
                    </div>
                </div>

                {/* Profil dan Keranjang */}
                <div className="flex space-x-4">
                        <>
                            {/* Ikon Keranjang */}
                            <button
                                className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
                                onClick={() => router.push(`/keranjang`)}
                            >
                                <FaShoppingCart className="text-lg" />
                            </button>

                            {/* Ikon Profil */}
                            <button
                                className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-blue-700"
                                onClick={() => router.push(`/vieworder`)}
                            >
                                <FaEye className="text-lg" />
                            </button>

                            {/* Ikon Profil */}
                            <button
                                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                onClick={() => router.push(`/profil`)}
                            >
                                <FaUser className="text-lg" />
                            </button>
                        </>
                </div>
            </div>
        </nav>
    );
}
