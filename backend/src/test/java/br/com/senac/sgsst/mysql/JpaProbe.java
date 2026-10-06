package br.com.senac.sgsst.mysql;

import jakarta.persistence.*;

/** Somente teste: nunca entra no JAR nem cria tabela de dominio. */
@Entity
@Table(name = "sgsst_base_probe")
public class JpaProbe {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    protected JpaProbe() {}
    public JpaProbe(String description) { this.description = description; }
    public Long getId() { return id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
