package br.com.senac.sgsst;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import static org.junit.jupiter.api.Assertions.*;

class ApplicationStructureTest {
    @Test void providesBootEntryPointAtRootPackage() {
        Class<?> application = assertDoesNotThrow(() -> Class.forName("br.com.senac.sgsst.SgsstApplication"));
        assertTrue(application.isAnnotationPresent(SpringBootApplication.class));
        assertDoesNotThrow(() -> application.getMethod("main", String[].class));
    }
}
