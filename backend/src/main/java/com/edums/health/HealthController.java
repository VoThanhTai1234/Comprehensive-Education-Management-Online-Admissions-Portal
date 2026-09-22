package com.edums.health;

import com.edums.common.api.ApiResponse;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping(path = "/api/health", produces = MediaType.APPLICATION_JSON_VALUE)
public class HealthController {

    private final String serviceName;
    private final String version;
    private final DataSource dataSource;

    public HealthController(
            @Value("${spring.application.name}") String serviceName,
            @Value("${app.version}") String version,
            ObjectProvider<DataSource> dataSourceProvider
    ) {
        this.serviceName = serviceName;
        this.version = version;
        this.dataSource = dataSourceProvider.getIfAvailable();
    }

    @GetMapping
    public ResponseEntity<ApiResponse<HealthResponse>> health() {
        String databaseStatus = databaseStatus();
        boolean healthy = !"DOWN".equals(databaseStatus);
        HealthResponse response = new HealthResponse(
                healthy ? "UP" : "DOWN",
                serviceName,
                version,
                databaseStatus
        );

        return healthy
                ? ResponseEntity.ok(ApiResponse.success(response))
                : ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(ApiResponse.success(response));
    }

    private String databaseStatus() {
        if (dataSource == null) {
            return "NOT_CONFIGURED";
        }

        try (Connection connection = dataSource.getConnection()) {
            return connection.isValid(2) ? "UP" : "DOWN";
        } catch (SQLException exception) {
            return "DOWN";
        }
    }
}
