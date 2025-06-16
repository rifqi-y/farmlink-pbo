package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private ProdukRepository produkRepo;

    @Autowired
    private UserRepository userRepo;

    public List<CartItemModel> getCartByUser(Integer userId) {
        return cartItemRepo.findByUserId(userId);
    }

    public CartItemModel addToCart(Integer userId, Integer produkId, int quantity) {
        ProdukModel produk = produkRepo.findById(produkId)
                .orElseThrow(() -> new RuntimeException("Produk tidak ditemukan"));

        UserModel user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        Optional<CartItemModel> existing = cartItemRepo.findByUserIdAndProdukId(userId, produkId);
        if (existing.isPresent()) {
            CartItemModel item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepo.save(item);
        }

        CartItemModel newItem = new CartItemModel(produk, user, quantity);
        return cartItemRepo.save(newItem);
    }

    public CartItemModel updateQuantity(Integer cartId, int quantity) {
        CartItemModel item = cartItemRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart tidak ditemukan"));
        item.setQuantity(quantity);
        return cartItemRepo.save(item);
    }

    public void removeItem(Integer cartId) {
        cartItemRepo.deleteById(cartId);
    }

    public int getTotalItems(Integer userId) {
        return cartItemRepo.findByUserId(userId)
                .stream()
                .mapToInt(CartItemModel::getQuantity)
                .sum();
    }
}
