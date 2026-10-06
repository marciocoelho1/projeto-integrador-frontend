package br.com.senac.sgsst.mysql;

import br.com.senac.sgsst.config.CorsConfig;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import br.com.senac.sgsst.api.HealthApiController;
import br.com.senac.sgsst.service.DatabaseHealthService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = MySqlConnectionIT.IntegrationConfig.class,
        properties = "spring.config.location=optional:classpath:/mysql-it-isolated.properties")
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class MySqlConnectionIT {
    // Sem binding spring.datasource.*, pool Hikari, JNDI ou import da configuracao de producao.
    @TestConfiguration(proxyBeanMethods = false)
    static class ProbeConfig {
        @Bean DataSource dataSource(Environment environment) {
            String url = required(environment, "MYSQL_IT_URL");
            String option = "(?:(?:connectTimeout|socketTimeout)=[0-9]+|(?:useSSL|allowPublicKeyRetrieval)=(?:true|false))";
            if (!url.matches("jdbc:mysql://(?:127[.]0[.]0[.]1|localhost):[0-9]+/sgsst_test"
                    + "(?:[?]" + option + "(?:&" + option + ")*)?")) {
                throw new IllegalArgumentException("MYSQL_IT_URL deve apontar para localhost/127.0.0.1 e banco sgsst_test dedicado.");
            }
            DriverManagerDataSource source = new DriverManagerDataSource();
            source.setDriverClassName("com.mysql.cj.jdbc.Driver");
            source.setUrl(url);
            source.setUsername(required(environment, "MYSQL_IT_USERNAME"));
            source.setPassword(required(environment, "MYSQL_IT_PASSWORD"));
            return source;
        }
    }

    // Ordinary explicit root prevents SpringBootTest from discovering SgsstApplication.
    @org.springframework.context.annotation.Configuration(proxyBeanMethods = false)
    @Import({ProbeConfig.class, HealthApiController.class, DatabaseHealthService.class, CorsConfig.class})
    @ImportAutoConfiguration({WebMvcAutoConfiguration.class, JacksonAutoConfiguration.class,
            HttpMessageConvertersAutoConfiguration.class})
    static class IntegrationConfig {
        @Bean JdbcTemplate jdbcTemplate(DataSource dataSource) {
            return new JdbcTemplate(dataSource);
        }

        @Bean LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
            LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
            factory.setDataSource(dataSource);
            factory.setManagedTypes(org.springframework.orm.jpa.persistenceunit.PersistenceManagedTypes.of(JpaProbe.class.getName()));
            factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
            factory.setJpaPropertyMap(Map.of("hibernate.hbm2ddl.auto", "create-drop"));
            return factory;
        }
    }

    static String required(Environment environment, String name) {
        String value = environment.getProperty(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Defina " + name + " para teste MySQL opt-in; nenhum banco simulado e usado.");
        }
        return value;
    }

    @Autowired DataSource dataSource;
    @Autowired MockMvc mvc;
    @Autowired JdbcTemplate jdbc;
    @Autowired EntityManagerFactory entityManagers;

    @Autowired org.springframework.context.ApplicationContext context;

    @Test void fullIntegrationContextDoesNotDiscoverProductionRootOrDatabaseAutoConfiguration() {
        Class<?>[] forbidden = {
                br.com.senac.sgsst.SgsstApplication.class,
                org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class,
                org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration.class,
                org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration.class,
                org.springframework.boot.autoconfigure.sql.init.SqlInitializationAutoConfiguration.class,
                org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration.class,
                org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration.class
        };
        var discovered = java.util.Arrays.stream(forbidden)
                .filter(type -> context.getBeanNamesForType(type).length != 0)
                .map(Class::getSimpleName).toList();
        assertEquals(java.util.List.of(), discovered,
                "Full SpringBootTest context must not discover production root or unrequested database auto-configuration");
        assertEquals(1, context.getBeansOfType(DataSource.class).size());
        assertInstanceOf(DriverManagerDataSource.class, context.getBean(DataSource.class));
        assertTrue(context.getBeansOfType(org.springframework.data.repository.Repository.class).isEmpty());
        assertTrue(context.getBeansOfType(org.springframework.boot.sql.init.AbstractScriptDatabaseInitializer.class).isEmpty());
        System.out.println("MYSQL_IT_CONTEXT_ISOLATION PASS: SgsstApplication, JDBC/SQL-init/JPA auto-config, repositories and SQL initializers absent; one explicit DriverManagerDataSource");
    }

    @Test void realMysqlRespondsToHealthQuery() throws Exception {
        assertEquals(java.util.Set.of(JpaProbe.class), entityManagers.getMetamodel().getEntities().stream()
                .map(jakarta.persistence.metamodel.EntityType::getJavaType).collect(java.util.stream.Collectors.toSet()));
        assertEquals("sgsst_test", jdbc.execute((org.springframework.jdbc.core.ConnectionCallback<String>)
                java.sql.Connection::getCatalog));
        assertEquals("MySQL", jdbc.execute((org.springframework.jdbc.core.ConnectionCallback<String>)
                connection -> connection.getMetaData().getDatabaseProductName()));
        mvc.perform(get("/api/health").header("Origin", "http://localhost:4200"))
            .andExpect(status().isOk())
            .andExpect(content().json("{\"status\":\"UP\",\"database\":\"UP\"}", org.springframework.test.json.JsonCompareMode.STRICT))
            .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }

    @Test void jpaPersistsReadsUpdatesAndDeletesAcrossTransactions() {
        Long id;
        try (EntityManager em = entityManagers.createEntityManager()) {
            em.getTransaction().begin();
            JpaProbe probe = new JpaProbe("dado ficticio");
            em.persist(probe);
            em.getTransaction().commit();
            id = probe.getId();
            assertNotNull(id);
        }
        try (EntityManager em = entityManagers.createEntityManager()) {
            em.getTransaction().begin();
            JpaProbe saved = em.find(JpaProbe.class, id);
            assertEquals("dado ficticio", saved.getDescription());
            saved.setDescription("alterado");
            em.getTransaction().commit();
        }
        try (EntityManager em = entityManagers.createEntityManager()) {
            em.getTransaction().begin();
            JpaProbe saved = em.find(JpaProbe.class, id);
            assertEquals("alterado", saved.getDescription());
            em.remove(saved);
            em.getTransaction().commit();
        }
        try (EntityManager em = entityManagers.createEntityManager()) {
            assertNull(em.find(JpaProbe.class, id));
        }
    }

    @Test void realMysqlRejectsWrongPasswordWithoutLeakingItInApiResponse() throws Exception {
        DriverManagerDataSource wrongCredentials = new DriverManagerDataSource(
                ((DriverManagerDataSource) dataSource).getUrl(), ((DriverManagerDataSource) dataSource).getUsername(),
                "intentionally-invalid-test-password");
        MockMvc invalidConnectionApi = MockMvcBuilders.standaloneSetup(
                new HealthApiController(new DatabaseHealthService(new JdbcTemplate(wrongCredentials)))).build();
        invalidConnectionApi.perform(get("/api/health"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(content().json("{\"status\":\"DOWN\",\"database\":\"DOWN\"}", org.springframework.test.json.JsonCompareMode.STRICT));
    }
}
