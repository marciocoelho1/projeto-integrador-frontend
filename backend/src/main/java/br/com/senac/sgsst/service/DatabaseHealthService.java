package br.com.senac.sgsst.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseHealthService {
    private final JdbcTemplate jdbc;

    public DatabaseHealthService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    public boolean isAvailable() {
        try {
            return Integer.valueOf(1).equals(jdbc.queryForObject("SELECT 1", Integer.class));
        } catch (org.springframework.dao.DataAccessException unavailable) {
            return false;
        }
    }
}
