"use client";

import { useRouter } from "next/navigation";

export default function NavbarHome() {
  const router = useRouter();

  return (
    <nav className="bg-green-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/loginAdmin">
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1734459516/logo_navbar_bhsuhq.png"
              alt="Logo Hasil Tani"
              className="h-16 w-auto"
            />
          </a>
        </div>

        {/* Navigation Menu */}
        <div className="flex space-x-8 text-white font-medium">
          <button
            className="hover:text-gray-300 transition"
            onClick={() => router.push('/home')}
          >
            Home
          </button>
          <button
            className="hover:text-gray-300 transition"
            onClick={() => {
              const blogSection = document.getElementById("blog");
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Produk
          </button>

          <button
            className="hover:text-gray-300 transition"
            onClick={() => {
              const blogSection = document.getElementById("about");
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            About Us
          </button>
        </div>
      </div>
    </nav>
  );
}
