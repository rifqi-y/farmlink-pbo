package com.example.backend.repository;
import com.example.backend.model.TransaksiModel;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TransaksiRepository extends JpaRepository<TransaksiModel, Integer> {}