package com.example.backend.service;

import com.example.backend.model.KategoriModel;
import com.example.backend.repository.KategoriRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KategoriService {

    private final KategoriRepository kategoriRepository;

    public KategoriService(KategoriRepository kategoriRepository) {
        this.kategoriRepository = kategoriRepository;
    }

    public List<KategoriModel> getAllKategori() {
        return kategoriRepository.findAll();
    }

    public Optional<KategoriModel> getKategoriById(Long id) {
        return kategoriRepository.findById(id);
    }

    public KategoriModel saveKategori(KategoriModel kategori) {
        return kategoriRepository.save(kategori);
    }

    public void deleteKategori(Long id) {
        kategoriRepository.deleteById(id);
    }
}
