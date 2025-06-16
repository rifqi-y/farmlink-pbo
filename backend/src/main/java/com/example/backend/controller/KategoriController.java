package com.example.backend.controller;

import com.example.backend.model.KategoriModel;
import com.example.backend.service.KategoriService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kategori")
@CrossOrigin(origins = "http://localhost:3000")
public class KategoriController {

    private final KategoriService kategoriService;

    public KategoriController(KategoriService kategoriService) {
        this.kategoriService = kategoriService;
    }

    @GetMapping
    public List<KategoriModel> getAllKategori() {
        return kategoriService.getAllKategori();
    }

    @GetMapping("/{id}")
    public Optional<KategoriModel> getKategoriById(@PathVariable int id) {
        return kategoriService.getKategoriById(id);
    }

    @PostMapping
    public KategoriModel createKategori(@RequestBody KategoriModel kategori) {
        return kategoriService.saveKategori(kategori);
    }

    @PutMapping("/{id}")
    public KategoriModel updateKategori(@PathVariable int id, @RequestBody KategoriModel kategori) {
        kategori.setId(id);
        return kategoriService.saveKategori(kategori);
    }

    @DeleteMapping("/{id}")
    public void deleteKategori(@PathVariable int id) {
        kategoriService.deleteKategori(id);
    }
}
