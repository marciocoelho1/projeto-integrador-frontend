# Contrato proposto — aprovar no G01 antes da implementação

**Estado: proposta, não API existente.** Nenhum endpoint/DDL/backend descrito aqui foi entregue neste PR. Este é o ponto único de negociação de nomes, regras e fronteiras. Mudança de contrato exige PR e revisão dos consumidores, antes de alteração incompatível.

## 1. Base técnica e organização

- Angular continua na raiz; novo backend em `backend/`. Um processo Spring Boot, um MySQL, módulos/pacotes de domínio.
- Base didática: Spring Boot 3.5.16/Java 17, Web, Data JPA, Validation e MySQL. Confirmar resolução das dependências antes de fixar o POM. Spring Security e eventual Flyway são extensões ao conteúdo das aulas e precisam de aprovação do grupo.
- Backend em `http://localhost:8080`, API `/api`; Angular em `http://localhost:4200`. Front usa URL relativa `/api` com proxy de desenvolvimento coordenado por M1. Não espalhar porta 3000/8080 nos componentes.
- Banco local: nome `sgsst`; proposta de porta host 3307 e interna 3306. M1 define Compose/env compatíveis no G02 e documenta alternativa se a porta estiver ocupada. Aplicação não usa root; cada aluno possui banco/volume local, nunca um banco de desenvolvimento compartilhado por todos.
- Schema e seeds fictícios versionados. Recomenda-se Flyway com `ddl-auto=validate`; se o professor exigir outra abordagem, registrar no G01 um mecanismo executável de aplicar mudanças e reproduzir banco novo. `ddl-auto=update` sozinho não é um histórico de migrações.
- M1 reserva versões de migração por PR, não por aluno para sempre. Exemplo: V001 base, versões seguintes por ordem de merge. Migração aplicada não é editada: criar a próxima. Nunca enviar dump contendo dados pessoais reais.
- Pacotes: `config`, `auth`, `administracao`, `auditoria`, `pessoas`, `treinamentos`, `epis`, `suporte`, `consultas`, `importacao`. Cada domínio contém entity/model, DTO, repository, service e REST controller.
- Consulta agregada usa serviços de leitura dos donos; sem importar repositories/entidades internas dos colegas no controller da visão. DTOs evitam ciclos JPA e vazamento de senha.

## 2. Convenções JSON/HTTP

- IDs técnicos numéricos (`Long`) imutáveis; códigos/matrícula/CPF/CA são strings. Não usar nome como FK nem CPF como senha.
- Datas de negócio `YYYY-MM-DD`; instantes de auditoria em ISO 8601 com offset/UTC. Formatar `DD/MM/YYYY` apenas na UI. Carga horária em **minutos inteiros**; ocupação de turma calculada, não string `12 / 15`.
- Enums propostos: `ADMIN/COLABORADOR`; colaborador `ATIVO/INATIVO/AFASTADO`; usuário `ATIVO/INATIVO`; chamado `ABERTO/EM_ATENDIMENTO/RESOLVIDO`. Decidir mapeamentos dos status de treinamento na reunião.
- MVP: GET de coleção devolve array de DTOs, coerente com a aula; filtros documentados (`busca`, `status`, `cargoId`, `setorId`). Sem paginação silenciosa. Paginação é evolução explícita de contrato, caso necessária.
- POST de recurso: 201 com corpo/Location; PUT integral: 200; DELETE quando permitido: 204; 400 validação; 401 sem sessão; 403 acesso negado; 404 recurso inexistente; 409 duplicidade/estoque/conflito. Evitar exclusão física de registros referenciados; preferir inativação e preservar histórico.
- Erro no formato `ProblemDetail`, com `erros` para campos. Não devolver SQL, senha, stack trace ou HTML.

Exemplo **proposto**, não resposta capturada:

```json
{
  "type": "about:blank",
  "title": "Erro de validação",
  "status": 400,
  "detail": "Existem campos inválidos",
  "erros": { "email": "Informe um e-mail válido" }
}
```

## 3. Identidade e acesso — M1

Proposta didática: **sessão HTTP com Spring Security**, não implementar JWT manualmente só porque existe um serviço de token desconectado. Cookie de sessão HttpOnly; flags adequadas ao ambiente; proxy local. Mutações exigem CSRF e Angular envia o header acordado. GET `/api/auth/csrf` disponibiliza o token CSRF pelo mecanismo aprovado; login/logout/mutações são testados com ele. Token CSRF não é prova de identidade. Renovar/obter token ao iniciar o app e após login/logout; configurar a integração de SPA da versão Spring Security efetivamente resolvida (não copiar configuração exclusiva de outra versão). No login customizado, salvar o contexto via mecanismo SecurityContextRepository e aplicar proteção contra fixação de sessão; autenticar apenas uma requisição sem persistir o contexto não completa o fluxo.

- `POST /api/auth/login`: `{login, senha}`; autentica e salva contexto/sessão no servidor. Resposta expõe DTO de identidade, nunca senha/hash/ID de sessão.
- `POST /api/auth/logout`: invalida sessão e remove estado no browser.
- `GET /api/auth/me`: `{id, nomeExibicao, perfil, colaboradorId, permissoes}`; colaboradorId pode ser nulo no administrador.
- `/api/usuarios`, `/api/grupos`, `/api/configuracoes`, `/api/auditoria`: apenas administração autorizada. Não permitir atribuir a si mesmo perfil elevado.
- Grupo e permissões governam API e menu. Alterações de permissão/inativação invalidam ou reavaliam sessões segundo regra registrada. Usuário colaborador exige vínculo com uma pessoa; desativar pessoa/conta deve ter consequência explícita no acesso.
- Senha armazenada com encoder apropriado, nunca em claro. Seed local com credencial de desenvolvimento externa; CPF não é senha inicial. Recuperação A04 só exibe sucesso real ou fica desabilitada quando adiada.

## 4. Pessoas — M2

Entidades: `Cargo`, `Setor`, `Colaborador`. Campos mínimos da pessoa: `id`, `matricula`, `cpf`, `nome`, `email`, `cargoId`, `setorId`, `status`. Proposta: matrícula e CPF distintos/únicos; cadastro pede ambos, evitando gerar sem regra. Revisar se CPF realmente é necessário para a demonstração; apenas dados fictícios.

Rotas: `/api/cargos`, `/api/setores`, `/api/colaboradores`, `/api/colaboradores/{id}`, `/api/colaboradores/{id}/prontuario`.

Criar pessoa não cria automaticamente senha/usuário, a menos que G01 aprove fluxo transacional explícito com M1. Se mantido grupo no formulário de pessoa, usar operação de provisionamento acordada; não salvar um `grupoAcessoId` sem efeito.

## 5. Capacitação — M3

- `Treinamento`: id, código único, nome, classificação, NR, cargaHorariaMinutos, validadeMeses, status.
- `RequisitoTreinamento`: cargoId, treinamentoId e setorId opcional conforme regra LNT.
- `Participacao`: colaboradorId, treinamentoId, dataConclusao/status; turmaId apenas quando houver turmas.
- `Certificacao`: participação, instituição, emissão, validade; não confundir certificado individual com modelo/catálogo.
- Proposta de vencimento: dataValidade inclusiva; certificado vencido quando data de referência for posterior. Prazo deriva de regra aprovada, sem transformar mocks de NR em regra normativa. Testes incluem dia anterior, dia limite e dia seguinte.
- Matriz é consulta derivada de requisito e certificado vigente; sem requisito, estado `NAO_APLICAVEL`; sem certificado exigido, `PENDENTE`, sujeito à aprovação G01.
- Rotas: `/api/treinamentos`, `/api/requisitos-treinamento`, `/api/participacoes`, `/api/certificacoes`, `/api/matriz-treinamentos`.
- F3: `/api/reciclagens`, `/api/turmas`, `/api/inscricoes`, `/api/materiais`; capacidade numérica, inscrição sem exceder vagas, estados aprovados. Abrir material não prova conclusão.

## 6. Equipamentos — M4

`Epi`: id, código, descrição, ca (string), validadeCa, dataInclusao, estoque, estoqueMinimo. Definir separadamente vida útil/troca se incluída; não reutilizar validadeCa para qualquer validade.

`EntregaEpi`: id, colaboradorId, epiId, quantidade, dataEntrega, CA/data do histórico quando necessário; aceite posterior se aprovado. `MovimentacaoEstoque` preserva entradas/ajustes/baixas.

Rotas: `/api/epis`, `/api/movimentacoes-estoque`, `/api/entregas-epis`; filtro de histórico por colaborador permitido apenas ao perfil autorizado. Pedido de entrega:

```json
{ "colaboradorId": 10, "epiId": 4, "quantidade": 1, "dataEntrega": "2026-10-06" }
```

Entrega e baixa na mesma transação, com controle de concorrência. Quantidade inteira positiva; estoque insuficiente 409 sem alterações. Regra de CA vencido é decisão explícita do grupo. Não alterar saldo arbitrariamente no PUT do catálogo. Retry/duplo clique não pode criar duas entregas: adotar chave única da operação e testes correspondentes.

Aceite, se aprovado, só pelo destinatário autenticado; não chamar campo de nome de assinatura digital.

## 7. Suporte e visões — M5

- `/api/solicitacoes`: POST usa dono da sessão, tipo/descrição do payload; colaborador lista apenas suas solicitações; administração autorizada vê fila e transiciona status. Não aceitar owner/usuário arbitrário do browser.
- `/api/me/resumo`: identidade/vínculo, certificados, entregas e pendências próprios. Não aceitar colaboradorId livre em `/me`.
- `/api/dashboard`: apenas autorizado; numeradores/denominadores e data de referência explícitos. Evitar somar grupos sobrepostos. CSV corresponde à mesma consulta/filtro e neutraliza células de texto interpretáveis como fórmulas.
- Essas visões não criam tabelas duplicadas de certificados/entregas. M2/M3/M4 disponibilizam DTOs de leitura; M5 compõe.

## 8. Importação — M5 orquestra, M2/M3/M4 validam seu domínio

Proposta para reduzir risco: CSV primeiro; Excel somente após decisão da dependência G04. Mesmo esquema de campos do POST manual, sem coluna obrigatória inventada só no template.

1. `POST /api/importacoes/validar`: `{tipo, linhas}` normalizadas pelo parser, com limite aprovado de arquivo/linhas. Sem persistência; devolve erros com linha/campo e identificador de preview ligado ao usuário.
2. `POST /api/importacoes/confirmar`: identificador de preview, nunca autorização para enviar novas linhas diferentes. Token expira; servidor revalida e realiza operação atômica do lote. Erro em qualquer linha não produz gravação parcial invisível.
3. Repetir confirmação não duplica lote: resposta reapresenta resultado ou informa conflito, conforme decisão. Resultado traz `total`, `criados`, `atualizados`, `rejeitados`, `erros`; contagens reconciliáveis. MVP propõe **criação apenas**, rejeitando duplicados; atualização por importação exige decisão extra.

O backend não confia em validação do browser. M5 implementa protocolo/fila de adapters; cada dono reusa o serviço de negócio de seu cadastro. Sucesso visual só depois da resposta da confirmação.

## 9. Checklist de aprovação

- [ ] Nomes/logins de M2–M5 e revisores definidos.
- [ ] Escopo F0–F2/F3 e data de apresentação negociados pelo grupo, sem prazo inventado neste documento.
- [ ] Identificadores e vínculo usuário/pessoa aprovados.
- [ ] Sessão/CSRF, dependências adicionais e permissões aprovados.
- [ ] Campos e estados de cada DTO aprovados pelos consumidores.
- [ ] Schema reproduzível, estratégia de migração e credenciais locais aprovados.
- [ ] Regras de certificado/CA/conformidade e limite de importação aprovados.
- [ ] Expansões adiadas têm ações desabilitadas, sem falso sucesso.

Documentação técnica para consulta durante implementação: [Angular setup](https://angular.dev/installation), [Spring Security 6.5](https://docs.spring.io/spring-security/reference/6.5/servlet/index.html), [CSRF para SPA](https://docs.spring.io/spring-security/reference/6.5/servlet/exploits/csrf.html), [persistência da autenticação](https://docs.spring.io/spring-security/reference/servlet/authentication/persistence.html), [Spring REST](https://spring.io/guides/gs/rest-service/), [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects).
