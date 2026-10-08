package br.com.senac.sgsst.api;

import br.com.senac.sgsst.dto.ColaboradorRequest;
import br.com.senac.sgsst.dto.ColaboradorResponse;
import br.com.senac.sgsst.service.ColaboradorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colaboradores")
@CrossOrigin(origins = "*")
public class ColaboradorApiController {

  private final ColaboradorService service;

  public ColaboradorApiController(ColaboradorService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<ColaboradorResponse>> listar() {
    return ResponseEntity.ok(service.listar());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ColaboradorResponse> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(service.buscarPorId(id));
  }

  @PostMapping
  public ResponseEntity<ColaboradorResponse> cadastrar(@Valid @RequestBody ColaboradorRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ColaboradorResponse> atualizar(@PathVariable Long id, @Valid @RequestBody ColaboradorRequest request) {
    return ResponseEntity.ok(service.atualizar(id, request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> excluir(@PathVariable Long id) {
    service.excluir(id);
    return ResponseEntity.noContent().build();
  }
}


