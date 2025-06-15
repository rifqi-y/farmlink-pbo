package com.example.backend.repository;

import com.example.backend.model.PromoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromoRepository extends JpaRepository<PromoModel, Integer> {}
