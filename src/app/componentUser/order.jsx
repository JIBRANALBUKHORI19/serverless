"use client";

import Navbar from "./searching";
import Sidebar from "./sidebar";

export default function OrderClient({ orders }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Layout utama dengan Sidebar dan Konten */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/5 min-h-screen bg-green-100">
          <Sidebar />
        </div>

        {/* Konten utama */}
        <div className="flex flex-col flex-grow p-6">
          <div className="w-full max-w-4xl bg-green-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Daftar Pesanan Anda
            </h1>

            {orders.length === 0 ? (
              <p className="text-center text-gray-600">Belum ada pesanan.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {orders.map((order) => {
                  // Menentukan warna latar belakang penuh berdasarkan status pesanan
                  let cardBackgroundColor = "bg-green-300"; // Hijau muda untuk yang sudah dikonfirmasi
                  let borderColor = "border-transparent"; // Tanpa border default
                  let textColor = "text-white"; // Warna teks default

                  if (order.status === "Menunggu Konfirmasi Admin") {
                    // Border biru untuk yang menunggu konfirmasi admin
                    borderColor = "border-blue-500";
                    cardBackgroundColor = "bg-blue-100"; // Biru muda
                    textColor = "text-gray-800"; // Teks gelap untuk kontras
                  } else if (order.status === "Menunggu Pembayaran") {
                    // Border oranye untuk yang menunggu pembayaran
                    borderColor = "border-orange-500";
                    cardBackgroundColor = "bg-orange-100"; // Oranye muda
                    textColor = "text-gray-800"; // Teks gelap untuk kontras
                  }

                  return (
                    <div
                      key={order.id}
                      className={`p-6 rounded-md border-2 shadow-md transform transition-all duration-300 cursor-pointer ${cardBackgroundColor} ${borderColor} border-l-4 hover:scale-105`}
                    >
                      <h2 className={`text-lg font-semibold ${textColor}`}>
                        Pesanan ID: {order.id}
                      </h2>
                      <p className={`${textColor}`}>
                        Total Harga: <span className="font-semibold">Rp {order.total_harga.toLocaleString()}</span>
                      </p>
                      <p className={`${textColor}`}>
                        Alamat Pengiriman: <span className="font-semibold">{order.alamat}</span>
                      </p>
                      <p className={`${textColor}`}>
                        Metode Pembayaran: <span className="font-semibold">{order.metode_pembayaran}</span>
                      </p>
                      <p className={`${textColor}`}>
                        Status: <strong className={`text-${order.status === "Menunggu Pembayaran" ? "orange" : order.status === "Menunggu Konfirmasi Admin" ? "blue" : "green"}-600`}>{order.status}</strong>
                      </p>
                      <p className="text-sm text-gray-500">
                        Dipesan pada: {new Date(order.created_at).toLocaleString()}
                      </p>

                      {/* Menambahkan detail produk yang dipesan */}
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-gray-700">Produk yang Dipesan:</h3>
                      {/* Cek apakah produk adalah objek atau array */}
                      {order.produk ? (
                        Array.isArray(order.produk) ? (
                          <ul className="list-inside list-disc text-gray-600">
                            {order.produk.map((product) => (
                              <li key={product.id} className="text-sm">
                                <span className="font-semibold">ID: {product.id}</span> - {product.nama}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-inside list-disc text-gray-600">
                            <li key={order.produk.id} className="text-sm">
                              <span className="font-semibold">ID: {order.produk.id}</span> - {order.produk.nama}
                            </li>
                          </ul>
                        )
                      ) : (
                        <p className="text-gray-500">Tidak ada produk dalam pesanan ini.</p>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
