package com.example.backend.controller;

import com.example.backend.dto.TransaksiRequest;
import com.example.backend.model.TransaksiModel;
import com.example.backend.service.TransaksiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transaksi")
@CrossOrigin(origins = "http://localhost:3000")
public class TransaksiController {

    @Autowired
    private TransaksiService transaksiService;

    @PostMapping
    public ResponseEntity<TransaksiModel> create(@RequestBody TransaksiRequest req) {
        try {
            TransaksiModel transaksi = transaksiService.buatTransaksi(req);
            return ResponseEntity.ok(transaksi); // ✅ status 200 OK
        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // atau ResponseEntity.status(500).build();
        }
    }
}
