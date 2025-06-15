package com.example.backend.controller;

import com.example.backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final UserRepository userRepository;
    private final KategoriRepository kategoriRepository;
    private final ProdukRepository produkRepository;
    private final PromoRepository promoRepository;
    //private final TransaksiRepository transaksiRepository;

    public DashboardController(
        UserRepository userRepository,
        KategoriRepository kategoriRepository,
        ProdukRepository produkRepository,
        PromoRepository promoRepository
        //TransaksiRepository transaksiRepository
    ) {
        this.userRepository = userRepository;
        this.kategoriRepository = kategoriRepository;
        this.produkRepository = produkRepository;
        this.promoRepository = promoRepository;
        //this.transaksiRepository = transaksiRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("users", userRepository.count());
        stats.put("categories", kategoriRepository.count());
        stats.put("products", produkRepository.count());
        stats.put("promo", promoRepository.count());
        //stats.put("transactions", transaksiRepository.count());
        // Asumsikan kolom 'status' di tabel transaksi, contoh "Pending"
        //stats.put("pendingTransactions", transaksiRepository.countByStatus("Pending"));

        return stats;
    }
}
