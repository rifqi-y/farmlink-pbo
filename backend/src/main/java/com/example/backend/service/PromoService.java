package com.example.backend.service;

import com.example.backend.model.PromoModel;
import com.example.backend.repository.PromoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromoService {

    private final PromoRepository promoRepository;

    public PromoService(PromoRepository promoRepository) {
        this.promoRepository = promoRepository;
    }

    /**
     * Ambil semua data promo dari database.
     */
    public List<PromoModel> findAll() {
        return promoRepository.findAll();
    }

    /**
     * Ambil promo berdasarkan ID.
     */
    public Optional<PromoModel> findById(Integer id) {
        return promoRepository.findById(id);
    }

    /**
     * Simpan atau update data promo.
     */
    public PromoModel save(PromoModel promo) {
        return promoRepository.save(promo);
    }

    /**
     * Hapus promo berdasarkan ID.
     */
    public void deleteById(Integer id) {
        promoRepository.deleteById(id);
    }
}
