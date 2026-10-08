package br.com.senac.sgsst.api;

import br.com.senac.sgsst.dto.TreinamentoRequest;
import br.com.senac.sgsst.dto.TreinamentoResponse;
import br.com.senac.sgsst.service.TreinamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/treinamentos")
@RequiredArgsConstructor
public class TreinamentoApiController {

  private final TreinamentoService service;

  @GetMapping
  public ResponseEntity<List<TreinamentoResponse>> listar() {
    return ResponseEntity.ok(service.listar());
  }

  @GetMapping("/{id}")
  public ResponseEntity<TreinamentoResponse> buscarPorId(
    @PathVariable Long id
  ) {
    return ResponseEntity.ok(service.buscarPorId(id));
  }

  @PostMapping
  public ResponseEntity<TreinamentoResponse> criar(
    @Valid @RequestBody TreinamentoRequest request
  ) {
    TreinamentoResponse response = service.criar(request);

    return ResponseEntity
      .created(
        URI.create("/api/treinamentos/" + response.id())
      )
      .body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<TreinamentoResponse> atualizar(
    @PathVariable Long id,
    @Valid @RequestBody TreinamentoRequest request
  ) {
    return ResponseEntity.ok(
      service.atualizar(id, request)
    );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> excluir(
    @PathVariable Long id
  ) {
    service.excluir(id);

    return ResponseEntity.noContent().build();
  }
}
