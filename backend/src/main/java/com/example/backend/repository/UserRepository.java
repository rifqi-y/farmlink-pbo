package com.example.backend.repository;

import com.example.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Integer> {

    // Untuk validasi email saat register
    Optional<UserModel> findByEmail(String email);

    // Untuk login jika password belum dienkripsi (tidak direkomendasikan di produksi)
    Optional<UserModel> findByEmailAndPassword(String email, String password);
}
