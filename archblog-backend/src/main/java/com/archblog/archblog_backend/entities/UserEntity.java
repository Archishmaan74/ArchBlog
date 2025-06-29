package com.archblog.archblog_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;
    private String companyName;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // No roles/permissions for now
    }

    @Override
    public String getUsername() {
        return this.email; // Spring uses this as the "username"
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Always active
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Password never expires
    }

    @Override
    public boolean isEnabled() {
        return true; // Always enabled
    }
}
