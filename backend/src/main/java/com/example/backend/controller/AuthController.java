package com.example.backend.controller;

import com.example.backend.model.RoleModel;
import com.example.backend.model.UserModel;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");

        if (name == null || email == null || password == null) {
            return ResponseEntity.badRequest().body("Semua field wajib diisi.");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email sudah digunakan.");
        }

        RoleModel customerRole = roleRepository.findByNameIgnoreCase("Customer")
                .orElseThrow(() -> new RuntimeException("Role 'Customer' tidak ditemukan."));

        UserModel user = new UserModel();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password); // ⚠️ Belum hash
        user.setRole(customerRole);

        return ResponseEntity.ok(userRepository.save(user));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<UserModel> userOpt = userRepository.findByEmailAndPassword(email, password);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email atau password salah.");
        }
    }
}

