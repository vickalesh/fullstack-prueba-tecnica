package com.app.controller;

import com.app.dto.JokeDTO;
import com.app.service.ExternalJokeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/external")
@RequiredArgsConstructor
@Tag(name = "External API", description = "Endpoints that consume external APIs")
public class ExternalController {

    private final ExternalJokeService externalJokeService;

    @GetMapping("/joke")
    @Operation(summary = "Get a random Chuck Norris joke")
    public ResponseEntity<JokeDTO> getJoke() {
        return ResponseEntity.ok(externalJokeService.getRandomJoke());
    }
}
