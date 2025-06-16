package com.example.backend.dto;

import java.util.List;

public class TransaksiRequest {
    public Integer userId;
    public Integer shipping;
    public List<Item> items;

    public static class Item {
        public Integer produkId;
        public Integer quantity;
        public Integer subtotal;
    }
}
