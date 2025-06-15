package com.example.backend.service;

import com.example.backend.model.RoleModel;
import com.example.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<RoleModel> getAllRoles() {
        return roleRepository.findAll();
    }

    public RoleModel getRoleById(Integer id) {
        return roleRepository.findById(id).orElse(null);
    }

    public RoleModel createRole(RoleModel role) {
        return roleRepository.save(role);
    }

    public RoleModel updateRole(Integer id, RoleModel updatedRole) {
        RoleModel existing = roleRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedRole.getName());
            return roleRepository.save(existing);
        }
        return null;
    }

    public void deleteRole(Integer id) {
        roleRepository.deleteById(id);
    }
}
