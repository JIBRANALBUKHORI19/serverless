'use client';
import { useRouter } from "next/navigation";

export default function ArtikelBuah() {
    const router = useRouter()
    return (
        <>
        <div 
                className="relative h-screen w-full bg-cover bg-center" 
                style={{ 
                    backgroundImage: 'url(https://res.cloudinary.com/dwmy3owh8/image/upload/v1735564849/freepik__create-a-detailed-arrangement-of-various-fruits-in__83724_u6snrc.jpg)' 
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
            <h1 className="text-center text-yellow-400 text-4xl font-extrabold mb-6">Buah-Buahan Lokal Berkualitas dari Banyuwangi</h1>
                <p className="mb-6 text-lg">Banyuwangi, yang dikenal sebagai The Sunrise of Java, bukan hanya memiliki pesona alam yang memukau, tetapi juga sumber daya pertanian yang melimpah. Salah satu produk unggulan daerah ini adalah buah-buahan lokal yang berkualitas tinggi. Beragam jenis buah-buahan tumbuh subur di tanah Banyuwangi berkat kondisi tanahnya yang subur dan iklimnya yang mendukung. Keunikan buah-buahan lokal Banyuwangi terletak pada rasanya yang khas serta proses penanamannya yang ramah lingkungan.</p>
                <p className="mb-6 text-lg">Salah satu buah andalan Banyuwangi adalah pisang mas Kirana. Pisang ini memiliki ukuran kecil dengan kulit berwarna kuning cerah, namun rasanya manis dan teksturnya lembut. Pisang mas Kirana bahkan telah diekspor ke berbagai negara, menunjukkan kualitasnya yang diakui secara internasional. Selain itu, ada manggis Banyuwangi yang memiliki daging buah putih bersih, manis, dan kaya akan nutrisi.</p>
                <p className="mb-6 text-lg">Jeruk keprok juga menjadi primadona di Banyuwangi. Jeruk ini memiliki rasa manis dan sedikit asam yang menyegarkan. Petani lokal memanfaatkan teknik budidaya alami untuk memastikan jeruk keprok Banyuwangi tetap organik dan sehat untuk dikonsumsi. Di pasar lokal, jeruk keprok sering menjadi pilihan utama bagi wisatawan yang ingin membawa oleh-oleh khas.</p>
                <p className="mb-6 text-lg">Keberhasilan petani Banyuwangi dalam menghasilkan buah-buahan berkualitas tidak lepas dari dukungan pemerintah daerah dan komunitas lokal. Program pelatihan pertanian modern serta penggunaan pupuk organik semakin meningkatkan hasil panen. Tidak hanya untuk pasar domestik, buah-buahan Banyuwangi kini mulai menembus pasar internasional, membawa nama baik daerah tersebut ke kancah global.</p>
                <p className="mb-6 text-lg">Dengan mengonsumsi buah-buahan lokal Banyuwangi, kita tidak hanya mendukung perekonomian petani lokal, tetapi juga memperoleh manfaat kesehatan dari buah-buahan segar yang kaya akan vitamin dan mineral. Jadi, jika Anda berkunjung ke Banyuwangi, jangan lupa mencicipi kelezatan buah-buahan lokal yang penuh dengan rasa dan kualitas terbaik!</p>
            </div>
        </div>
        </>
    );
}
