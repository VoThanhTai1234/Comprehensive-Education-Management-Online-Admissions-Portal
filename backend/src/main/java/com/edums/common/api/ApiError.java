package com.edums.common.api;

import java.util.Map;

public record ApiError(
        int status,
        String code,
        String message,
        String path,
        Map<String, String> details
) {
    public ApiError {
        details = details == null ? Map.of() : Map.copyOf(details);
    }
}

