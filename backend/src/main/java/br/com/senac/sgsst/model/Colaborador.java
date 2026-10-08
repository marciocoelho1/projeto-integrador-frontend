package br.com.senac.sgsst.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "colaboradores")

public class  Colaborador {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "A matrícula é obrigatória")
  @Column(unique = true, nullable = false)
  private String matricula;

  @NotBlank(message = "O nome é obrigatório")
  @Column(nullable = false)
  private String nome;

  @NotBlank(message = "O CPF é obrigatório")
  private String cpf;

  @Email(message = "Formato de e-mail inválido")
  @NotBlank(message = "O e-mail é obrigatório")
  private String email;

  @NotBlank(message = "O cargo é obrigatório")
  private String cargo;

  @NotBlank(message = "O setor é obrigatório")
  private String setor;

  @NotBlank(message = "O status é obrigatório")
  private String status;

  public Colaborador() {
  }

  public Colaborador(Long id, String matricula, String nome, String cpf, String email, String cargo, String setor, String status) {
    this.id = id;
    this.matricula = matricula;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.cargo = cargo;
    this.setor = setor;
    this.status = status;

  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getMatricula() {
    return matricula;
  }

  public void setMatricula(String matricula) {
    this.matricula = matricula;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCargo() {
    return cargo;
  }

  public void setCargo(String cargo) {
    this.cargo = cargo;
  }

  public String getSetor() {
    return setor;
  }

  public void setSetor(String setor) {
    this.setor = setor;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
