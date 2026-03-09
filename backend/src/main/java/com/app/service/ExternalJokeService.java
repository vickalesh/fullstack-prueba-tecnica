package com.app.service;

import com.app.dto.JokeDTO;
import com.app.exception.ExternalApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExternalJokeService {

    private final RestTemplate restTemplate;

    @Value("${external.api.chuck-norris}")
    private String chuckNorrisApiUrl;

    public JokeDTO getRandomJoke() {
        try {
            Map response = restTemplate.getForObject(chuckNorrisApiUrl, Map.class);
            if (response == null || !response.containsKey("value")) {
                throw new ExternalApiException("Invalid response from external API");
            }
            return new JokeDTO((String) response.get("value"));
        } catch (ExternalApiException e) {
            throw e;
        } catch (Exception e) {
            throw new ExternalApiException("Failed to fetch joke from external API: " + e.getMessage());
        }
    }
}
