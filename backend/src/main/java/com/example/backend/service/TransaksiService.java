package com.example.backend.service;

import com.example.backend.dto.TransaksiRequest;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransaksiService {

    @Autowired
    private TransaksiRepository transaksiRepo;

    @Autowired
    private TransaksiDetailRepository detailRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProdukRepository produkRepo;

    @Autowired
    private CartItemRepository cartRepo;

    public TransaksiModel buatTransaksi(TransaksiRequest req) {
        // ✅ Validasi user
        UserModel user = userRepo.findById(req.userId)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan dengan ID: " + req.userId));

        // ✅ Hitung total harga
        int totalHarga = req.items.stream()
                .mapToInt(i -> i.subtotal)
                .sum() + req.shipping;

        // ✅ Buat objek transaksi
        TransaksiModel transaksi = new TransaksiModel();
        transaksi.setUser(user);
        transaksi.setShipping(req.shipping);
        transaksi.setTotal(totalHarga);
        transaksi.setStatus("Diproses");

        // ✅ Isi detail transaksi
        List<TransaksiDetailModel> detailList = new ArrayList<>();
        for (TransaksiRequest.Item i : req.items) {
            ProdukModel produk = produkRepo.findById(i.produkId)
                    .orElseThrow(() -> new RuntimeException("Produk tidak ditemukan dengan ID: " + i.produkId));

            TransaksiDetailModel detail = new TransaksiDetailModel();
            detail.setTransaksi(transaksi);
            detail.setProduk(produk);
            detail.setQuantity(i.quantity);
            detail.setSubtotal(i.subtotal);
            detailList.add(detail);
        }

        // ✅ Set detail ke transaksi
        transaksi.setDetails(detailList);

        // ✅ Simpan transaksi (dan otomatis detail karena cascade)
        TransaksiModel saved = transaksiRepo.save(transaksi);

        // ✅ Kosongkan cart milik user
        List<CartItemModel> cartItems = cartRepo.findByUserId(req.userId);
        cartRepo.deleteAll(cartItems);

        return saved;
    }
}
