// pages/start-selling.js
"use client";
import { useState } from 'react';

export default function profiladmin() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk mengirim data produk ke server atau menyimpannya
    alert('Produk berhasil ditambahkan!');
  };

  return (
    <div style={containerStyle}>
      <h1>Mulai Jual Produk</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label>Nama Produk:</label>
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label>Harga Produk:</label>
          <input
            type="number"
            value={productPrice}
            onChange={handleProductPriceChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label>Deskripsi Produk:</label>
          <textarea
            value={productDescription}
            onChange={handleProductDescriptionChange}
            style={textareaStyle}
            required
          />
        </div>

        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>
            Tambahkan Produk
          </button>
        </div>
      </form>
    </div>
  );
}

// Styling
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const formStyle = {
  marginTop: '20px',
};

const inputContainerStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '300px',
  height: '100px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonContainerStyle = {
  marginTop: '20px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};