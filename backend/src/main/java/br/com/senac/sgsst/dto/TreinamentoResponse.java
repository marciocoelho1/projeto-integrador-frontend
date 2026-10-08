package br.com.senac.sgsst.dto;

import br.com.senac.sgsst.model.Treinamento;

public record TreinamentoResponse(
  Long id,
  String codigo,
  String nome,
  String classificacao,
  String nr,
  String cargaHoraria,
  Integer validadeMeses,
  Treinamento.Status status
) {

  public static TreinamentoResponse from(Treinamento treinamento) {
    return new TreinamentoResponse(
      treinamento.getId(),
      treinamento.getCodigo(),
      treinamento.getNome(),
      treinamento.getClassificacao(),
      treinamento.getNr(),
      treinamento.getCargaHoraria(),
      treinamento.getValidadeMeses(),
      treinamento.getStatus()
    );
  }
}
