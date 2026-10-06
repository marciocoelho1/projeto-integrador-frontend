# Das aulas ao projeto: o que aproveitar

Revisão em 06/10/2026, para entrega em **sexta-feira, 09/10/2026**. O plano anterior foi substituído por um plano de CRUD para estudantes com sete meses de curso.

## 1. O que vimos nas aulas e onde usar

| Nas aulas Java | No projeto integrador |
|---|---|
| `model/Produto.java`: dados do produto e tabela JPA | Criar `Colaborador`, `Treinamento` e `Epi`, cada um em sua tabela |
| `repository/ProdutoRepository.java`: acesso ao banco | Criar um Repository para cada classe; usar `findAll`, `findById`, `save` e `deleteById` |
| `service/ProdutoService.java`: listar, buscar, salvar e excluir | Repetir essas operações para os três cadastros |
| `dto/ProdutoRequest.java` e `ProdutoResponse.java` | Usar os campos simples combinados para enviar e receber dados |
| `api/ProdutoApiController.java`: GET, POST, PUT e DELETE | Criar `/api/colaboradores`, `/api/treinamentos` e `/api/epis` |
| MySQL e `spring.jpa.hibernate.ddl-auto=update` | Criar o banco `sgsst`; JPA cria/atualiza as três tabelas no ambiente de aula |
| Validação com `@Valid` | Rejeitar campo vazio, valor inválido e quantidade negativa |

Arquivos Java acima ficam em `src/main/java/br/com/senac/loja/` no [repositório das aulas](https://github.com/marciocoelho1/aulasJavaSenac).

**Não copiar o frontend do professor:** ignorar `loja-angular`, templates HTML e controllers que retornam páginas. Aproveitar apenas a ideia do CRUD/backend. A aula usa Produto relacionado a Categoria; nesta entrega, nossas três tabelas ficam independentes para reduzir o trabalho.

A API da aula transforma Request em `ProdutoForm`. Ao adaptar, retirar referências/imports da loja que não serão usados; o novo Service pode receber seu Request diretamente. Não é necessário carregar os controllers MVC só para salvar um cadastro.

## 2. Onde o frontend precisa mudar

| Tela existente | Hoje | Até sexta |
|---|---|---|
| `tela-colaboradores` | Lista/edição em memória | Carregar, editar e excluir registros do banco por `id` |
| `tela-matriz-treinamento` | Várias listas demonstrativas | Integrar **somente o catálogo de treinamentos** |
| `tela-epis` | EPI e entrega alterados localmente | Integrar **somente cadastro/lista/edição/exclusão de EPI** |
| `tela-cadastramentos` | Salvar mostra console/toast, sem persistir | Clara envia os três formulários ao backend |

`app.config.ts` já habilita HTTP. `colaborador.service.ts` ainda não tem o CRUD. `epis.service.ts` já tem operações, mas aponta para porta **3000** e a tela não as usa: ajustar para **8080/api/epis** e ligar à tela. Criar `treinamento.service.ts`.

No cadastro de pessoa falta matrícula, embora a lista a use; acrescentar esse campo. No catálogo de treinamento, `cargaHoraria` é texto, como `8h`: manter assim nesta semana. No EPI, adaptar o `id` de string para número e formatar somente na exibição. Detalhes em [campos combinados](contrato-proposto.md).

## 3. Três correções pequenas da base das aulas

1. **Banco:** `application.properties` usa porta 3307; o Compose usa 3306. Escolher a porta do MySQL que vocês realmente usam e ajustar URL/credenciais. Docker não é obrigatório.
2. **CORS:** trocar o mapeamento `/api**` por `/api/**`, permitindo `http://localhost:4200`. Isso permite Angular chamar a API local.
3. **Erros:** `ApiExceptionHandler` aponta para pacote `br.com.senac.loja.controller.api`, mas a API está em `br.com.senac.loja.api`. Corrigir o pacote e não levar o handler de páginas/redirects para a nova API.

Marcio preparou a configuração compartilhada em `backend/`: conexão local configurável e CORS `/api/**`. Os controllers/handlers MVC da loja não foram copiados; o diagnóstico retorna 503 sem expor detalhes JDBC. Os erros de validação, ID inexistente e identificador repetido dos futuros CRUDs ainda devem ser tratados pelos donos dos módulos. Os colegas não precisam reconfigurar o projeto inteiro.

## 4. Limite desta entrega

Login/perfis atuais são demonstração local, não autenticação segura. Dashboard, certificados, entregas, importação, suporte e outras telas ficam fora do backend de sexta; sinalizar e desabilitar ações que dão falso sucesso. Não usar pessoas reais nem colocar a API na internet.

Sem novas bibliotecas de segurança, migrações, automações ou grandes mudanças visuais nesta semana. Isso é um recorte para demonstrar o que foi aprendido; deve ser confirmado com o professor.

## 5. O que já foi verificado

Referências analisadas: frontend `e26575a725a937e4ca71a63d3224bb568cc7948d`; aulas `964d64e1c451a28f04a577fbc9e855a90fe14f4f`.

Na análise anterior, o frontend compilou e **19 testes passaram com Node 24**. Na entrega da base em 06/10/2026, o build passou novamente; com Node 26.7.0, quatro testes falharam por `localStorage` do runtime, e os **19 passaram** ao executar `NODE_OPTIONS=--no-experimental-webstorage npm test -- --watch=false`. Não houve mudança no código Angular. `npm ci` reportou 31 vulnerabilidades existentes; não executar `npm audit fix --force` para atualizar tudo na véspera. Importação Excel não faz parte da entrega reduzida.

A base em `backend/` foi executada com Java 17 e MySQL 8.4.11 real: **29 testes rápidos + 4 de integração passaram**, incluindo persistência JPA exclusivamente de teste. O JAR respondeu saúde 200, CORS correto e 503 com banco parado/senha inválida. Isso prova a base/conexão, **não os três CRUDs**, que ainda não foram implementados. Revisão, merge e reprodução pelos colegas continuam pendentes. Consulte [entrega de Marcio](entrega-marcio.md) e [evidências](../../backend/VERIFICACAO.md).

Começar pelo [roadmap simples](roadmap.md), não pelo plano antigo do histórico Git.
