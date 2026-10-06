# SGSST — análise para integração backend/banco

Análise em 6 de outubro de 2026. Não é implementação do backend.

## 1. Fontes e limite da análise

- Frontend: `marciocoelho1/projeto-integrador-frontend`, `main`, commit `e26575a725a937e4ca71a63d3224bb568cc7948d`.
- Aulas: `marciocoelho1/aulasJavaSenac`, `main`, commit `964d64e1c451a28f04a577fbc9e855a90fe14f4f`.
- O frontend da loja do professor e seus templates não são base para o SGSST. A análise das aulas se limita a Java, POM, configuração e banco.
- Os nomes M2–M5 são papéis, não pessoas presumidas. Foram encontrados quatro colaboradores no repositório: `marciocoelho1`, `Violet-pixel`, `pedroserejo10` e `mansimas23`. Isso não permite identificar os cinco integrantes nem distribuir trabalho segundo suas habilidades. Márcio deve confirmar os quatro colegas no cartão G01.

## 2. Estado real do frontend

Angular 22, componentes standalone, TypeScript, SCSS, arrays/signals, Bootstrap e leitura de planilhas via `xlsx`. HTTP já é habilitado em `src/app/app.config.ts`, mas os fluxos de negócio continuam predominantemente simulados.

| Área | Evidência no código | Integração necessária |
|---|---|---|
| Login | `tela-login/login.ts:21–38` valida contas fixas; `auth.service.ts:12–29` guarda sessão local | Autenticação e autorização no servidor; identidade única; remover validação por senha hardcoded |
| Auth duplicado | `service/auth.service.ts:8–25` aponta para porta 3000 e guarda token; login/guard usam outro serviço | Consolidar antes de integrar; não misturar protocolo de token e sessão |
| Rotas/perfis | `auth.guard.ts:5–15` só verifica login local; `app.routes.ts:23–38` aplica o mesmo guard às telas | Permissões reais em cada endpoint e proteção da área individual; menu não é autorização |
| Colaboradores | `tela-colaboradores/colaboradores.ts:31–106,145–185`: arrays e históricos por nome | CRUD por ID; matrícula/CPF distintos; FKs cargo/setor; prontuário derivado |
| Cadastramentos | `tela-cadastramentos/cadastramentos.ts:54–122`: console/toast/log, sem gravação; aba coletiva | Cada domínio fornece seu formulário e DTO; sucesso somente após resposta HTTP |
| Treinamentos | `tela-matriz-treinamento/matriz-treinamento.ts:158–630`: coleções separadas; `:656–662` só fecha modais | Catálogo, LNT, participação, certificado e matriz calculada; turmas/reciclagens em etapa posterior |
| EPIs | `tela-epis/epis.ts:121–156`: baixa local e histórico por nome | Entrega e baixa transacionais, IDs, quantidade válida, concorrência e persistência |
| Suporte | `tela-ajuda-suporte/*` e `tela-ajuda-suporte-colaborador/*`: listas independentes | Uma tabela/fila; identidade da sessão; transições e consultas por dono |
| Importação | `tela-importacao-massa/importacao-massa.ts:64–122`: leitura/preview, confirmação sem persistência | Preview validado, confirmação real, resultado por linha e proteção contra reenvio |
| Dashboard/área pessoal | `tela-dashboard/dashboard.ts:13–69`; `tela-area-colaborador/area-colaborador.ts:33–64`: dados fixos | Projeções dos mesmos dados dos módulos, com filtros e acesso individual |
| Configuração/auditoria | `tela-configuracoes/configuracoes.ts:226–284`; `service/audit.service.ts:19–37`: memória/console | Persistência de regras e auditoria gerada pelo servidor com ator real |
| Recuperação | `tela-recuperar-senha/recuperar-senha.ts:22–49`: mensagem de envio sem backend | Implementar fluxo seguro ou desabilitar explicitamente; não manter envio fictício |

Serviços vazios ou desconectados não equivalem a módulos prontos. `ColaboradorService`/`ConfiguracoesService` não implementam os fluxos; `EpisService` não é consumido pela tela e seu DTO de entrega diverge do formulário. Os arquivos de cadastramento/dashboard com `@Service` são stubs: o build passou, mas isso não prova integração de negócio.

### Inconsistências que o contrato deve resolver

1. Cadastro de colaborador usa CPF/grupo, enquanto consulta/login usam matrícula. Identificadores não podem ser confundidos.
2. Cadastro, CSV e consulta têm campos diferentes. Template deve derivar do mesmo DTO do cadastro.
3. Alterar matrícula no modal pode fazer a busca de salvamento não encontrar o registro; atualizar por ID imutável resolve a referência.
4. Históricos indexados por nome confundem homônimos e se perdem ao renomear.
5. `admin`, `admin_tst`, grupos e módulos não têm uma política única aplicada no backend.
6. “Validade” de EPI/CA e “assinatura” em texto são ambíguas. Não atribuir significado normativo ou jurídico aos mocks.
7. A área do colaborador precisa usar a identidade real; filtrar dados recebidos de todos no browser é insuficiente.

## 3. O que reaproveitar das aulas

Declarações: Spring Boot **3.5.16**, Java **17** (`pom.xml:7–22`), Maven **3.9.16** e Wrapper **3.3.4** (`.mvn/wrapper/maven-wrapper.properties`), MySQL **8.4** (`docker-compose.yml:3`). São versões declaradas; o backend das aulas não foi executado nesta análise.

Padrão útil: **REST Controller → Service → Repository JPA → MySQL**, DTOs, Bean Validation, injeção por construtor, transações e carregamento explícito das relações com `open-in-view=false`.

`src/main/java/br/com/senac/loja/api/ProdutoApiController.java` contém CRUD REST `/api/produtos`: GET lista/detalhe, POST 201, PUT e DELETE 204. Adaptar esse padrão ao domínio SGSST; não copiar Produto/Categoria como entidades do projeto. Categorias só possuem controller MVC, não CRUD REST próprio.

Não reaproveitar `loja-angular`, `resources/templates`, controllers de páginas, redirects, catálogo/seeds da loja ou credenciais locais. O serviço da aula recebe `ProdutoForm` de MVC; na nova aplicação preferir comandos/DTOs independentes da apresentação.

### Correções necessárias antes de reproduzir o padrão

- **Banco incompatível:** `application.properties:3–6` usa porta 3307/root/senha vazia; `docker-compose.yml:7–11` usa porta 3306 e senha definida. Fixar um contrato de ambiente e credenciais externas, com usuário da aplicação.
- **CORS:** `config/CorsConfig.java:13` usa `/api**`; adotar `/api/**` e testar preflight. Se houver sessão cross-origin, revisar credenciais/origem; preferir proxy local de mesma origem para Angular.
- **Erros REST:** `api/ApiExceptionHandler.java:13–15` filtra pacote `br.com.senac.loja.controller.api`, mas o controller está em `br.com.senac.loja.api`. Corrigir para impedir que erros REST escapem do advice. O handler MVC global não deve provocar redirect HTML na API.
- **Schema:** `banco.sql` não contém o DDL das tabelas; Hibernate usa `ddl-auto=update`. Exigir schema/mudanças versionados e banco reproduzível; não depender do banco particular de um aluno.
- **Segurança/testes:** não há Spring Security nem suíte Java em `src`. São trabalho novo, não conteúdo já implementado nas aulas.

## 4. Verificações executadas no frontend

Em clone isolado, sem modificar código de aplicação:

| Execução | Resultado |
|---|---|
| `npm ci --ignore-scripts`, Node 26.7.0/npm 11.19.0 | Dependências instaladas; auditoria reportou 31 vulnerabilidades: 1 baixa, 12 moderadas, 14 altas, 4 críticas |
| `npm run build`, Node 26.7.0 | Passou; avisos de budget no bundle inicial e estilos de dashboard/configurações |
| `npm test -- --watch=false`, Node 26.7.0 | 15 passaram, 4 falharam por `localStorage` indisponível no ambiente de testes |
| `npx --yes --package=node@24 node node_modules/@angular/cli/bin/ng.js test --watch=false` | **19 testes passaram em 8 arquivos** |

O `engines` do Angular CLI instalado declara `^22.22.3 || ^24.15.0 || >=26.0.0`. Recomenda-se padronizar **Node 24 LTS, pelo menos 24.15.0**, e fixar patch aprovado no bootstrap. O README atual, que indica Node 18+, precisa de correção. Não há necessidade de Angular CLI global: usar scripts npm do repositório.

A auditoria é uma fotografia das dependências em 6/10/2026, não prova de exploração do sistema. `xlsx`/`repomix` apareceram entre dependências diretas com avisos altos sem solução automática indicada. Não executar `npm audit fix --force` indiscriminadamente; G04 deve avaliar atualização/substituição e necessidade dessas dependências. Enquanto isso, importação Excel não deve ser liberada como se o risco tivesse sido resolvido.

Não foram testados conexão MySQL, execução Java das aulas, E2E, autenticação real ou persistência: o frontend atual não entrega esses fluxos. Os testes existentes validam principalmente comportamento local.

## 5. Conclusão

Recomendação: **um monólito Spring Boot modular, MySQL e Angular existente na raiz do mesmo repositório**. Cada aluno entrega uma fatia vertical, incluindo schema, API, tela e testes. Não criar cinco backends, nem separar uma pessoa para todo o banco. O bootstrap e o contrato vêm antes das integrações paralelas.

Próximos documentos: [roadmap](roadmap.md), [contrato proposto](contrato-proposto.md), [backlog](backlog.md) e [passo a passo](passo-a-passo.md).
