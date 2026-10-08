package br.com.senac.sgsst.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ColaboradorRequest {

  @NotBlank(message = "A matrícula é obrigatória")
  private String matricula;

  @NotBlank(message = "O nome é obrigatório")
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
}

