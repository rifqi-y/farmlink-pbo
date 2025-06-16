package com.example.backend.repository;

import com.example.backend.model.CartItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItemModel, Integer> {
    // List<CartItemModel> findByUserId(Integer userId);
    List<CartItemModel> findByUserId(@Param("userId") Integer userId);
    Optional<CartItemModel> findByUserIdAndProdukId(Integer userId, Integer produkId);
}

