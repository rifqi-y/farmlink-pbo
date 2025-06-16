package com.example.backend.service;

import com.example.backend.model.UserModel;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<UserModel> findAll() {
        return userRepo.findAll();
    }

    public Optional<UserModel> findById(int id) {
        return userRepo.findById(id);
    }

    public UserModel save(UserModel user) {
        return userRepo.save(user);
    }

    public void deleteById(int id) {
        userRepo.deleteById(id);
    }
}
