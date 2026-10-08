package br.com.senac.sgsst.dto;

import br.com.senac.sgsst.model.Treinamento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record TreinamentoRequest(

  @NotBlank(message = "Código é obrigatório")
  @Size(max = 50, message = "Código deve ter no máximo 50 caracteres")
  String codigo,

  @NotBlank(message = "Nome é obrigatório")
  @Size(max = 150, message = "Nome deve ter no máximo 150 caracteres")
  String nome,

  @Size(max = 100, message = "Classificação deve ter no máximo 100 caracteres")
  String classificacao,

  @Size(max = 50, message = "NR deve ter no máximo 50 caracteres")
  String nr,

  @NotBlank(message = "Carga horária é obrigatória")
  @Size(max = 20, message = "Carga horária deve ter no máximo 20 caracteres")
  String cargaHoraria,

  @NotNull(message = "Validade em meses é obrigatória")
  @PositiveOrZero(message = "Validade em meses não pode ser negativa")
  Integer validadeMeses,

  @NotNull(message = "Status é obrigatório")
  Treinamento.Status status

) {
}
