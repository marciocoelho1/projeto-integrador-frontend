package br.com.senac.sgsst.repository;

import br.com.senac.sgsst.model.Treinamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TreinamentoRepository extends JpaRepository<Treinamento, Long> {

  Optional<Treinamento> findByCodigo(String codigo);

  boolean existsByCodigo(String codigo);
}
