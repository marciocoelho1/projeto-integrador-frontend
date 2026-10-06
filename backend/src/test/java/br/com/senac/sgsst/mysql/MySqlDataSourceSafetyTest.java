package br.com.senac.sgsst.mysql;

import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import static org.junit.jupiter.api.Assertions.*;

class MySqlDataSourceSafetyTest {
    private static final String SAFE_URL = "jdbc:mysql://127.0.0.1:1/sgsst_test?connectTimeout=100";

    @org.junit.jupiter.params.ParameterizedTest
    @org.junit.jupiter.params.provider.ValueSource(strings = {
            "jdbc:mysql://127.0.0.1:1/sgsst",
            "jdbc:mysql://example.org:1/sgsst_test",
            "jdbc:mysql://127.0.0.1:1,example.org:1/sgsst_test",
            "jdbc:mysql://127.0.0.1:1/sgsst_test?socketFactory=custom.Factory",
            "jdbc:mysql://127.0.0.1:1/sgsst_test?dbname=sgsst",
            "jdbc:mysql://127.0.0.1:1/sgsst_test?propertiesTransform=custom.Transform"
    })
    void rejectsUnsafeUrlBeforeOpeningAnyConnection(String url) {
        var environment = new org.springframework.mock.env.MockEnvironment()
                .withProperty("MYSQL_IT_URL", url)
                .withProperty("MYSQL_IT_USERNAME", "fictitious-user")
                .withProperty("MYSQL_IT_PASSWORD", "fictitious-password");
        assertThrows(IllegalArgumentException.class,
                () -> new MySqlConnectionIT.ProbeConfig().dataSource(environment));
    }

    @org.junit.jupiter.params.ParameterizedTest
    @org.junit.jupiter.params.provider.ValueSource(strings = {
            "spring.datasource.hikari.data-source-class-name=not.a.DataSource",
            "spring.datasource.hikari.data-source-j-n-d-i=java:comp/env/important",
            "spring.datasource.hikari.data-source-properties.url=jdbc:mysql://127.0.0.1:1/important",
            "spring.datasource.hikari.data-source-properties.databaseName=important",
            "spring.datasource.jndi-name=java:comp/env/important",
            "spring.datasource.type=not.a.DataSource",
            "spring.datasource.username=wrong-user",
            "spring.datasource.password=wrong-password"
    })
    void alternativeProductionSettingsCannotReplaceExplicitDataSource(String conflict) {
        // A integracao nao habilita auto-configuracao JDBC nem binding DataSourceProperties.
        new ApplicationContextRunner()
                .withUserConfiguration(MySqlConnectionIT.ProbeConfig.class)
                .withPropertyValues("MYSQL_IT_URL=" + SAFE_URL,
                        "MYSQL_IT_USERNAME=fictitious-test-user",
                        "MYSQL_IT_PASSWORD=fictitious-test-password", conflict)
                .run(context -> {
                    assertNull(context.getStartupFailure());
                    DriverManagerDataSource source = assertInstanceOf(DriverManagerDataSource.class,
                            context.getBean(DataSource.class));
                    assertEquals(SAFE_URL, source.getUrl());
                    assertEquals("fictitious-test-user", source.getUsername());
                    assertEquals("fictitious-test-password", source.getPassword());
                    assertNull(source.getConnectionProperties());
                    assertEquals(1, context.getBeansOfType(DataSource.class).size());
                });
    }

    @org.junit.jupiter.params.ParameterizedTest
    @org.junit.jupiter.params.provider.ValueSource(strings = {
            "MYSQL_IT_URL", "MYSQL_IT_USERNAME", "MYSQL_IT_PASSWORD"
    })
    void missingOrBlankRequiredSettingFailsBeforeConnection(String name) {
        for (String missing : new String[] {null, " "}) {
            var environment = new org.springframework.mock.env.MockEnvironment()
                    .withProperty("MYSQL_IT_URL", SAFE_URL)
                    .withProperty("MYSQL_IT_USERNAME", "fictitious-user")
                    .withProperty("MYSQL_IT_PASSWORD", "fictitious-password");
            if (missing == null) ((java.util.Map<?, ?>) environment.getPropertySources().get("mockProperties")
                    .getSource()).remove(name);
            else environment.setProperty(name, missing);
            IllegalStateException failure = assertThrows(IllegalStateException.class,
                    () -> new MySqlConnectionIT.ProbeConfig().dataSource(environment));
            assertTrue(failure.getMessage().contains(name));
        }
    }

    @org.junit.jupiter.params.ParameterizedTest
    @org.junit.jupiter.params.provider.ValueSource(strings = {
            "jdbc:mysql://localhost:13306/sgsst_test",
            "jdbc:mysql://127.0.0.1:13306/sgsst_test?connectTimeout=3000&socketTimeout=5000",
            "jdbc:mysql://127.0.0.1:13306/sgsst_test?useSSL=false&allowPublicKeyRetrieval=true"
    })
    void allowsOnlySupportedLocalTestUrlsWithoutConnecting(String url) {
        var environment = new org.springframework.mock.env.MockEnvironment()
                .withProperty("MYSQL_IT_URL", url)
                .withProperty("MYSQL_IT_USERNAME", "fictitious-user")
                .withProperty("MYSQL_IT_PASSWORD", "fictitious-password");
        DriverManagerDataSource source = (DriverManagerDataSource)
                new MySqlConnectionIT.ProbeConfig().dataSource(environment);
        assertEquals(url, source.getUrl());
    }

    @Test void hikariOverrideCannotRedirectValidatedTestDatabase() {
        new ApplicationContextRunner()
                .withConfiguration(AutoConfigurations.of(DataSourceAutoConfiguration.class))
                .withUserConfiguration(MySqlConnectionIT.ProbeConfig.class)
                .withPropertyValues(
                        "MYSQL_IT_URL=" + SAFE_URL,
                        "MYSQL_IT_USERNAME=fictitious-test-user",
                        "MYSQL_IT_PASSWORD=fictitious-test-password",
                        "spring.datasource.url=" + SAFE_URL,
                        "spring.datasource.hikari.jdbc-url=jdbc:mysql://127.0.0.1:1/not_the_test_database")
                .run(context -> {
                    assertNull(context.getStartupFailure());
                    DataSource source = context.getBean(DataSource.class);
                    String effectiveUrl = source instanceof HikariDataSource hikari
                            ? hikari.getJdbcUrl() : ((DriverManagerDataSource) source).getUrl();
                    assertEquals(SAFE_URL, effectiveUrl);
                });
    }
}
