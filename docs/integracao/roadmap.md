# SGSST — roadmap de integração para cinco integrantes

[GitHub Project público](https://github.com/users/marciocoelho1/projects/2) · [Análise](analise.md) · [Contrato proposto](contrato-proposto.md) · [Backlog detalhado](backlog.md) · [Passo a passo Git](passo-a-passo.md)

## Regra principal

**Dividir por domínio, não por camada.** Cada responsável entrega banco/schema, entidades JPA, repository, service/regras, DTO/controller REST, integração Angular e testes da própria fatia. Um monólito modular Spring Boot, um MySQL e o frontend existente. Márcio coordena a base e os contratos; não escreve o backend inteiro pelos colegas.

O roadmap é uma proposta para aprovação no G01. Os cartões representam trabalho futuro, não funcionalidades entregues. Sem nomes/logins dos quatro colegas, M2–M5 permanecem papéis a preencher; nenhum perfil foi escolhido por suposição.

## Divisão recomendada

| Papel | Responsabilidade e entregas | Limite para evitar conflitos | Revisor sugerido |
|---|---|---|---|
| **M1 — Márcio: base, acesso e administração** | Bootstrap Spring/MySQL/HTTP/erros; login/sessão; usuários/grupos/permissões; configurações e auditoria; CI/revisão/contratos | Dono de configurações, rotas, shell e dependências; não assume CRUD dos outros. Recuperação em F3 | M5 revisa autenticação/privacidade; outro colega revisa fundação |
| **M2 — Pessoas** | Colaboradores/cargos/setores; cadastro/lista/edição por ID; prontuário usando dados de T/E; adapter de importação de pessoas | Não duplica usuários/senhas nem mantém históricos por nome | M3, que consome pessoas/cargos |
| **M3 — Treinamentos** | Catálogo, LNT, participação/certificados, matriz calculada; depois reciclagens/turmas/inscrições/materiais e importação | Dono único do domínio e componente da matriz; não dividir o mesmo arquivo entre várias pessoas | M2; M5 pareia em testes/consumo na F2/F3 |
| **M4 — EPIs** | Catálogo/estoque/movimentos; entrega com baixa atômica/concorrência; tela/cadastro; depois importação/aceite aprovado | Não cria sua própria base de colaboradores; não grava entrega usando nome livre | M2 e M1 para transações/autorização |
| **M5 — Suporte e visões** | Chamados compartilhados entre perfis; área pessoal e dashboard/CSV; protocolo de importação; homologação integrada | Usa DTOs/serviços dos donos; não altera as entidades alheias nem valida sozinho os três tipos de planilha | M4; M1 valida propriedade/acesso |

### Equilíbrio de carga

Treinamentos é o domínio mais extenso; sua primeira entrega termina em catálogo, requisitos, certificado e matriz. Turmas/reciclagens/materiais vêm depois. M5 implementa suporte enquanto aguarda os contratos de dados e, em F2/F3, ajuda M3 em testes e consultas sem gerar dois donos para o mesmo arquivo. Márcio distribui revisão e coleta de evidências, em vez de virar o único gargalo de testes.

## Etapas e ordem de integração

### F0 — Fundação: acordo antes do trabalho paralelo

- G01: confirmar cinco pessoas, escopo, campos/identificadores, sessão/permissões, regras e importação.
- G02: bootstrap backend/banco com configuração coerente, `/api`, erros JSON, testes e schema reproduzível.
- G03: separar formulários por aba, modelos e serviços transversais.
- G04: padronizar ambiente, revisar dependências e criar CI real.
- G05: proteção de `main`, revisão e acesso de edição ao quadro.

**Porta de saída:** contrato aprovado e base compilando/conectando. G02/G03 podem ser desenvolvidos após G01; não é necessário esperar toda proteção G05 para começar módulos em branches. Não mergear sem revisão/testes.

### F1 — Módulos verticais em paralelo

- M1 A01/A02; M2 P01/P02; M3 T01/T02/T03; M4 E01/E02; M5 S01.
- Primeiro aceitar um fluxo pequeno: **cadastro de pessoa → persistência → consulta → reload**. Isso valida o padrão que os demais repetem.
- T/E podem desenvolver seus catálogos em paralelo à pessoa, mas gravar vínculos requer P01. Suporte integrado depende da identidade A01.
- Mock pode ser fixture de teste/protótipo com marcação explícita, não evidência de integração. Consumidor bloqueado negocia DTO com dono; não inventa outro contrato.

**Porta de saída:** cada domínio apresenta CRUD/regra real pela API e tela, com dado persistente.

### F2 — Integração entre domínios

- P03 prontuário; T04 matriz; E03 tela/entrega; S02 área pessoal; S03 dashboard; A03 regras/auditoria.
- Mesma pessoa, certificado e entrega devem aparecer nas várias visões sem cópias locais.

**MVP proposto:** F0–F2 + homologação F4. Inclui login/permissões, pessoas, catálogo/LNT/certificação/matriz, estoque/entrega, suporte, área pessoal/dashboard e configurações efetivas/auditoria.

### F3 — Expansão negociável, não requisito escondido

A04 recuperação, T05 turmas/reciclagens/materiais, E04 aceite, S04 protocolo de importação e P04/T06/E05 adapters. Priorizar conforme prazo exigido pelo professor. F3 preserva todas essas necessidades no planejamento; o grupo decide o que entra na apresentação.

Se adiado, **desabilitar ou rotular as ações**. Não deixar “importado”, “e-mail enviado”, “vinculado” ou “assinado” sem ação real. Se F3 entrar no aceite, adicionar as tarefas escolhidas como dependências de S05 antes de encerrá-lo.

### F4 — Homologação e entrega

S05 coordena testes ponta a ponta; G06 fecha documentação e demonstração depois de evidências. Não há datas artificiais: o grupo estima após G01 e informa o prazo da apresentação.

## Propriedade de arquivos

- M1: `app.config.ts`, `app.routes.ts`, `auth.guard.ts`, único `auth.service.ts`, `layout-padrao/*`, `package*.json`, `angular.json`, `src/styles.scss`, POM/Compose base, configuração security/CORS, CI e shell de cadastramentos.
- M2: `tela-colaboradores/*`, formulário pessoa extraído, serviços/modelos/pacote pessoas.
- M3: `tela-matriz-treinamento/*`, formulários treinamento/LNT/reciclagem e pacote treinamentos.
- M4: `tela-epis/*`, formulário EPI e pacote epis.
- M5: ambas telas de suporte, dashboard, área colaborador, importação/orquestrador e pacote consultas/suporte/importacao.
- Auditoria: M1 fornece interface central; cada domínio chama a interface sem reescrever o serviço comum.
- Migrações: dono do domínio escreve; M1 coordena nomes/ordem. Não editar script já aplicado.

Até G03 ser mergeado, **não editar simultaneamente** `tela-cadastramentos/cadastramentos.ts/.html` ou `dados-referencia.service.ts`. Avisar no cartão, combinar janela de edição e manter PR pequeno. Alteração transversal requer conversar com o dono antes de começar.

## Pipeline de colaboração

`Escolher cartão liberado → atualizar main → branch própria por tarefa → testes → commit → push → PR → revisão de outro integrante → CI → merge coordenado → homologar → concluir cartão`.

- Uma tarefa ativa por pessoa; uma branch por tarefa, não uma branch permanente com todo o semestre.
- Branches saem de `main`, PRs voltam para `main`. Sem `develop` adicional neste grupo: menos combinações e menos merges acumulados.
- Trabalho dependente só começa integração quando o contrato/base correspondente foi mergeado. PR dependente pode ficar draft, explicitamente bloqueado, sem encadear branches secretamente.
- Revisão mínima de outro integrante. M1 coordena merge; quando M1 é autor, outro colega aprova. Revisor não é autor.
- Não alterar contrato, dependências, banco comum ou arquivos alheios sem acordo.
- Check-in curto por encontro/dia de trabalho: cartão feito, evidência, próximo cartão e bloqueio. Evitar grandes PRs na véspera.

### Status do Project

- **A fazer:** dependências satisfeitas e escopo aprovado.
- **Em andamento:** responsável trabalhando, com branch/PR informado.
- **Em revisão:** PR pronto, testes/evidências disponíveis.
- **Bloqueado:** explicar dependência ou decisão faltante; não é “em andamento”.
- **Concluído:** merge + critérios de aceite demonstrados; escrever link do PR e resultado de teste no cartão.

Campos: Status, Fase, Responsável, Prioridade, Tipo, Dependências. Quadro organiza o dia a dia; tabela preserva a sequência. Os cartões são rascunhos de Project, não Issues; por isso não usar `Closes #P01`. A associação do papel a um login será feita no G01. Se precisarem automatizar fechamento por PR, converter o cartão em Issue deliberadamente e então usar o número real.

## Definition of Done de qualquer módulo

- [ ] DTO/rota/regra aprovados e sem alteração incompatível não combinada.
- [ ] Schema/migração versionados, constraints/FKs e seed fictício reproduzíveis.
- [ ] API validada com caso feliz e erro; acesso permitido/negado testado.
- [ ] Tela usa HTTP, estados carregando/vazio/erro e só informa sucesso após persistência.
- [ ] Refresh/restart conserva os dados e links por ID.
- [ ] Testes automáticos de service/controller/frontend e transações relevantes passam.
- [ ] Build/frontend e `verify`/backend passam; CI real verificada.
- [ ] PR pequeno, revisado por outra pessoa e mergeado; cartão tem evidência.

## Roteiro mínimo de homologação (S05)

1. Clone limpo, dependências e banco novo; iniciar ambos sem configuração secreta versionada.
2. Admin cria pessoa e usuário; listagem/reload/login individual corretos. Duplicidade 409 e dado inválido 400.
3. Criar treinamento/requisito; registrar certificado; verificar matriz, prontuário, área individual e dashboard.
4. Criar EPI/entrada; entregar; verificar saldo e histórico em todas as visões. Quantidade inválida/estoque insuficiente não grava. Dois pedidos concorrentes não excedem estoque.
5. Colaborador abre chamado; admin vê/transiciona; dono vê atualização. Outro usuário não acessa por trocar ID.
6. Alterar permissão/regra; acesso backend e comportamento mudam; auditoria registra ator verdadeiro. Sem sessão 401; sem direito 403.
7. Se F3 incluída: validar importação sem gravar, confirmar/repetir sem duplicar, turma sem exceder capacidade, recuperação com token expirado e aceite restrito ao dono.
8. Verificar botão/ação sem backend: remover falso sucesso, marcar limitação aprovada.

Cada passo precisa de resultado e evidência, não só checkbox marcado.
