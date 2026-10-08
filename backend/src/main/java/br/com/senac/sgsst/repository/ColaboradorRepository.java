package br.com.senac.sgsst.repository;

import br.com.senac.sgsst.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
  boolean existsByMatricula(String matricula);
  boolean existsByMatriculaAndIdNot(String matricula, Long id);
}
