import Link from "next/link"


export default function Transaksi () {
    return(
        <>
       <div>
        <h1> Halaman Transaksi</h1>
        <Link href="/vieworder">buat pesanan</Link>
       </div>
        </>
    )
}