package com.example.backend.controller;

import com.example.backend.model.KategoriModel;
import com.example.backend.model.ProdukModel;
import com.example.backend.model.UserModel;
import com.example.backend.repository.KategoriRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ProdukService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/produk")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdukController {

    private final ProdukService produkService;
    private final KategoriRepository kategoriRepository;
    private final UserRepository userRepository;

    public ProdukController(ProdukService produkService, KategoriRepository kategoriRepository, UserRepository userRepository) {
        this.produkService = produkService;
        this.kategoriRepository = kategoriRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<ProdukModel> getAll() {
        return produkService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<ProdukModel> getById(@PathVariable Integer id) {
        return produkService.getById(id);
    }

    // ✅ CREATE Produk + Upload Gambar (langsung 1 proses)
    @PostMapping("/create")
    public ProdukModel createWithImage(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("stock") int stock,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("sellerId") Integer sellerId,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        ProdukModel produk = new ProdukModel();
        produk.setName(name);
        produk.setDescription(description);
        produk.setPrice(price);
        produk.setStock(stock);

        // 🔗 Relasi kategori & user
        KategoriModel kategori = kategoriRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategori tidak ditemukan"));
        UserModel seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller tidak ditemukan"));

        produk.setCategory(kategori);
        produk.setSeller(seller);

        // 📂 Upload file jika ada
        if (file != null && !file.isEmpty()) {
            String uploadDir = "uploads";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();

            produk.setImageUrl(fileUrl);
        }

        return produkService.save(produk);
    }

    @PutMapping("/{id}")
    public ProdukModel update(@PathVariable Integer id, @RequestBody ProdukModel produk) {
        produk.setId(id);
        validateRelasi(produk);
        return produkService.save(produk);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        produkService.delete(id);
    }

    private void validateRelasi(ProdukModel produk) {
        if (produk.getCategory() == null || produk.getSeller() == null) {
            throw new RuntimeException("Kategori dan Seller wajib diisi");
        }

        KategoriModel kategori = kategoriRepository.findById(produk.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Kategori tidak ditemukan"));
        UserModel seller = userRepository.findById(produk.getSeller().getId())
                .orElseThrow(() -> new RuntimeException("User/Seller tidak ditemukan"));

        produk.setCategory(kategori);
        produk.setSeller(seller);
    }
}
