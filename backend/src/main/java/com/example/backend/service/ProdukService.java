package com.example.backend.service;

import com.example.backend.model.ProdukModel;
import com.example.backend.repository.ProdukRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdukService {

    private final ProdukRepository produkRepository;

    public ProdukService(ProdukRepository produkRepository) {
        this.produkRepository = produkRepository;
    }

    public List<ProdukModel> getAll() {
        return produkRepository.findAll();
    }

    public Optional<ProdukModel> getById(Integer id) {
        return produkRepository.findById(id);
    }

    public ProdukModel save(ProdukModel produk) {
        return produkRepository.save(produk);
    }

    public void delete(Integer id) {
        produkRepository.deleteById(id);
    }
}
