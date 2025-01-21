"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminOrderPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const supabase = createClient();

  // Fetch orders that are waiting for admin confirmation
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("transaksi")
        .select("*")
        .in("status", ["Menunggu Konfirmasi Admin", "Menunggu Pembayaran"]);

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, [supabase]);

  const handleConfirm = async (orderId) => {
    const { error } = await supabase
      .from("transaksi")
      .update({ status: "Dikonfirmasi" })
      .eq("id", orderId);

    if (error) {
      console.error("Error confirming order:", error.message);
    } else {
      alert("Pesanan berhasil dikonfirmasi!");
      setOrders(orders.filter((order) => order.id !== orderId)); // Remove confirmed order
    }
  };

  const handlePaymentConfirm = async (orderId) => {
    const { error } = await supabase
      .from("transaksi")
      .update({ status: "Pembayaran Diterima" })
      .eq("id", orderId);

    if (error) {
      console.error("Error confirming payment:", error.message);
    } else {
      alert("Pembayaran berhasil diterima!");
      setOrders(orders.filter((order) => order.id !== orderId)); // Remove confirmed order
    }
  };

  const handleBack = () => {
    router.push("/admin/homeadmin");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Pesanan Menunggu Konfirmasi</h1>
      <button
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Kembali ke Home
        </button>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Tidak ada pesanan yang menunggu konfirmasi.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-lg shadow-md border-l-4"
              style={{
                borderColor: order.status === "Menunggu Konfirmasi Admin" ? "blue" : "orange",
              }}
            >
              <h2 className="text-lg font-semibold">Pesanan ID: {order.id}</h2>
              <p>Total Harga: Rp {order.total_harga.toLocaleString()}</p>
              <p>Alamat Pengiriman: {order.alamat}</p>
              <p>Metode Pembayaran: {order.metode_pembayaran}</p>
              <p>Status: <strong>{order.status}</strong></p>
              <p className="text-sm text-gray-500">
                Dipesan pada: {new Date(order.created_at).toLocaleString()}
              </p>

              {order.status === "Menunggu Konfirmasi Admin" && (
                <button
                  onClick={() => handleConfirm(order.id)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Konfirmasi Pesanan
                </button>
              )}

              {order.status === "Menunggu Pembayaran" && (
                <button
                  onClick={() => handlePaymentConfirm(order.id)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Konfirmasi Pembayaran
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
