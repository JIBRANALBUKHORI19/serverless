import Link from 'next/link';

export default function Keranjang() {
    return(
        <>
        <div>
            <h1>Keranjang Belanja</h1>
        </div>
        <Link href="/transaksi">
            <button>Check Out</button>
        </Link>
        </>
    )
}