# Backlog detalhado — SGSST

[Project](https://github.com/users/marciocoelho1/projects/2) · [Roadmap](roadmap.md)

Cartões de planejamento; nenhum backend está implementado neste PR. M2–M5 são papéis a associar a pessoas no G01. Apenas G01 inicia em **A fazer**; demais cartões ficam **Bloqueados** até escopo/dependências aprovados. F3 é expansão condicionada ao prazo/decisão, não funcionalidade já aprovada.

## Índice

| ID | Tarefa | Responsável | Fase | Prioridade | Depende de |
|---|---|---|---|---|---|
| G01 | Aprovar contrato, escopo e distribuição dos cinco integrantes | M1 — Márcio | F0 — Fundação | P0 | — |
| G02 | Criar base Spring/MySQL e contrato técnico compartilhado | M1 — Márcio | F0 — Fundação | P0 | G01 |
| G03 | Isolar formulários e fronteiras dos arquivos compartilhados | M1 — Márcio | F0 — Fundação | P0 | G01 |
| G04 | Fixar ambiente, revisar dependências e configurar CI de PR | M1 — Márcio | F0 — Fundação | P0 | G01, G02 |
| G05 | Configurar revisão e proteção da main | M1 — Márcio | F0 — Fundação | P0 | G01, G04 |
| A01 | Implementar login, sessão e autorização no servidor | M1 — Márcio | F1 — Módulos | P0 | G02 |
| A02 | Persistir usuários, grupos e permissões | M1 — Márcio | F1 — Módulos | P0 | A01, P01 |
| A03 | Persistir configurações e gerar auditoria no backend | M1 — Márcio | F2 — Integração | P1 | A02, P02, T03, E02, S01 |
| A04 | Entregar recuperação de senha real ou retirar a promessa de envio | M1 — Márcio | F3 — Expansão | P2 | A01, G01 |
| P01 | Criar entidades de colaboradores, cargos e setores | M2 — Pessoas | F1 — Módulos | P0 | G02 |
| P02 | Integrar cadastro, listagem e edição de colaboradores | M2 — Pessoas | F1 — Módulos | P0 | P01, G03, A01 |
| P03 | Montar prontuário por ID sem duplicar históricos | M2 — Pessoas | F2 — Integração | P1 | P02, T03, E02 |
| P04 | Validar e persistir importação de colaboradores | M2 — Pessoas | F3 — Expansão | P1 | P02, S04 |
| T01 | Criar catálogo de treinamentos e formulário real | M3 — Treinamentos | F1 — Módulos | P0 | G02, G03 |
| T02 | Persistir LNT e requisitos por cargo/setor | M3 — Treinamentos | F1 — Módulos | P1 | T01, P01 |
| T03 | Registrar participação e certificados emitidos | M3 — Treinamentos | F1 — Módulos | P0 | T01, P01, A01 |
| T04 | Integrar matriz calculada e histórico de capacitação | M3 — Treinamentos | F2 — Integração | P1 | T02, T03, P02 |
| T05 | Entregar reciclagens, turmas, inscrições e materiais | M3 — Treinamentos | F3 — Expansão | P2 | T04, S02 |
| T06 | Validar e persistir importação de treinamentos | M3 — Treinamentos | F3 — Expansão | P1 | T01, S04 |
| E01 | Criar catálogo e controle de estoque de EPI | M4 — EPIs | F1 — Módulos | P0 | G02, G03 |
| E02 | Registrar entrega e baixa atômica com concorrência | M4 — EPIs | F1 — Módulos | P0 | E01, P01, A01 |
| E03 | Integrar tela de EPI, edição e entrega por ID | M4 — EPIs | F2 — Integração | P0 | E02, P02 |
| E04 | Definir e integrar aceite de recebimento de EPI | M4 — EPIs | F3 — Expansão | P2 | E03, S02 |
| E05 | Validar e persistir importação de EPI | M4 — EPIs | F3 — Expansão | P1 | E01, S04 |
| S01 | Unificar chamados dos dois perfis e integrar suporte | M5 — Suporte e visões | F1 — Módulos | P0 | G02, A01 |
| S02 | Integrar área pessoal a consultas autorizadas /me | M5 — Suporte e visões | F2 — Integração | P0 | A02, T03, E02 |
| S03 | Integrar dashboard e exportação com indicadores reais | M5 — Suporte e visões | F2 — Integração | P1 | T04, E03, P02 |
| S04 | Criar protocolo de preview e confirmação de importação | M5 — Suporte e visões | F3 — Expansão | P1 | G02, G03, A01, P01, T01, E01 |
| S05 | Executar roteiro integrado e testes negativos dos cinco módulos | M5 — Suporte e visões | F4 — Homologação | P0 | A03, P03, T04, E03, S01, S02, S03, G04 |
| G06 | Fechar entrega, documentação e demonstração do grupo | M1 — Márcio | F4 — Homologação | P0 | S05, G05 |

## G01 — Aprovar contrato, escopo e distribuição dos cinco integrantes

**Responsável:** M1 — Márcio · **Fase:** F0 — Fundação · **Prioridade:** P0 · **Tipo:** Fundação

**Dependências:** Nenhuma; primeira decisão do grupo.

Reunir os cinco; associar M2–M5 a nomes/logins; aprovar docs/integracao/contrato-proposto.md. Decidir matrícula/CPF, vínculo usuário-colaborador, certificado emitido, validade CA, conformidade, suporte, importação e recuperação. Fixar Node 24 compatível, JDK 17 e abordagem de sessão.

**Critérios de aceite:**

- [ ] Decisões registradas no contrato com os cinco responsáveis identificados.
- [ ] MVP F0–F2 e expansão F3 explicitamente aprovados ou ajustados; nenhuma tela prometida desaparece sem decisão.
- [ ] JSON, relações, regras de acesso e pastas compartilhadas acordados antes dos PRs de módulos.

**Fronteira/arquivos:** docs/integracao/*.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## G02 — Criar base Spring/MySQL e contrato técnico compartilhado

**Responsável:** M1 — Márcio · **Fase:** F0 — Fundação · **Prioridade:** P0 · **Tipo:** Fundação

**Dependências:** G01.

Adicionar backend/ mantendo Angular na raiz. Basear-se somente no REST, services, repositories e DTOs das aulas; remover MVC/Thymeleaf. Fixar Maven Wrapper/JDK 17, MySQL 8.4, perfil local, credenciais externas, CORS /api/**, ProblemDetail e política de schema. Centralizar URL Angular, autenticação e /api. Criar SQL versionado e sementes fictícias.

**Critérios de aceite:**

- [ ] Clone novo sobe banco e backend seguindo README, com porta/usuário/senha coerentes.
- [ ] GET /api/health e preflight para localhost:4200 respondem corretamente.
- [ ] Validação gera JSON 400; inexistente gera 404; não há redirect HTML.
- [ ] backend/ contém testes executáveis e bootstrap de schema não depende de alterações manuais invisíveis.

**Fronteira/arquivos:** backend/*; configuração HTTP Angular; README de execução.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## G03 — Isolar formulários e fronteiras dos arquivos compartilhados

**Responsável:** M1 — Márcio · **Fase:** F0 — Fundação · **Prioridade:** P0 · **Tipo:** Fundação

**Dependências:** G01.

Extrair cada aba de Cadastramentos para componentes separados, preservando layout. Separar modelos e serviços de cargos/setores versus grupos; manter um único AuthService. Definir arquivos sob coordenação do líder e reservar versões SQL por módulo.

**Critérios de aceite:**

- [ ] Cada módulo pode alterar seu formulário sem editar o mesmo HTML/TS coletivo.
- [ ] Cadastramentos continua navegando por query param aba e build/testes não regridem.
- [ ] Donos de rotas, configurações, dependências e shell estão documentados.

**Fronteira/arquivos:** src/app/tela-cadastramentos/*; src/app/service/dados-referencia.service.ts; novos componentes/modelos.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## G04 — Fixar ambiente, revisar dependências e configurar CI de PR

**Responsável:** M1 — Márcio · **Fase:** F0 — Fundação · **Prioridade:** P0 · **Tipo:** Validação

**Dependências:** G01, G02.

Padronizar Node 24 compatível com Angular 22 e JDK 17; revisar npm audit inclusive xlsx/repomix. Criar Actions com npm ci, build e testes; job Maven verify com MySQL isolado e SQL de teste. Ajustar README, que hoje indica Node 18. Não usar npm audit fix --force indiscriminadamente.

**Critérios de aceite:**

- [ ] CI real executa frontend e backend, não só compila.
- [ ] Falhas e vulnerabilidades têm correção ou decisão registrada; ambiente documentado e reproduzível.
- [ ] Avisos de budgets e falhas específicas com Node 26 são registrados sem declarar regressões inexistentes.

**Fronteira/arquivos:** .github/workflows/*; package*.json; README.md; backend/pom.xml.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## G05 — Configurar revisão e proteção da main

**Responsável:** M1 — Márcio · **Fase:** F0 — Fundação · **Prioridade:** P0 · **Tipo:** Fundação

**Dependências:** G01, G04.

Definir proteção/ruleset de main conforme disponibilidade: PR, uma aprovação de outro integrante, checks reais, sem force push/exclusão. Conceder acesso de edição ao Project aos quatro colegas depois de confirmar logins; o Project público permite leitura sem convite.

**Critérios de aceite:**

- [ ] Fluxo e permissões testados com um colega; nenhum aluno depende de push direto na main.
- [ ] Checks obrigatórios usam nomes de jobs que existem; limitações do plano GitHub registradas.
- [ ] M2–M5 atribuídos a pessoas reais e cartões com responsabilidade clara.

**Fronteira/arquivos:** Configurações do repositório e do Project; docs/integracao/passo-a-passo.md.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## A01 — Implementar login, sessão e autorização no servidor

**Responsável:** M1 — Márcio · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** G02.

Adicionar Spring Security como extensão à aula. Implementar login/logout/me com senha hash e sessão aprovada; consolidar os dois AuthService, remover contas hardcoded e localStorage como prova de acesso. Integrar login/guard/menu. Preferência didática: sessão HTTP, proxy Angular e CSRF para mutações.

**Critérios de aceite:**

- [ ] Login válido cria sessão; inválido responde 401; logout invalida sessão no backend.
- [ ] Chamadas sem autenticação recebem 401 e perfil sem permissão recebe 403 mesmo por curl.
- [ ] Alterar localStorage ou ID no pedido não concede perfil nem identidade.

**Fronteira/arquivos:** backend/.../auth; backend/.../config/security; src/app/auth.service.ts; src/app/auth.guard.ts; src/app/tela-login/*; layout.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## A02 — Persistir usuários, grupos e permissões

**Responsável:** M1 — Márcio · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** A01, P01.

CRUD de usuários/grupos, vínculo opcional com colaborador para administrador e obrigatório para usuário colaborador. Padronizar ADMIN/COLABORADOR e mapear permissões do menu. Evitar duplicar dados pessoais e usar CPF como senha.

**Critérios de aceite:**

- [ ] Usuário criado na configuração consegue login e enxerga apenas módulos permitidos.
- [ ] Desativação bloqueia novos acessos e sessão anterior conforme regra aprovada.
- [ ] Grupos e permissões persistem após restart; unicidade e vínculo validados.

**Fronteira/arquivos:** backend/.../administracao; src/app/tela-configuracoes/*; modelos de usuário/grupo.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## A03 — Persistir configurações e gerar auditoria no backend

**Responsável:** M1 — Márcio · **Fase:** F2 — Integração · **Prioridade:** P1 · **Tipo:** Integração

**Dependências:** A02, P02, T03, E02, S01.

Persistir regras globais e parâmetros aprovados. Expor auditoria apenas a autorizado; gerar eventos de mutação no servidor com identidade real, sem aceitar nome de autor enviado pelo browser. Não logar senha, token ou CPF completo.

**Critérios de aceite:**

- [ ] Alteração de regra persiste e muda comportamento efetivo, não apenas switch visual.
- [ ] Cadastro/edição/entrega/chamado produzem logs com ator correto e data do servidor.
- [ ] Falhas transacionais não geram log de sucesso; leitura não autorizada negada.

**Fronteira/arquivos:** backend/.../administracao; backend/.../auditoria; src/app/service/audit.service.ts; tela-configuracoes.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## A04 — Entregar recuperação de senha real ou retirar a promessa de envio

**Responsável:** M1 — Márcio · **Fase:** F3 — Expansão · **Prioridade:** P2 · **Tipo:** Expansão

**Dependências:** A01, G01.

Conforme decisão do grupo: token aleatório de uso único e prazo, hash do token e envio via canal configurado; resposta genérica para evitar enumeração. Se fora do MVP, desabilitar a tela e explicar claramente que recuperação não está disponível. Nunca alegar e-mail enviado sem envio real.

**Critérios de aceite:**

- [ ] Se implementada: token expira, não reutiliza, senha antiga deixa de valer e nenhum segredo é retornado em resposta pública.
- [ ] Se adiada: decisão e limitação visíveis na demonstração e UI sem falso sucesso.

**Fronteira/arquivos:** backend/.../auth; src/app/tela-recuperar-senha/*.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## P01 — Criar entidades de colaboradores, cargos e setores

**Responsável:** M2 — Pessoas · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** G02.

Criar IDs/FKs próprios; matrícula/CPF distintos e únicos conforme decisão G01. DTOs com email, cargoId, setorId e status. Implementar repositories/services/REST para cargos, setores e colaboradores; seed de pessoas fictícias.

**Critérios de aceite:**

- [ ] POST colaborador persiste e GET recupera após restart.
- [ ] Matrícula/CPF duplicado retorna 409 e campos inválidos 400; cargo/setor inexistente é rejeitado.
- [ ] FKs usam IDs, nunca nomes; usuário só é criado pelo fluxo acordado com M1.

**Fronteira/arquivos:** backend/.../pessoas; SQL de pessoas; src/app/models/*pessoa*; src/app/service/colaborador.service.ts.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## P02 — Integrar cadastro, listagem e edição de colaboradores

**Responsável:** M2 — Pessoas · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Integração

**Dependências:** P01, G03, A01.

Ligar formulário de colaborador e tela de consulta à API. Resolver ausência de matrícula no cadastro versus lista. Atualizar por ID imutável e não matrícula editada; busca/filtros por contrato. Exibir carregamento, vazio e erros; toast somente após resposta de sucesso.

**Critérios de aceite:**

- [ ] Criar e editar no browser altera dado persistido e lista após reload.
- [ ] Alterar matrícula/nome não perde registro nem relações.
- [ ] Falha HTTP mantém formulário e mostra mensagem sem anunciar sucesso.

**Fronteira/arquivos:** src/app/tela-colaboradores/*; formulário colaborador extraído; src/app/service/colaborador.service.ts.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## P03 — Montar prontuário por ID sem duplicar históricos

**Responsável:** M2 — Pessoas · **Fase:** F2 — Integração · **Prioridade:** P1 · **Tipo:** Integração

**Dependências:** P02, T03, E02.

Substituir dicionários por nome por consultas de certificados, entregas e reciclagens via colaboradorId. Utilizar serviços de leitura dos módulos e não acessar arrays/JPA internos dos colegas.

**Critérios de aceite:**

- [ ] Duas pessoas homônimas têm históricos separados.
- [ ] Renomear colaborador preserva todo histórico.
- [ ] Dados conferem com matriz/estoque/área pessoal e acessos indevidos retornam 403.

**Fronteira/arquivos:** src/app/tela-colaboradores/*; backend/.../consultas/prontuario.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## P04 — Validar e persistir importação de colaboradores

**Responsável:** M2 — Pessoas · **Fase:** F3 — Expansão · **Prioridade:** P1 · **Tipo:** Expansão

**Dependências:** P02, S04.

Definir template com os mesmos campos do cadastro; implementar adapter validador do domínio para linhas, matrícula/CPF, email, cargo/setor e duplicidades. Confirmar pelo mesmo serviço de negócio usado no POST manual.

**Critérios de aceite:**

- [ ] Planilha válida cria pessoas visíveis após reload.
- [ ] Linha inválida e duplicidade retornam posição/campo/erro sem falso sucesso.
- [ ] Reenvio de lote já confirmado não duplica registros e total bate com resultado.

**Fronteira/arquivos:** backend/.../pessoas/importacao; template colaboradores; testes de importação.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## T01 — Criar catálogo de treinamentos e formulário real

**Responsável:** M3 — Treinamentos · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** G02, G03.

CRUD treinamento: código, nome, classificação, NR, cargaHorariaMinutos, validadeMeses, status. Integrar aba de cadastro e catálogo na matriz; transformar carga horária textual em número e padronizar datas/status.

**Critérios de aceite:**

- [ ] Cadastro aparece no catálogo após reload.
- [ ] Código único, duração positiva e validade aprovada validados no backend.
- [ ] Formulário possui binding real; NR/validade demonstrativa não é tratada como norma legal validada.

**Fronteira/arquivos:** backend/.../treinamentos; formulário treinamento; src/app/tela-matriz-treinamento/*.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## T02 — Persistir LNT e requisitos por cargo/setor

**Responsável:** M3 — Treinamentos · **Fase:** F1 — Módulos · **Prioridade:** P1 · **Tipo:** Módulo

**Dependências:** T01, P01.

Relação cargo-treinamento com setor opcional conforme contrato. Integrar aba LNT usando IDs e tabela de junção, não lista concatenada de nomes.

**Critérios de aceite:**

- [ ] Requisito criado persiste e pode ser alterado sem duplicidade.
- [ ] Cargo/treinamento inexistente rejeitado; mesma combinação não duplica.
- [ ] Listagem de requisitos é consumível pelo cálculo de matriz.

**Fronteira/arquivos:** backend/.../treinamentos/lnt; formulário LNT; matriz-treinamento.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## T03 — Registrar participação e certificados emitidos

**Responsável:** M3 — Treinamentos · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** T01, P01, A01.

Separar catálogo de certificado efetivamente emitido. Relacionar colaborador e treinamento por ID; conclusão, instituição, emissão e validade. Implementar gravação transacional e DTO de consulta para área pessoal/prontuário; substituir modais que apenas fecham.

**Critérios de aceite:**

- [ ] Conclusão/certificado persistidos e vinculados à pessoa correta.
- [ ] Data inválida, certificado duplicado e vínculos inexistentes rejeitados conforme contrato.
- [ ] Status vigente/vencido é calculado pelo servidor e limite de validade testado.

**Fronteira/arquivos:** backend/.../treinamentos/participacao; backend/.../treinamentos/certificado; matriz-treinamento.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## T04 — Integrar matriz calculada e histórico de capacitação

**Responsável:** M3 — Treinamentos · **Fase:** F2 — Integração · **Prioridade:** P1 · **Tipo:** Integração

**Dependências:** T02, T03, P02.

Gerar matriz a partir de requisitos e certificados, não tabela editável desconectada. Remover coleções duplicadas e fornecer projeções ao dashboard/prontuário/área pessoal. M5 ajuda nos testes de borda sem editar simultaneamente o componente principal.

**Critérios de aceite:**

- [ ] Nova conclusão muda matriz, prontuário e consultas agregadas de forma coerente.
- [ ] Vencimento muda estado sem edição manual e testes fixam a data de referência.
- [ ] Combinações sem requisito/certificado têm estado acordado e não são inventadas na UI.

**Fronteira/arquivos:** backend/.../treinamentos/consultas; src/app/tela-matriz-treinamento/*.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## T05 — Entregar reciclagens, turmas, inscrições e materiais

**Responsável:** M3 — Treinamentos · **Fase:** F3 — Expansão · **Prioridade:** P2 · **Tipo:** Expansão

**Dependências:** T04, S02.

Persistir pendências/prazos, turma/instrutor/data/capacidade, inscrição e material por treinamento. M5 pode parear nos testes/consumo da área pessoal; M3 mantém domínio único. Formalizar estados e vagas numéricas. Se reduzido o escopo, desabilitar ações correspondentes em vez de manter falsas confirmações.

**Critérios de aceite:**

- [ ] Inscrição não ultrapassa capacidade; ocupação deriva de inscrições.
- [ ] Pendência/material da pessoa correta aparecem na área individual.
- [ ] Clique em link não é registrado como treinamento concluído nem prova de estudo.
- [ ] Cadastro de reciclagem persiste ou fica explicitamente fora da demonstração aprovada.

**Fronteira/arquivos:** backend/.../treinamentos/reciclagem; turmas; materiais; matriz/formulários; área colaborador.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## T06 — Validar e persistir importação de treinamentos

**Responsável:** M3 — Treinamentos · **Fase:** F3 — Expansão · **Prioridade:** P1 · **Tipo:** Expansão

**Dependências:** T01, S04.

Alinhar template ao catálogo real; mapear unidade de duração, validade e código. Reusar validação/serviço de treinamento; obrigatoriedade é relação LNT e não booleano universal herdado da planilha.

**Critérios de aceite:**

- [ ] Linhas válidas persistem com unidade correta e código único.
- [ ] Erros por linha e duplicidades seguem contrato de importação.
- [ ] Template, preview e POST manual têm campos equivalentes.

**Fronteira/arquivos:** backend/.../treinamentos/importacao; template treinamentos.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## E01 — Criar catálogo e controle de estoque de EPI

**Responsável:** M4 — EPIs · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** G02, G03.

CRUD EPI: código/descrição, CA textual, validadeCa separada de vida útil, estoque e estoqueMinimo. Histórico de movimentação para entradas/ajustes; não permitir alteração livre do saldo no PUT do catálogo sem trilha. Integrar formulário EPI.

**Critérios de aceite:**

- [ ] EPI cadastrado é persistido e consultado após restart.
- [ ] Quantidade inteira não negativa e CA/datagem conforme decisão aprovados.
- [ ] Entrada/ajuste de saldo gera movimento e trilha; catálogo não perde histórico.

**Fronteira/arquivos:** backend/.../epis; SQL EPI; formulário EPI; src/app/service/epis.service.ts.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## E02 — Registrar entrega e baixa atômica com concorrência

**Responsável:** M4 — EPIs · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** E01, P01, A01.

Entrega por colaboradorId e epiId; quantidade positiva/integral, data e regra de CA. @Transactional para entrega/baixa; lock ou atualização condicional para evitar dupla entrega concorrente. Guardar snapshot do CA necessário ao histórico; proteger contra reenvio duplicado.

**Critérios de aceite:**

- [ ] Entrega válida reduz saldo e cria histórico na mesma transação.
- [ ] Estoque insuficiente gera 409 sem entrega nem saldo negativo.
- [ ] Dois pedidos concorrentes para saldo unitário não geram duas entregas.
- [ ] Quantidade zero/negativa/fracionária e pessoa inválida são rejeitadas.

**Fronteira/arquivos:** backend/.../epis/entregas; testes transacionais MySQL; movimentos.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## E03 — Integrar tela de EPI, edição e entrega por ID

**Responsável:** M4 — EPIs · **Fase:** F2 — Integração · **Prioridade:** P0 · **Tipo:** Integração

**Dependências:** E02, P02.

Usar EpisService com DTO completo, incluindo quantidade/CA. Select/autocomplete devolve ID de colaborador; remover listas fixas. Depois de salvar recarregar saldo/histórico do servidor. Erros/carregamento e botão protegido contra duplo clique.

**Critérios de aceite:**

- [ ] Entrega no browser aparece após reload com saldo correto.
- [ ] Nome livre/homônimos não vinculam entrega à pessoa errada.
- [ ] Falha não altera saldo otimisticamente nem mostra toast de sucesso.

**Fronteira/arquivos:** src/app/tela-epis/*; src/app/service/epis.service.ts; modelos EPI.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## E04 — Definir e integrar aceite de recebimento de EPI

**Responsável:** M4 — EPIs · **Fase:** F3 — Expansão · **Prioridade:** P2 · **Tipo:** Expansão

**Dependências:** E03, S02.

Se aprovado, registrar aceite autenticado somente pelo destinatário com instante e trilha. Não chamar o texto assinatura/nome de assinatura digital ou comprovação jurídica. Se fora do MVP, rotular como pendente e não implementar confirmação fictícia.

**Critérios de aceite:**

- [ ] Outro colaborador não aceita entrega alheia por trocar ID.
- [ ] Aceite idempotente persiste com ator/data e não altera estoque novamente.
- [ ] Natureza e limite da confirmação estão claros na UI/documentação.

**Fronteira/arquivos:** backend/.../epis/aceite; src/app/tela-area-colaborador/*; tela EPI.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## E05 — Validar e persistir importação de EPI

**Responsável:** M4 — EPIs · **Fase:** F3 — Expansão · **Prioridade:** P1 · **Tipo:** Expansão

**Dependências:** E01, S04.

Alinhar planilha ao cadastro (CA, validadeCa, estoque inicial/mínimo). Não confundir validade em dias, vencimento do CA e vida útil. Reusar serviço de catálogo e movimentação; decidir duplicidade por código e rejeitar ajuste cego de saldo.

**Critérios de aceite:**

- [ ] Importação cria catálogo/saldo inicial com histórico e resultado por linha.
- [ ] CA/data/estoque inválidos rejeitados e lote repetido não duplica.
- [ ] Template não exige fabricante/setor de risco se tais campos não estiverem aprovados.

**Fronteira/arquivos:** backend/.../epis/importacao; template EPI.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## S01 — Unificar chamados dos dois perfis e integrar suporte

**Responsável:** M5 — Suporte e visões · **Fase:** F1 — Módulos · **Prioridade:** P0 · **Tipo:** Módulo

**Dependências:** G02, A01.

Entidade única de solicitação com solicitante da sessão, tipo, descrição, status e datas. POST/lista do colaborador e fila do admin usam mesma tabela; transições aprovado aberto/em atendimento/resolvido ou equivalentes. Não confiar em ownerMatricula informado pelo browser.

**Critérios de aceite:**

- [ ] Chamado aberto por colaborador aparece na fila admin após reload.
- [ ] Admin atualiza estado e solicitante vê atualização.
- [ ] Pessoa A não lê/altera chamado de B; mudanças inválidas retornam erro.

**Fronteira/arquivos:** backend/.../suporte; src/app/tela-ajuda-suporte/*; tela-ajuda-suporte-colaborador/*.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## S02 — Integrar área pessoal a consultas autorizadas /me

**Responsável:** M5 — Suporte e visões · **Fase:** F2 — Integração · **Prioridade:** P0 · **Tipo:** Integração

**Dependências:** A02, T03, E02.

Consultar identidade/vínculo, certificados, entregas e pendências disponíveis do usuário autenticado. Montar DTO de leitura chamando serviços dos domínios; não manter arrays iguais para todas as pessoas nem replicar entidades.

**Critérios de aceite:**

- [ ] Dois colaboradores recebem apenas dados próprios e diferentes.
- [ ] Login/logout troca identidade sem deixar cache do usuário anterior.
- [ ] Backend deriva colaboradorId da sessão; editar query/body/localStorage não acessa outra pessoa.

**Fronteira/arquivos:** backend/.../consultas/me; src/app/tela-area-colaborador/*; serviços de leitura.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## S03 — Integrar dashboard e exportação com indicadores reais

**Responsável:** M5 — Suporte e visões · **Fase:** F2 — Integração · **Prioridade:** P1 · **Tipo:** Integração

**Dependências:** T04, E03, P02.

Definir numerador/denominador e categorias de cada indicador; usar consultas agregadas de pessoas/treinamentos/EPI com data de referência. Exportar os mesmos filtros/dados, escapando fórmulas em CSV; evitar somar categorias sobrepostas.

**Critérios de aceite:**

- [ ] Totais conferem com cenário de seed e consultas individuais.
- [ ] Conclusão e entrega mudam indicadores após refresh.
- [ ] CSV contém dados reais com filtros e texto não vira fórmula executável de planilha.

**Fronteira/arquivos:** backend/.../consultas/dashboard; src/app/tela-dashboard/*; dashboard.service.ts.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## S04 — Criar protocolo de preview e confirmação de importação

**Responsável:** M5 — Suporte e visões · **Fase:** F3 — Expansão · **Prioridade:** P1 · **Tipo:** Expansão

**Dependências:** G02, G03, A01, P01, T01, E01.

Orquestrar parser/preview e dispatcher, sem assumir validação de todos os domínios. Proposta: CSV primeiro, XLSX/XLS apenas após revisão de dependência; limite de arquivo/linhas, validação sem gravação, token de preview de uso único e confirmação que revalida atomicamente. M2/M3/M4 implementam adapters.

**Critérios de aceite:**

- [ ] Preview não grava nada; confirmação só anuncia sucesso após resposta real.
- [ ] Erro em lote produz total e linhas coerentes; não há commit parcial oculto.
- [ ] Token pertence ao usuário, expira e evita duplicar confirmação.
- [ ] XLSX/XLS continuam explicitamente bloqueados se a dependência vulnerável não tiver solução aprovada.

**Fronteira/arquivos:** backend/.../importacao; src/app/tela-importacao-massa/*; templates.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## S05 — Executar roteiro integrado e testes negativos dos cinco módulos

**Responsável:** M5 — Suporte e visões · **Fase:** F4 — Homologação · **Prioridade:** P0 · **Tipo:** Validação

**Dependências:** A03, P03, T04, E03, S01, S02, S03, G04.

Coordenar teste ponta a ponta com os cinco: cadastro/login, certificado/matriz, entrega/estoque, suporte, permissões e auditoria. Se F3 incluída, adicionar imports/turmas/recuperação/aceite como dependências antes de fechar. Registrar evidências e defeitos, não implementar o domínio alheio silenciosamente.

**Critérios de aceite:**

- [ ] Clone limpo e banco novo reproduzem fluxo; reload/restart preserva dados.
- [ ] 403 por IDOR, estoque concorrente, duplicidade, formulário inválido e falha HTTP testados.
- [ ] Nenhum botão anuncia ação não persistida; telas fora do escopo ficam identificadas.
- [ ] F3 incluída só é aceita com suas evidências próprias.

**Fronteira/arquivos:** docs/integracao/roteiro-homologacao; testes frontend/backend; evidências de PRs.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.

## G06 — Fechar entrega, documentação e demonstração do grupo

**Responsável:** M1 — Márcio · **Fase:** F4 — Homologação · **Prioridade:** P0 · **Tipo:** Validação

**Dependências:** S05, G05.

Revisar PRs, estado do quadro e decisões de expansão. Consolidar README do clone limpo, scripts/SQL e limitações. Preparar demonstração com dados fictícios; release/tag somente após aceite do grupo. Todos devem explicar seu módulo.

**Critérios de aceite:**

- [ ] Main corresponde a PRs revisados com CI verificada e roteiro aprovado.
- [ ] Documentação executável, sem senhas reais, sem depender do banco particular de um aluno.
- [ ] Cada integrante demonstra CRUD/regra/testes do próprio módulo e cartões concluídos têm evidência.
- [ ] Nenhuma funcionalidade pendente é apresentada como entregue.

**Fronteira/arquivos:** README.md; docs/integracao/*; GitHub Project; release quando autorizada.

**Evidência para concluir:** PR mergeado + comandos e resultados dos testes + demonstração dos critérios. Para decisão, registrar aprovação; para configuração, ler/testar estado salvo.
