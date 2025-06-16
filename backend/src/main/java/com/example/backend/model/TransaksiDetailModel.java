package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "transaksi_detail")
public class TransaksiDetailModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "transaksi_id", nullable = false)
    @JsonIgnore
    private TransaksiModel transaksi;

    @ManyToOne
    @JoinColumn(name = "produk_id", nullable = false)
    private ProdukModel produk;


    private Integer quantity;
    private Integer subtotal;

    // --- Getters & Setters ---

    public Integer getId() {
        return id;
    }

    public TransaksiModel getTransaksi() {
        return transaksi;
    }

    public void setTransaksi(TransaksiModel transaksi) {
        this.transaksi = transaksi;
    }


    public ProdukModel getProduk() {
        return produk;
    }

    public void setProduk(ProdukModel produk) {
        this.produk = produk;
    }


    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Integer subtotal) {
        this.subtotal = subtotal;
    }
}
