import React from "react";
import NavbarAdmin from "../componentAdmin/navbar";
import SidebarAdmin from "../componentAdmin/sidebarAdmin";
import Statistik from "../statistikproduk/page";

const styles = {
  wrapper: {
    fontFamily: '"Poppins", "sans-serif"',
  },
  sidebarWrapper: {
    width: "250px",
    marginTop: 0,
  },
  mainContentWrapper: {
    flexGrow: 1,
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#1c8c6c",
  },
};

export default function ProfilAdmin() {
  return (
    <div style={styles.wrapper}>
      <NavbarAdmin />
      <div style={{ display: "flex" }}>
        <div style={styles.sidebarWrapper}>
          <SidebarAdmin />
        </div>
        <div style={styles.mainContentWrapper}>
          <h1 style={styles.header}>Dashboard Admin - Produk Pertanian</h1>
          <Statistik />
        </div>
      </div>
    </div>
  );
}
