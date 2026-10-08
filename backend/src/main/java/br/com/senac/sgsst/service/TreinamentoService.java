package br.com.senac.sgsst.service;

import br.com.senac.sgsst.dto.TreinamentoRequest;
import br.com.senac.sgsst.dto.TreinamentoResponse;
import br.com.senac.sgsst.model.Treinamento;
import br.com.senac.sgsst.repository.TreinamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TreinamentoService {

  private final TreinamentoRepository repository;

  @Transactional(readOnly = true)
  public List<TreinamentoResponse> listar() {
    return repository.findAll()
      .stream()
      .map(TreinamentoResponse::from)
      .toList();
  }

  @Transactional(readOnly = true)
  public TreinamentoResponse buscarPorId(Long id) {
    return TreinamentoResponse.from(buscarEntidade(id));
  }

  @Transactional
  public TreinamentoResponse criar(TreinamentoRequest request) {

    validarCodigo(request.codigo(), null);

    Treinamento treinamento = Treinamento.builder()
      .codigo(request.codigo())
      .nome(request.nome())
      .classificacao(request.classificacao())
      .nr(request.nr())
      .cargaHoraria(request.cargaHoraria())
      .validadeMeses(request.validadeMeses())
      .status(request.status())
      .build();

    return TreinamentoResponse.from(repository.save(treinamento));
  }

  @Transactional
  public TreinamentoResponse atualizar(
    Long id,
    TreinamentoRequest request
  ) {

    Treinamento treinamento = buscarEntidade(id);

    validarCodigo(request.codigo(), id);

    treinamento.setCodigo(request.codigo());
    treinamento.setNome(request.nome());
    treinamento.setClassificacao(request.classificacao());
    treinamento.setNr(request.nr());
    treinamento.setCargaHoraria(request.cargaHoraria());
    treinamento.setValidadeMeses(request.validadeMeses());
    treinamento.setStatus(request.status());

    return TreinamentoResponse.from(
      repository.save(treinamento)
    );
  }

  @Transactional
  public void excluir(Long id) {
    Treinamento treinamento = buscarEntidade(id);
    repository.delete(treinamento);
  }

  private Treinamento buscarEntidade(Long id) {
    return repository.findById(id)
      .orElseThrow(() ->
        new EntityNotFoundException(
          "Treinamento não encontrado: " + id
        )
      );
  }

  private void validarCodigo(String codigo, Long id) {

    repository.findByCodigo(codigo)
      .ifPresent(existente -> {

        if (id == null || !existente.getId().equals(id)) {
          throw new IllegalArgumentException(
            "Já existe um treinamento com o código: "
              + codigo
          );
        }
      });
  }
}
