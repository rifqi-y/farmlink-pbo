package com.example.backend.controller;

import com.example.backend.model.PromoModel;
import com.example.backend.model.ProdukModel;
import com.example.backend.repository.ProdukRepository;
import com.example.backend.service.PromoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/promo")
@CrossOrigin(origins = "http://localhost:3000")
public class PromoController {

    private final PromoService promoService;
    private final ProdukRepository produkRepository;

    public PromoController(PromoService promoService, ProdukRepository produkRepository) {
        this.promoService = promoService;
        this.produkRepository = produkRepository;
    }

    @GetMapping
    public List<PromoModel> getAll() {
        return promoService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<PromoModel> getById(@PathVariable Integer id) {
        return promoService.findById(id);
    }

    @PostMapping
    public PromoModel create(@RequestBody PromoModel promo) {
        if (promo.getProduk() == null || promo.getProduk().getId() == null) {
            throw new RuntimeException("Produk wajib diisi");
        }

        ProdukModel produk = produkRepository.findById(promo.getProduk().getId())
                .orElseThrow(() -> new RuntimeException("Produk tidak ditemukan"));

        promo.setProduk(produk);
        return promoService.save(promo);
    }

    @PutMapping("/{id}")
    public PromoModel update(@PathVariable Integer id, @RequestBody PromoModel promo) {
        promo.setId(id);

        if (promo.getProduk() == null || promo.getProduk().getId() == null) {
            throw new RuntimeException("Produk wajib diisi");
        }

        ProdukModel produk = produkRepository.findById(promo.getProduk().getId())
                .orElseThrow(() -> new RuntimeException("Produk tidak ditemukan"));

        promo.setProduk(produk);
        return promoService.save(promo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        promoService.deleteById(id);
    }
}
