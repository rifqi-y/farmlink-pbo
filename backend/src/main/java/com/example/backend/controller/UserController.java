package com.example.backend.controller;

import com.example.backend.model.UserModel;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserModel> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<UserModel> getUser(@PathVariable int id) {
        return userService.findById(id);
    }

    @PostMapping
    public UserModel createUser(@RequestBody UserModel user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public UserModel updateUser(@PathVariable int id, @RequestBody UserModel user) {
        user.setId(id);
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteById(id);
    }

    @GetMapping("/profile/{id}")
    public Optional<UserModel> getUserProfile(@PathVariable int id) {
        return userService.findById(id);
    }
}
