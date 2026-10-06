package br.com.senac.sgsst.api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringJUnitConfig(HealthApiTest.WebConfig.class)
@WebAppConfiguration
class HealthApiTest {
    @org.springframework.boot.test.context.TestConfiguration
    @EnableWebMvc
    @ComponentScan({"br.com.senac.sgsst.api", "br.com.senac.sgsst.config", "br.com.senac.sgsst.service"})
    static class WebConfig {
        @Bean JdbcTemplate jdbcTemplate() { return mock(JdbcTemplate.class); }
    }

    @Autowired WebApplicationContext context;
    @Autowired JdbcTemplate jdbc;
    MockMvc mvc;

    @BeforeEach void setUp() {
        reset(jdbc);
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test void returns503WithoutLeakingConnectionDetails() throws Exception {
        when(jdbc.queryForObject("SELECT 1", Integer.class)).thenThrow(
                new org.springframework.jdbc.CannotGetJdbcConnectionException("password=secret jdbc:mysql://private"));
        mvc.perform(get("/api/health"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(content().json("{\"status\":\"DOWN\",\"database\":\"DOWN\"}", org.springframework.test.json.JsonCompareMode.STRICT));
    }

    @Test void allowsAngularPreflightForNestedApiRoutes() throws Exception {
        mvc.perform(options("/api/health")
                .header("Origin", "http://localhost:4200")
                .header("Access-Control-Request-Method", "GET")
                .header("Access-Control-Request-Headers", "Content-Type"))
            .andExpect(status().isOk())
            .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }

    @Test void rejectsUnapprovedOrigin() throws Exception {
        mvc.perform(options("/api/health").header("Origin", "https://example.org")
                .header("Access-Control-Request-Method", "GET"))
            .andExpect(status().isForbidden())
            .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }

    @Test void doesNotEnableCorsOutsideApi() throws Exception {
        mvc.perform(options("/outside").header("Origin", "http://localhost:4200")
                .header("Access-Control-Request-Method", "GET"))
            .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }

    @Test void unexpectedQueryResultIsNotHealthy() throws Exception {
        when(jdbc.queryForObject("SELECT 1", Integer.class)).thenReturn(null);
        mvc.perform(get("/api/health")).andExpect(status().isServiceUnavailable());
    }

    @Test void corsIsIncludedInDatabaseFailureResponse() throws Exception {
        when(jdbc.queryForObject("SELECT 1", Integer.class)).thenThrow(
                new org.springframework.jdbc.CannotGetJdbcConnectionException("unavailable"));
        mvc.perform(get("/api/health").header("Origin", "http://localhost:4200"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }

    @Test void returnsUpOnlyAfterDatabaseQuerySucceeds() throws Exception {
        when(jdbc.queryForObject("SELECT 1", Integer.class)).thenReturn(1);
        mvc.perform(get("/api/health"))
            .andExpect(status().isOk())
            .andExpect(content().json("{\"status\":\"UP\",\"database\":\"UP\"}", org.springframework.test.json.JsonCompareMode.STRICT));
        verify(jdbc).queryForObject("SELECT 1", Integer.class);
    }
}
