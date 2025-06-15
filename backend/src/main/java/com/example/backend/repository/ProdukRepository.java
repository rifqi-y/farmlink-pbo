package com.example.backend.repository;

import com.example.backend.model.ProdukModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdukRepository extends JpaRepository<ProdukModel, Integer> {}
