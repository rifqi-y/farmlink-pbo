package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "transaksi")
public class TransaksiModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    private Integer shipping;

    private Integer total;

    private String status;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "transaksi", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("transaksi")
    private List<TransaksiDetailModel> details;

    // --- GETTERS & SETTERS ---
    public Integer getId() { return id; }

    public UserModel getUser() { return user; }
    public void setUser(UserModel user) { this.user = user; }

    public Integer getShipping() { return shipping; }
    public void setShipping(Integer shipping) { this.shipping = shipping; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<TransaksiDetailModel> getDetails() { return details; }
    public void setDetails(List<TransaksiDetailModel> details) { this.details = details; }
}
