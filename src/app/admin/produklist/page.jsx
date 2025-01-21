"use client";
import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import styled from "styled-components";
import SearchBar from "../componentAdmin/SearchBar";
import Link from "next/link";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
`;

const ProductTitle = styled.h4`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #1c8c6c;
`;

const ProductImage = styled.h4`
  width: "100%"; 
  borderRadius: "0.5rem" ;
`

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #158f63;
`;

const ProductButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  background-color: #66d9a3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1c8c6c;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e63946;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("produk").select("*");
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const { error } = await supabase.from("produk").delete().eq("id", id);
        if (error) throw error;
        alert("Produk berhasil dihapus!");
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (err) {
        // alert("Gagal menghapus produk!");
        console.log(err);
        
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Hanya panggil SearchBar di sini */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductTitle>{product.nama}</ProductTitle>
            <img src={product.gambar} alt={product.nama} style={{ width: "100%", borderRadius: "0.5rem" }} />
            <ProductDescription>{product.deskripsi}</ProductDescription>
            <ProductPrice>{product.harga}</ProductPrice>
            <ProductButtonGroup>
              <Link href={`/admin/editdata?id=${product.id}`}>
                <EditButton>Edit</EditButton>
              </Link>
              <DeleteButton onClick={() => handleDeleteProduct(product.id)}>Delete</DeleteButton>
            </ProductButtonGroup>
          </ProductCard>
        ))}
      </ProductGrid>
    </div>
  );
};

export default ProductList;
