"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
    const router = useRouter()
    const [nama, setNama] = useState("")

    return (
        <nav className="bg-green-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                <div className="flex items-center">
                    <a href="/">
                        <img
                            src="https://res.cloudinary.com/dp5fubzft/image/upload/v1728824757/logo-removebg-preview_g76l4x.png"
                            alt="Logo Mandala Budaya"
                            className="h-10 w-auto"
                        />
                    </a>
                </div>

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

                <div className="flex space-x-4">
                    <button
                        className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100"
                        onClick={() => router.push(`/daftar`)}
                    >
                        Daftar
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={() => router.push(`/login`)}
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    )
}
