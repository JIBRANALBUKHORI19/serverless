'use client';

import { useRouter } from "next/navigation";
import NavbarHome from "./componentUser/navbarHome";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Homepage() {
  const router = useRouter();

  return (
    <div className="w-full bg-gray-100">
      {/* Navbar */}
      <NavbarHome />

      {/* Banner */}
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dwmy3owh8/image/upload/v1735140821/Untitled-12_gqat0u.png')",
        }}
      ></div>

      {/* Blog Section */}
      <section id="blog" className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">-- PRODUK --</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
          {/* Blog Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1735564849/freepik__create-a-detailed-arrangement-of-various-fruits-in__83724_u6snrc.jpg"
              alt="Blog 1"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">BUAH-BUAHAN</h3>
              <p className="text-gray-600 mt-2">
                Baca selengkapnya untuk mengetahui kualitas pilihan terbaik dari produk yang kami jual.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => router.push("/artikelBuah")}
              >
                Baca Selengkapnya
              </button>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1735564850/freepik__a-variety-of-fresh-vegetables-displayed-on-a-woode__83725_fsaelp.jpg"
              alt="Blog 2"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">SAYUR-SAYURAN</h3>
              <p className="text-gray-600 mt-2">
              Baca selengkapnya untuk mengetahui kualitas pilihan terbaik dari produk yang kami jual.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => router.push("/artikelSayur")}
              >
                Baca Selengkapnya
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">-- About Us --</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
          Selamat datang di website kami! Kami menyediakan buah-buahan dan sayuran segar dengan kualitas terbaik yang berasal dari daerah Banyuwangi. 
          Website ini dirancang untuk mempermudah petani dalam memasarkan hasil pertanian mereka, khususnya buah dan sayuran, 
          serta membantu konsumen mendapatkan produk berkualitas tinggi langsung dari sumbernya.
        </p>
        
        {/* Carousel Gambar */}
        <Swiper
  spaceBetween={10}  // Jarak antar slide
  slidesPerView={3}  // Menampilkan 3 gambar per slide
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
  }}
  loop={true}
  onInit={(swiper) => console.log('Swiper Initialized')}
  onSlideChange={() => console.log('Slide Changed')}
>

          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1736231967/medium-shot-young-asian-woman-farmer-overall-holding-basket-ripe-strawberries_oekpiq.jpg"
              alt="1"
              className="w-full h-48 object-cover rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1736231762/side-view-gardeners-walking-along-garden-beds-looking-each-other-talking_xbzpp9.jpg"
              alt="2"
              className="w-full h-48 object-cover rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1736232209/full-shot-asian-farmers-cultivating-crop-farm_hn46ga.jpg"
              alt="3"
              className="w-full h-48 object-cover rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1736232349/headshot-two-gardeners-harvesting-strawberries-greenhouse_bysndb.jpg"
              alt="4"
              className="w-full h-48 object-cover rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1736232397/medium-shot-two-farm-coworkers-facing-camera-standing-greenhouse-looking-screen-tablet-pc_sg0f51.jpg"
              alt="5"
              className="w-full h-48 object-cover rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1736232598/WhatsApp_Image_2025-01-07_at_13.48.51_e5155b28_x7bbe1.jpg"
              alt="6"
              className="w-full h-48 object-cover rounded-md"
            />
          </SwiperSlide>
        </Swiper>
        
        <p className="text-center text-gray-700 max-w-2xl mx-auto mt-8">
          Kami ingin membantu petani lokal di Banyuwangi untuk memasarkan hasil pertanian mereka secara lebih luas, 
          sekaligus memberikan kemudahan bagi konsumen untuk membeli produk pertanian yang segar dan berkualitas. 
          Dengan website ini, kami berharap dapat memperkuat perekonomian lokal dan meningkatkan kesejahteraan petani di Banyuwangi. 
          Temukan berbagai produk buah dan sayuran yang kami tawarkan, dan nikmati pengalaman berbelanja yang mudah dan nyaman!
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} HASIL TANI. All rights reserved.
          </p>
          <p className="text-sm">
            Profil owner
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/cici052_?igsh=MTc2cXJjYnYwMjQ3eg=="
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
              CICI
            </a>
            <a
              href="https://www.instagram.com/whangss.0?igsh=Y2JhaWRhb3Q0dTFw"
              className="text-gray-400 hover:text-white transition"
              aria-label="Twitter"
            >
              NAWANG
            </a>
            <a
              href="https://www.instagram.com/iibaaaannnn_/profilecard/?igsh=bXV0YzYwenQyMXJz"
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              JIBRAN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
