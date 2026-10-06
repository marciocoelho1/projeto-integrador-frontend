# Oito tarefas até sexta, 09/10/2026

[Project](https://github.com/users/marciocoelho1/projects/2) · [Plano simples](roadmap.md) · [Guia Git](passo-a-passo.md)

O plano anterior de 30 tarefas foi substituído. Só estas oito são necessárias para o recorte de **três CRUDs locais**. Nenhuma está implementada por esta documentação. Datas são metas; confirmar o escopo com o professor.

| Nº | O que fazer | Responsável | Entregar até |
|---|---|---|---|
| 01 | Combinar quem faz cada parte e confirmar o escopo | Márcio | 06/10/2026 |
| 02 | Preparar um backend e um banco para o grupo | Márcio | 06/10/2026 |
| 03 | CRUD de colaboradores + tela da lista | Aluno 2 — Colaboradores | 07/10/2026 |
| 04 | CRUD do catálogo de treinamentos + sua lista | Aluno 3 — Treinamentos | 07/10/2026 |
| 05 | CRUD de EPIs + sua lista | Aluno 4 — EPIs | 07/10/2026 |
| 06 | Ligar os três formulários de cadastro ao backend | Aluno 5 — Formulários | 07/10/2026 |
| 07 | Juntar as branches e testar os três CRUDs | Márcio + grupo | 08/10/2026 |
| 08 | Ensaiar e apresentar na sexta, 09/10 | Aluno 5 + grupo | 09/10/2026 |

## 01 — Combinar quem faz cada parte e confirmar o escopo

**Responsável:** Márcio · **Meta:** 06/10/2026

Reunir os cinco e colocar o nome real de cada colega nos papéis Aluno 2, 3, 4 e 5. A entrega de sexta, 09/10/2026, será uma demonstração local com três CRUDs: colaboradores, treinamentos e EPIs. CRUD significa cadastrar, listar, editar e excluir. Não integrar login real, entregas de EPI, certificados, matriz calculada, dashboard, importação ou suporte nesta semana. Confirmar com o professor se esse recorte atende à avaliação; se ele exigir tudo, negociar hoje, não prometer sem condição.

Pronto quando: os cinco conhecem sua parte, os campos de contrato-proposto.md estão combinados e o professor foi consultado sobre o recorte.

Não é código já feito; esta é uma tarefa do grupo.

## 02 — Preparar um backend e um banco para o grupo

**Responsável:** Márcio · **Meta:** 06/10/2026

Usar o backend de aulasJavaSenac como exemplo. Colocar um único projeto Spring Boot em backend/, mantendo o Angular na raiz. Reaproveitar Web, JPA, Validation, MySQL e Maven Wrapper da aula. Não copiar loja-angular, templates ou controllers de páginas. Criar banco sgsst, ajustar porta/usuário/senha local, manter ddl-auto=update como na aula e corrigir CORS para /api/**. Remover os controllers/seeds da loja que não pertencem ao SGSST; não levar dependências/imports de ProdutoController/ProdutoForm sem uso para a nova API. Entregar modelo de pastas e um README curto de execução; credenciais reais não entram no Git.

Angular: http://localhost:4200. Backend: http://localhost:8080. Cada CRUD terá /api/colaboradores, /api/treinamentos ou /api/epis. Backend e banco só locais; dados fictícios; não publicar API sem autenticação na internet. Não adicionar Spring Security, JWT, Flyway, Docker obrigatório ou CI nesta semana.

Começar depois de 01. Os colegas usam essa base depois de seu PR ser integrado na main.

Pronto quando: Spring inicia e conecta no banco; os quatro colegas conseguem repetir a execução pelo README. Márcio prepara a estrutura; não precisa escrever os três CRUDs sozinho.

## 03 — CRUD de colaboradores + tela da lista

**Responsável:** Aluno 2 — Colaboradores · **Meta:** 07/10/2026

Usar Produto das aulas como modelo para Colaborador. Criar Colaborador.java, ColaboradorRepository, ColaboradorService, ColaboradorRequest, ColaboradorResponse e ColaboradorApiController. Campos: id numérico, matricula, nome, cpf, email, cargo, setor, status. Cargo/setor são textos; não criar novas tabelas para eles nesta entrega. Rotas em /api/colaboradores: GET lista/detalhe, POST, PUT por id e DELETE por id. Atualizar sempre pelo id, não pelo nome/matrícula.

Preencher colaborador.service.ts e ligar a lista/edição/exclusão em tela-colaboradores. Adicionar confirmação antes de excluir. Entregar ao Aluno 5 os métodos listar(), buscar(id), cadastrar(dados), atualizar(id,dados), excluir(id). O formulário central de cadastramentos é do Aluno 5; não editar esse arquivo junto com ele.

Começar após 02; trabalhar em feat/colaboradores.

Pronto quando: criar, listar, editar e excluir funcionam na API; a lista do frontend carrega do banco; editar/excluir funciona pela tela; recarregar/reiniciar mantém os dados. Testar nome vazio e matrícula repetida sem salvar. Somente pessoas fictícias; prontuário/históricos ficam fora desta semana.

## 04 — CRUD do catálogo de treinamentos + sua lista

**Responsável:** Aluno 3 — Treinamentos · **Meta:** 07/10/2026

Repetir o CRUD de Produto da aula para Treinamento: model, repository, service, Request/Response e ApiController. Campos: id numérico, codigo, nome, classificacao, nr, cargaHoraria (texto, por exemplo 8h), validadeMeses (inteiro), status Ativo/Inativo. Rotas /api/treinamentos com GET, POST, PUT e DELETE. Não vincular treinamento a colaborador nem implementar certificados/LNT/reciclagens/matriz calculada.

Criar treinamento.service.ts com listar(), buscar(id), cadastrar(dados), atualizar(id,dados), excluir(id). Integrar somente a aba de catálogo/lista de treinamentos em tela-matriz-treinamento. As outras abas ficam sinalizadas como demonstração. O Aluno 5 cuida do formulário central de cadastro.

Começar após 02; branch feat/treinamentos.

Pronto quando: CRUD funciona na API e listagem/edição/exclusão do catálogo usa banco. Testar nome vazio e código repetido; não salvar dados inválidos. Cadastrar pelo formulário central será testado em conjunto com 06.

## 05 — CRUD de EPIs + sua lista

**Responsável:** Aluno 4 — EPIs · **Meta:** 07/10/2026

Adaptar Produto da aula para Epi, reaproveitando a ideia de descrição e quantidade. Criar model, repository, service, Request/Response e ApiController. Campos: id numérico, descricao, quantidade inteira, inclusao e validade (textos YYYY-MM-DD), ca (texto). Rotas /api/epis com GET, POST, PUT e DELETE. Quantidade é saldo cadastral editável nesta demonstração; não é um controle real de movimentações/entregas.

Ajustar epis.service.ts: a URL atual da porta 3000 precisa virar http://localhost:8080/api/epis. Combinar métodos listar(), buscar(id), cadastrar(dados), atualizar(id,dados), excluir(id). Integrar listagem/edição/exclusão em tela-epis, incluindo confirmação de exclusão e ajuste do id para número. Não implementar entrega/assinatura/baixa automática: desabilitar a ação de entrega com aviso. O formulário central é do Aluno 5.

Começar após 02; branch feat/epis.

Pronto quando: CRUD persiste e a lista da tela vem do banco; quantidade negativa e descrição vazia são rejeitadas; recarregar/reiniciar mantém o registro.

## 06 — Ligar os três formulários de cadastro ao backend

**Responsável:** Aluno 5 — Formulários · **Meta:** 07/10/2026

Ser o único dono de tela-cadastramentos/cadastramentos.ts e .html nesta semana. Ligar as três abas (colaborador, treinamento, EPI) aos services dos Alunos 2, 3 e 4. Usar ngModel como já visto no frontend. Adicionar matrícula no cadastro de pessoa; não misturar CPF com matrícula. Não criar usuários/senhas/grupos no cadastro. Para treinamento/EPI, capturar os campos: os métodos atuais apenas mostram console/toast.

Combinar primeiro os nomes dos métodos e campos em contrato-proposto.md. Pode preparar os formulários enquanto os colegas fazem a API; só testar gravação real depois de 03/04/05 estarem disponíveis. Trabalhar em feat/cadastros. Não editar Java ou as listas dos colegas.

Após resposta de sucesso do POST: mostrar mensagem, limpar formulário e permitir consultar na lista correspondente. Em erro, manter valores e mostrar aviso. Desabilitar abas LNT/reciclagem e avisar que estão fora desta entrega.

Pronto quando: cadastrar pelos três formulários grava no banco e aparece na lista após recarregar; campo inválido não salva; erro de conexão nunca aparece como cadastro concluído.

## 07 — Juntar as branches e testar os três CRUDs

**Responsável:** Márcio + grupo · **Meta:** 08/10/2026

Márcio coordena PRs para main: primeiro base, depois os três CRUDs, depois formulários. Se Java já estiver pronto antes da tela, integrar um PR pequeno de API para o Aluno 5 conseguir testar, sem esperar tudo no último dia. Revisor é outro colega; para PR de Márcio, outro aluno revisa. Todos atualizam suas branches após cada merge necessário.

Cada aluno demonstra o próprio módulo. Nos três cadastros: cadastrar dado fictício pela tela, consultar, editar, recarregar, reiniciar backend e excluir com confirmação. Conferir tabelas no MySQL. Testar campo vazio e quantidade negativa. Rodar npm run build e npm test -- --watch=false; com backend disponível, rodar mvnw test e iniciar aplicação com banco para o teste manual.

Sinalizar/desabilitar funções fora do escopo: login continua demonstrativo; nenhum histórico, importação, e-mail, assinatura ou entrega pode ser apresentado como integrado. Não publicar a aplicação local sem autenticação.

Pronto quando: os três CRUDs funcionam juntos na main, existe evidência real dos testes e outro colega consegue executar a partir do README. Se algum bloco não estiver pronto na quinta, avisar o professor e reduzir a demonstração; não usar dados fictícios como falsa persistência.

## 08 — Ensaiar e apresentar na sexta, 09/10

**Responsável:** Aluno 5 + grupo · **Meta:** 09/10/2026

Até quinta à noite: guardar dados fictícios de exemplo e ensaiar cadastro/lista/edição/exclusão dos três módulos. Na sexta: iniciar MySQL, backend e frontend; verificar funcionamento e apresentar. Não começar nova funcionalidade na sexta.

Cada pessoa explica sua parte: Márcio mostra ligação com MySQL/base; Aluno 2 colaboradores; Aluno 3 catálogo de treinamentos; Aluno 4 EPIs; Aluno 5 formulários e fluxo completo. Explicar com honestidade que login, dashboards, entregas, certificados, importação e demais telas ainda são protótipo/futuro.

Começar a revisão final depois de 07.

Pronto quando: roteiro foi ensaiado, versão que será apresentada está na main e os cinco sabem o que mostrar. Esse é um plano de entrega, não garantia de nota nem de conclusão de funções que o professor possa exigir além do recorte.
