package com.example.demo;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final DataSource dataSource;

    public HealthController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/health")
    public ResponseEntity<HealthResponse> healthCheck() {
        HealthResponse response = new HealthResponse();
        response.setStatus("UP");
        response.setTimestamp(System.currentTimeMillis());
        
        // Check database connectivity
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                response.setDatabase("CONNECTED");
            } else {
                response.setDatabase("DISCONNECTED");
                response.setStatus("DEGRADED");
            }
        } catch (Exception e) {
            response.setDatabase("ERROR: " + e.getMessage());
            response.setStatus("DOWN");
        }
        
        HttpStatus status = response.getStatus().equals("UP") ? HttpStatus.OK : 
                           response.getStatus().equals("DEGRADED") ? HttpStatus.OK : 
                           HttpStatus.SERVICE_UNAVAILABLE;
        
        return new ResponseEntity<>(response, status);
    }

    static class HealthResponse {
        private String status;
        private String database;
        private long timestamp;

        // Getters and setters
        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getDatabase() {
            return database;
        }

        public void setDatabase(String database) {
            this.database = database;
        }

        public long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(long timestamp) {
            this.timestamp = timestamp;
        }
    }
}