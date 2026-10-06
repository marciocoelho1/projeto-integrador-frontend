package br.com.senac.sgsst.api;

import br.com.senac.sgsst.dto.HealthResponse;
import br.com.senac.sgsst.service.DatabaseHealthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthApiController {
    private final DatabaseHealthService health;

    public HealthApiController(DatabaseHealthService health) { this.health = health; }

    @GetMapping("/api/health")
    public ResponseEntity<HealthResponse> health() {
        boolean available = health.isAvailable();
        String status = available ? "UP" : "DOWN";
        return ResponseEntity.status(available ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE)
                .body(new HealthResponse(status, status));
    }
}
