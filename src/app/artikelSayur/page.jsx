'use client';
import { useRouter } from "next/navigation";

export default function ArtikelSayur() {
    const router = useRouter()
    return (
        <>
        <div 
                className="relative h-screen w-full bg-cover bg-center" 
                style={{ 
                    backgroundImage: 'url(https://res.cloudinary.com/dwmy3owh8/image/upload/v1735564850/freepik__a-variety-of-fresh-vegetables-displayed-on-a-woode__83725_fsaelp.jpg)' 
                }}
            ></div>
        <div 
            className="font-sans p-5 leading-relaxed text-white min-h-screen flex items-center justify-center bg-gradient-to-b from-black/70 via-black/50 to-black/70" 
            style={{ 
                backgroundImage: 'url(https://res.cloudinary.com/dwmy3owh8/image/upload/v1734459517/logo_aja_wtwiwu.png)', 
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center' 
            }}
        >
            {/* Tombol Kembali ke Halaman Utama */}
            <button 
                onClick={() => router.push("/")} 
                className="absolute top-4 left-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                Kembali ke Halaman Utama
            </button>

            {/* Konten Artikel */}
            <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl">
            <h1 className="text-center text-yellow-400 text-4xl font-extrabold mb-6">Sayur-Sayuran Lokal Berkualitas dari Banyuwangi</h1>
                <p className="mb-6 text-lg">Banyuwangi, yang dikenal dengan keindahan alamnya, juga menyimpan kekayaan hasil pertanian yang luar biasa. Selain buah-buahan, daerah ini juga terkenal dengan sayur-sayuran lokal yang berkualitas tinggi. Tanah yang subur dan iklim tropis yang mendukung menjadikan Banyuwangi sebagai tempat yang ideal untuk berbagai jenis sayur-sayuran tumbuh subur.</p>
                <p className="mb-6 text-lg">Salah satu sayuran unggulan dari Banyuwangi adalah kangkung. Kangkung Banyuwangi dikenal memiliki daun yang lebar dan tekstur yang empuk, serta rasa yang lebih manis dibandingkan dengan kangkung dari daerah lain. Tanaman ini tumbuh subur di kawasan dataran rendah yang memiliki sumber air melimpah, menjadikannya pilihan utama di pasar lokal maupun regional.</p>
                <p className="mb-6 text-lg">Selain kangkung, sayuran lain yang populer adalah bayam. Bayam dari Banyuwangi memiliki warna hijau yang lebih segar dan rasa yang lebih lezat. Sayuran ini tumbuh dengan cara organik, menggunakan pupuk alami yang membuatnya lebih sehat dan ramah lingkungan. Bayam Banyuwangi sangat diminati karena kandungan gizi yang tinggi, terutama zat besi dan vitamin A yang bermanfaat untuk kesehatan tubuh.</p>
                <p className="mb-6 text-lg">Banyuwangi juga dikenal dengan keberagaman sayur lodeh, seperti terong, labu, dan kacang panjang. Semua sayur ini ditanam dengan metode yang mempertahankan keseimbangan alam, sehingga kualitasnya terjaga dengan baik. Terong Banyuwangi misalnya, memiliki daging yang lembut dan rasa yang lebih manis. Kacang panjang Banyuwangi pun terkenal dengan bentuknya yang lebih panjang dan tekstur yang renyah, membuatnya sangat pas untuk dimasak dalam berbagai hidangan tradisional.</p>
                <p className="mb-6 text-lg">Keberhasilan petani di Banyuwangi dalam menghasilkan sayur-sayuran berkualitas ini berkat perhatian pemerintah daerah terhadap pertanian organik. Program pelatihan bagi petani serta penggunaan teknik pertanian ramah lingkungan semakin meningkatkan kualitas produk pertanian mereka. Hal ini tidak hanya mendukung ketahanan pangan lokal, tetapi juga membuka peluang ekspor untuk sayur-sayuran dari Banyuwangi.</p>
                <p className="mb-6 text-lg">Dengan mengonsumsi sayur-sayuran lokal dari Banyuwangi, kita turut serta mendukung perekonomian petani lokal dan menikmati sayuran segar yang kaya akan nutrisi. Jadi, jika Anda berkunjung ke Banyuwangi, pastikan untuk mencicipi kelezatan sayuran segar yang penuh rasa dan kualitas terbaik!</p>
             </div>
        </div>
        </>
    );
}
