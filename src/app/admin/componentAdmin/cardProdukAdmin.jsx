"use client"
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function ProdukTaniAdmin(props) {
    const {id, nama, deskripsi, harga, stok, gambar} = props

    return(
        <div className="block max-w-sm p-6 bg-white border 
        border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Link href={`/produk/${id}`}>
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
        </div>
    )
}