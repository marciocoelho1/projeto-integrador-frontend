# Entrega de Marcio — base Java/MySQL

Registro de **06/10/2026**, tarefa **02** do [backlog](backlog.md).

## Estado e onde encontrar

A base técnica foi implementada e testada na branch **`feat/base-backend-mysql`**. Ainda aguarda revisão de outro integrante, merge na `main` e reprodução no computador de um colega. Por isso o cartão 02 permanece **Fazendo**, não Pronto. A aprovação do recorte pelo professor (01), os CRUDs/formulários (03–06), os merges/testes do conjunto (07) e o ensaio (08) não foram concluídos por esta entrega.

O planejamento estava na branch `docs/roadmap-integracao-backend` (PR #5), e não na `main` analisada. A branch da base inclui esse planejamento e as atualizações deste registro. Revisar a documentação e a base juntas no novo PR; não sobrescrever a documentação atualizada com a versão antiga do PR #5. Marcio coordena essa ordem de integração com o grupo.

## O que foi entregue

- `backend/`: um único projeto Java 17/Spring Boot, com Web, JPA, Validation e MySQL e Maven Wrapper reaproveitado das aulas.
- Pacote `br.com.senac.sgsst`, com pastas `model`, `repository`, `service`, `dto`, `api` e `config` para os colegas adicionarem os módulos.
- Configuração MySQL por variáveis ou arquivo local ignorado, sem credenciais reais no Git; `ddl-auto=update` somente para demonstração local.
- `backend/sql/criar-banco.sql`: criação do banco `sgsst`, sem tabelas de Produto/Categoria, sementes ou entidades dos colegas.
- API em `127.0.0.1:8080`, CORS para `/api/**`, origem `http://localhost:4200`.
- `GET /api/health`: executa `SELECT 1` no banco; 200 com `{"status":"UP","database":"UP"}` ou 503 DOWN sem detalhes sensíveis.
- [README do backend](../../backend/README.md): criação de usuário local, configuração Linux/Windows, execução, testes e organização das classes.
- [Verificação da base](../../backend/VERIFICACAO.md): comandos e evidências executadas, com os limites.

**Não foram implementados** `/api/colaboradores`, `/api/treinamentos`, `/api/epis`, seus formulários ou tabelas de domínio. As URLs/campos desses módulos continuam no [contrato](contrato-proposto.md). Um health 200 não significa CRUD completo.

## Resultados verificados

| Verificação | Resultado |
|---|---|
| `./mvnw -B test` com Java 17 | 29 testes passaram, sem falhas/erros/pulados |
| `./mvnw -B -Pmysql-it verify`, MySQL real | 29 rápidos + 4 integração passaram, sem falhas/erros/pulados |
| JPA em MySQL 8.4.11 | Persistir, consultar, atualizar e excluir em transações diferentes, entidade somente de teste |
| JAR iniciado com Java 17 | Health 200 com banco disponível |
| Banco parado / senha inválida | Health 503, sem detalhes da conexão no JSON |
| CORS no JAR real | Origem Angular aceita; origem não autorizada rejeitada com 403 |
| Limpeza da verificação | Container/volumes temporários removidos; entidade de teste ausente no JAR |
| `npm run build` | Passou; avisos existentes de tamanho de bundle/SCSS |
| Testes Angular neste ambiente Node 26.7.0 | Comando padrão: 15 passaram e 4 falharam por `localStorage` do runtime; com `NODE_OPTIONS=--no-experimental-webstorage`, todos os 19 passaram |

A verificação usou MySQL temporário em loopback; não alterou o MySQL do sistema nem deixou banco/servidor de demonstração executando. **Cada colega precisa criar seu próprio banco local.** Podman foi usado somente para verificar: não é obrigatório para executar o projeto. Java 17 foi usado efetivamente nos testes e JAR; Windows foi documentado, não executado.

A revisão independente detectou um desvio possível de configuração Hikari no teste descartável. Foi corrigido isolando o DataSource/JPA de teste da configuração de produção, restringindo URL/host/banco/parâmetros e acrescentando 21 testes de proteção. Uma segunda revisão detectou carregamento da configuração de produção no contexto de integração; o contexto foi isolado e um teste de regressão completo foi acrescentado. A integração foi repetida sob configurações conflitantes; outro banco descartável de controle permaneceu intacto. Detalhes em `backend/VERIFICACAO.md`.

`npm ci` também reportou **31 vulnerabilidades** nas dependências existentes (1 baixa, 12 moderadas, 14 altas e 4 críticas). Elas não foram corrigidas nem introduzidas por mudanças no frontend nesta entrega. Não expor a demonstração nem executar atualização forçada indiscriminada; a revisão de dependências permanece trabalho separado.

## Como os colegas devem seguir

### Primeiro: revisar e obter a base

1. Outro integrante revisa o PR de Marcio, executa as instruções de `backend/README.md` e confirma health 200 com seu MySQL.
2. Marcio integra o PR revisado na `main`. Só depois marcar 02 Pronto; não atestar execução dos colegas sem que eles a façam.
3. Com trabalho anterior salvo/commitado, cada colega atualiza a `main` (`git pull --ff-only origin main`) e cria sua branch conforme [passo a passo](passo-a-passo.md).
4. Antes do merge, quem precisar validar a base pode conferir a branch sem assumir que ela já está na `main`: `git fetch origin` e `git switch --track origin/feat/base-backend-mysql` (apenas se não existir uma branch local com esse nome). Não iniciar PR de módulo baseado em `main` sem a base disponível; combinar com Marcio se for necessário antecipar trabalho.

### Depois: implementar apenas seu módulo

| Integrante | Próxima entrega | Arquivos e dependência |
|---|---|---|
| Pedro Dimas | CRUD colaboradores + lista/editar/excluir | `Colaborador*` no pacote SGSST; `colaborador.service.ts`; `tela-colaboradores` |
| Pedro Serejo | CRUD catálogo de treinamentos + lista | `Treinamento*`; novo `treinamento.service.ts`; somente catálogo em `tela-matriz-treinamento` |
| Simão | CRUD EPIs + lista/editar/excluir | `Epi*`; `epis.service.ts` com porta 8080 e ID numérico; `tela-epis`; desabilitar entrega |
| Clara | Três formulários | Única responsável por `tela-cadastramentos`; preparar campos agora e integrar `cadastrar(dados)` quando os services/APIs existirem |
| Marcio | Revisões, configuração comum e tarefa 07 | Integrar APIs pequenas prontas, depois listas/formulários; não assumir os CRUDs dos colegas |

Para cada módulo, seguir `Model → Repository → Service → Request/Response → ApiController → service Angular → tela`. Todas as classes Java dentro de `br.com.senac.sgsst`. As tabelas são independentes, cargo/setor são textos. Não alterar POM/CORS/configuração comum sem combinar com Marcio.

Os services Angular devem oferecer `listar()`, `buscar(id)`, `cadastrar(dados)`, `atualizar(id,dados)` e `excluir(id)`. IDs numéricos; sucesso somente após resposta HTTP bem-sucedida. Testar campos inválidos, identificação repetida quando aplicável e erro de conexão, sem falso toast de sucesso.

### Antes de marcar seu módulo Pronto

- Demonstrar cadastrar/listar/editar/recarregar/reiniciar/excluir com confirmação e conferir o MySQL.
- Rodar build/testes Angular e testes Java; executar integração real num banco descartável quando aplicável.
- Abrir PR, receber revisão e integrar na `main`.
- Atualizar seu cartão sem marcar trabalho dos outros como concluído.

Somente execução local com dados fictícios. Login continua demonstrativo. Não adicionar JWT, Security, Flyway, CI, Docker obrigatório ou recursos fora do recorte desta semana.
