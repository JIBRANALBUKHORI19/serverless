"use client"
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function ProdukTani(props) {
    const router = useRouter()
    const {nama, deskripsi, harga, stok, gambar} = props

    return(
        <div className="block max-w-sm p-6 bg-white border 
        border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Link href={`/produk/${nama}`}>
            <div >
            <CldImage className="rounded-full"
            src={gambar}
            width="215"
            height="125"
            crop={{
                type : 'auto',
                source : true
            }}
            />
            <h1 className="justify-center text-xl font-semibold">{nama}</h1>
                    <p>Harga          : Rp.{harga}</p>
                    {stok > 0 ?
                    
                    <p>Stok           : {stok}</p> :
                    null
                }
                    <p>{deskripsi}</p>
        </div>
        </Link>
            <div className="m-4">
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 
                me-2 mb-2 dark:focus:ring-yellow-900"
                onClick={() => router.push('/user/keranjang')}>keranjang</button>
                
                <button className="focus:outline-none text-white 
                bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => router.push('/transaksi')}>Beli</button>
            </div>
        </div>
    )
}