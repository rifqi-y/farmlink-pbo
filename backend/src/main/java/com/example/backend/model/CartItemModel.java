package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produk_id", nullable = false)
    private ProdukModel produk;


    @Column(nullable = false)
    private int quantity;

    // Constructors
    public CartItemModel() {}

    public CartItemModel(ProdukModel produk, UserModel user, int quantity) {
        this.produk = produk;
        this.user = user;
        this.quantity = quantity;
    }

    // Getters & Setters
    public int getId() {
        return id;
    }

    public ProdukModel getProduk() {
        return produk;
    }

    public void setProduk(ProdukModel produk) {
        this.produk = produk;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
