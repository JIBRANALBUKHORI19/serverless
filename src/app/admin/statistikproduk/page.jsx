"use client";
import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Styled Components
const DashboardGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ConsolidatedCard = styled.div`
  background-color: #f2f2f2;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const CardItem = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

const CardValue = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #1c8c6c;
`;

const SummaryPieChart = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export default function Statistik() {
  const [dashboardData, setDashboardData] = useState({
    newOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const { data: produk } = await supabase
        .from("produk")
        .select("*")
        .order("id", { ascending: true });

      const { data: orders } = await supabase
        .from("transaksi")
        .select("*");

      const { data: transactions } = await supabase.from("transaksi").select("*");

      const { data: users } = await supabase
        .from("roles")
        .select("*")
        .eq("role", "user");

      // Filter transactions to include only those with "Dikonfirmasi" status
      const confirmedTransactions = transactions.filter(
        (transaction) => transaction.status === "Dikonfirmasi" || transaction.status === "Pembayaran Diterima"
      );
      
      // Calculate the total revenue for confirmed transactions
      const totalRevenue =
        confirmedTransactions?.reduce((sum, transaction) => sum + transaction.total_harga, 0) || 0;
      
      const newOrders = orders?.length || 0;
      const totalUsers = users?.length || 0;
      const totalProducts = produk?.length || 0;

      setDashboardData({ newOrders, totalRevenue, totalUsers, totalProducts });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const pieData = {
    labels: ["Pesanan Baru", "Pendapatan", "Pembeli", "Produk"],
    datasets: [
      {
        data: [
          dashboardData.newOrders,
          dashboardData.totalRevenue,
          dashboardData.totalUsers,
          dashboardData.totalProducts,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#66D9A3"],
      },
    ],
  };

  return (
    <>
      <DashboardGrid>
        <ConsolidatedCard>
          <CardItem>
            <CardTitle>Pesanan Baru</CardTitle>
            <CardValue>{dashboardData.newOrders}</CardValue>
          </CardItem>
          <CardItem>
            <CardTitle>Pendapatan Total</CardTitle>
            <CardValue>Rp {dashboardData.totalRevenue.toLocaleString("id-ID")}</CardValue>
          </CardItem>
          <CardItem>
            <CardTitle>Pembeli</CardTitle>
            <CardValue>{dashboardData.totalUsers}</CardValue>
          </CardItem>
          <CardItem>
            <CardTitle>Total Produk</CardTitle>
            <CardValue>{dashboardData.totalProducts}</CardValue>
          </CardItem>
        </ConsolidatedCard>
      </DashboardGrid>
      <SummaryPieChart>
        <Pie data={pieData} />
      </SummaryPieChart>
    </>
  );
}
