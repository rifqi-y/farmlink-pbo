package com.example.backend.controller;

import com.example.backend.model.CartItemModel;
import com.example.backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartItemService cartService;

    // ✅ Get semua item cart berdasarkan user ID
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemModel>> getCartItems(@PathVariable Integer userId) {
        List<CartItemModel> items = cartService.getCartByUser(userId);
        return ResponseEntity.ok(items);
    }

    // ✅ Tambah item ke keranjang
    @PostMapping
    public ResponseEntity<CartItemModel> addToCart(@RequestBody Map<String, Object> body) {
        try {
            Integer userId = Integer.parseInt(body.get("userId").toString());
            Integer produkId = Integer.parseInt(body.get("produkId").toString());
            int quantity = Integer.parseInt(body.get("quantity").toString());

            CartItemModel newItem = cartService.addToCart(userId, produkId, quantity);
            return ResponseEntity.ok(newItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // ✅ Update quantity
    @PutMapping("/{cartId}")
    public ResponseEntity<CartItemModel> updateCartItem(
            @PathVariable Integer cartId,
            @RequestBody Map<String, Integer> body
    ) {
        int quantity = body.get("quantity");
        CartItemModel updatedItem = cartService.updateQuantity(cartId, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    // ✅ Hapus item dari cart
    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Integer cartId) {
        cartService.removeItem(cartId);
        return ResponseEntity.ok("Item berhasil dihapus");
    }

    // ✅ Get total quantity semua item di cart user
    @GetMapping("/count/{userId}")
    public ResponseEntity<Integer> getTotalItem(@PathVariable Integer userId) {
        int total = cartService.getTotalItems(userId);
        return ResponseEntity.ok(total);
    }
}
