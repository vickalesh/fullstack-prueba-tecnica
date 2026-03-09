package com.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

public class UserDTO {

    @Data
    public static class Request {
        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;
    }

    @Data
    public static class Response {
        private UUID id;
        private String name;
        private String email;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
