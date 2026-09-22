package com.edums.health;

public record HealthResponse(
        String status,
        String service,
        String version,
        String database
) {
}
