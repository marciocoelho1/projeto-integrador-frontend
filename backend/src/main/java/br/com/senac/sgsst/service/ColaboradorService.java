package br.com.senac.sgsst.service;


import br.com.senac.sgsst.dto.ColaboradorRequest;
import br.com.senac.sgsst.dto.ColaboradorResponse;
import br.com.senac.sgsst.model.Colaborador;
import br.com.senac.sgsst.repository.ColaboradorRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {

  private final ColaboradorRepository repository;

  public ColaboradorService(ColaboradorRepository repository) {
    this.repository = repository;
  }

  @Transactional(readOnly = true)
  public List<ColaboradorResponse> listar() {
    return repository.findAll().stream()
      .map(this::toResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public ColaboradorResponse buscarPorId(Long id) {
    Colaborador entity = repository.findById(id)
      .orElseThrow(() -> new RuntimeException("Colaborador não encontrado com ID: " + id));
    return toResponse(entity);
  }

  @Transactional
  public ColaboradorResponse cadastrar(ColaboradorRequest request) {
    if (repository.existsByMatricula(request.getMatricula())) {
      throw new IllegalArgumentException("Matrícula já cadastrada no sistema.");
    }

    Colaborador entity = new Colaborador();
    BeanUtils.copyProperties(request, entity);

    return toResponse(repository.save(entity));
  }

  @Transactional
  public ColaboradorResponse atualizar(Long id, ColaboradorRequest request) {
    Colaborador entity = repository.findById(id)
      .orElseThrow(() -> new RuntimeException("Colaborador não encontrado com ID: " + id));

    if (repository.existsByMatriculaAndIdNot(request.getMatricula(), id)) {
      throw new IllegalArgumentException("Matrícula já está em uso por outro colaborador.");
    }

    BeanUtils.copyProperties(request, entity, "id");

    return toResponse(repository.save(entity));
  }

  @Transactional
  public void excluir(Long id) {
    if (!repository.existsById(id)) {
      throw new RuntimeException("Colaborador não encontrado com ID: " + id);
    }
    repository.deleteById(id);
  }

  private ColaboradorResponse toResponse(Colaborador entity) {
    ColaboradorResponse response = new ColaboradorResponse();
    BeanUtils.copyProperties(entity, response);
    return response;
  }
}
