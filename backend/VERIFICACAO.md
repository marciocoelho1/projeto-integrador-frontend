# Verificação executada — base backend, 06/10/2026

## Ambiente real

- Java Temurin **17.0.20.1**, baixado somente no scratch; sistema continuou com Java 25.
- Spring Boot **3.5.16** e Maven Wrapper **3.9.16**, mesmos da referência de aulas.
- MySQL **8.4.11** real em container Podman temporário, publicado apenas em `127.0.0.1:13306`.
- Nenhuma instalação de sistema ou alteração do MySQL existente. Container, volumes anônimos, processos Java de verificação e arquivo de credenciais fictícias foram removidos ao terminar.
- Bytecode da classe principal: **major version 61 (Java 17)**. Não foi apenas compilação com Java 25 e `release=17`: testes e JAR rodaram no JDK 17.

## Comandos e resultados — implementação inicial

Os totais de 8 testes rápidos abaixo registram a fase inicial. Após a última correção de isolamento, os totais atuais são **29 rápidos + 4 de integração**, conforme a seção final deste documento. A revalidação anterior de DataSource teve 29 + 3, mas ainda não comprovava isolamento da raiz Boot.

Executados dentro de `backend/`, com `JAVA_HOME` apontando para o JDK 17 no scratch:

| Comando/cenário | Resultado observado |
| --- | --- |
| `./mvnw -B test` — RED 01 | 1 falha: `/api/health` devolvia 404 antes de implementar o endpoint |
| `./mvnw -B test` — GREEN 01 | 1 teste passou; endpoint consulta `SELECT 1` |
| `./mvnw -B test` — RED 02 | Exceção JDBC escapava do endpoint; faltava conversão para 503 |
| `./mvnw -B test` — GREEN 02 | 2 testes passaram; resposta DOWN sem detalhes da conexão |
| `./mvnw -B test` — RED 03 | Preflight Angular devolvia 403 antes de configurar CORS |
| `./mvnw -B test` — GREEN 03 | 3 testes passaram; origem Angular aceita em `/api/**` |
| `./mvnw -B test` — RED 04 | 1 falha por ausência de `SgsstApplication`; demais casos passaram |
| `./mvnw -B test` — GREEN 04 e execução final | **8 testes passaram**, 0 falhas/erros/pulados |
| `./mvnw -B -Pmysql-it verify` com `MYSQL_IT_*` | **8 testes rápidos + 3 de integração MySQL passaram**, 0 falhas/erros/pulados; JAR gerado |
| `java -jar target/sgsst-0.0.1-SNAPSHOT.jar` | Aplicação iniciou usando JDK 17 e MySQL real |

Integração real: nome do produto JDBC confirmado como MySQL; JPA gravou, consultou, alterou e excluiu a entidade exclusivamente de teste em transações/EntityManagers diferentes. Credencial incorreta real resultou em 503. Não há H2. Testes de limites adicionais cobrem origem proibida, caminho fora de `/api/**`, resultado JDBC inesperado e CORS na resposta 503.

## HTTP no JAR real

- `GET /api/health`, banco disponível: **200**, `{"status":"UP","database":"UP"}`.
- OPTIONS com origem `http://localhost:4200`: **200** e `Access-Control-Allow-Origin: http://localhost:4200`.
- OPTIONS com origem `https://example.org`: **403**, sem origem liberada.
- Banco temporário parado após inicialização: **503**, `{"status":"DOWN","database":"DOWN"}`; CORS Angular preservado.
- Reinicialização do JAR com senha deliberadamente inválida: **503**, mesmo JSON DOWN, sem credenciais no corpo.
- `information_schema.tables` para `sgsst`/`sgsst_test` após testes/JAR: **nenhuma tabela remanescente**. A tabela de teste foi removida ao fechar o contexto; esta base não tem entidades de domínio.
- Arquivo JAR inspecionado: **não contém `JpaProbe` nem `MySqlConnectionIT`**.
- `git check-ignore`: `backend/target/`, `backend/application-local.properties` e `backend/.env` ignorados.
- Busca pelos valores de credenciais temporárias nos arquivos-fonte de `backend/`: **nenhuma ocorrência**.

## Evidências locais

Scratch da execução: `/home/marciocoelho/.hermes/cache/scratch/`.

- `sgsst-tdd-01-red.log` / `sgsst-tdd-01-green.log`
- `sgsst-tdd-02-red.log` / `sgsst-tdd-02-green.log`
- `sgsst-tdd-03-red.log` / `sgsst-tdd-03-green.log`
- `sgsst-tdd-04-red.log` / `sgsst-tdd-04-green.log`
- `sgsst-final-test.log`
- `sgsst-mysql-verify.log`
- `sgsst-app-runtime.log` e `sgsst-app-invalid-password.log`
- `sgsst-runtime-results.json`: asserções HTTP, ausência de tabelas/testes no JAR e remoção do container, resultado **PASS**.

Relatórios JUnit também em `backend/target/surefire-reports/` e `backend/target/failsafe-reports/` (ignorados pelo Git).

## Limites e avisos

- Windows foi documentado, **não executado neste ambiente Linux**.
- Download inicial da imagem MySQL atingiu timeout; uma segunda tentativa concluiu. Sem bloqueio remanescente.
- Logs contêm aviso benigno da JVM/Mockito sobre CDS e de Hibernate sobre dialeto MySQL explícito, mantido conforme a configuração das aulas. Não são falhas de teste.
- Apenas base/health/CORS foram entregues. CRUDs, entidades de domínio, integração Angular e apresentação continuam com os responsáveis do grupo.
- Não houve commit, push nem alteração de Project por esta implementação.

## Revalidação — proteção do DataSource efetivo (Marcio, 06/10/2026)

A vulnerabilidade era a diferença entre `spring.datasource.url` validada e o endereço efetivo do pool: `spring.datasource.hikari.jdbc-url` podia redirecionar o `create-drop`. A correção ficou **somente em testes**, sem alterar configuração/código de produção.

- **Retificação da evidência anterior:** `application.properties` e seu import local estavam desabilitados, mas a raiz `@TestConfiguration` ainda permitia descobrir `SgsstApplication`, varrer repositórios e importar auto-configurações de produção. A afirmação anterior de ausência da raiz era incorreta; os testes de DataSource com `ApplicationContextRunner` não demonstravam o contexto completo. O RED da seção final reproduz isso, e só o GREEN final comprova o isolamento.
- `DriverManagerDataSource` único construído com URL/usuário/senha `MYSQL_IT_*` validados, sem binding de propriedades de produção, Hikari, JNDI, classe alternativa ou propriedades adicionais do datasource.
- URL restrita a `localhost`/`127.0.0.1`, porta explícita e `sgsst_test`; parâmetros permitidos: timeouts numéricos e `useSSL`/`allowPublicKeyRetrieval` booleanos. `socketFactory`, `propertiesTransform` e parâmetros desconhecidos são recusados antes de abrir conexão.
- JPA explícito, sem binding de `spring.jpa.*`; `PersistenceManagedTypes` registra exatamente `JpaProbe`, confirmado pelo metamodelo real.

| Execução após revisão | Resultado observado |
| --- | --- |
| RED de conflito Hikari, sem abrir conexão | **1 teste, 1 falha**: URL efetiva era `not_the_test_database`, não `sgsst_test`; ambas em porta local 1 |
| GREEN do mesmo caso | **1 teste passou** após construção explícita do datasource |
| RED da restrição de parâmetros JDBC | **7 testes, 3 falhas**: `socketFactory`, `dbname` e `propertiesTransform` ainda aceitos |
| GREEN da restrição de parâmetros JDBC | **7 testes passaram** após allowlist |
| `./mvnw -B test` final | **29 testes passaram**, 0 falhas/erros/pulados; 21 casos de segurança + 8 HTTP/estrutura |
| `./mvnw -B -Pmysql-it verify` final | **29 rápidos + 3 de integração passaram**, 0 falhas/erros/pulados |
| Failsafe com `MYSQL_IT_*` ausentes | Falha obrigatória na validação de `MYSQL_IT_URL`; não pulou nem tentou outro banco |
| Failsafe com banco `sgsst` | Falha obrigatória antes de conexão |
| Failsafe com host `example.org` | Falha obrigatória antes de conexão |

MySQL **8.4.11 real**, JDK 17 no scratch e container `sgsst-mysql-safety` com armazenamento em **tmpfs**, publicado somente em `127.0.0.1:13306`. A integração passou inclusive com variáveis conflitantes `SPRING_DATASOURCE_HIKARI_JDBC_URL`, `SPRING_DATASOURCE_HIKARI_DATA_SOURCE_CLASS_NAME`, `SPRING_DATASOURCE_HIKARI_DATA_SOURCE_JNDI`, `SPRING_DATASOURCE_JNDI_NAME` e `SPRING_JPA_PROPERTIES_HIBERNATE_CONNECTION_URL`; a URL conflitante apontava à porta local 1 e banco inofensivo, nunca ao banco do sistema.

Após fechar o contexto: **nenhuma tabela em `sgsst_test`**; sentinela criada em outro banco **também descartável** do mesmo container permaneceu intacta. JAR novamente inspecionado: nenhuma das classes de teste foi empacotada. Container removido e ausência confirmada; nenhum segredo temporário encontrado nos fontes de backend. Credenciais aleatórias mantidas apenas em memória durante a execução, não em arquivo-fonte ou relatório. Não houve commit, push ou staging adicional.

### Evidências desta correção

Base dos caminhos: `/home/marciocoelho/.hermes/cache/scratch/`.

- `sgsst-mysql-safety-red.log` / `sgsst-mysql-safety-green.log`
- `sgsst-mysql-url-safety-red.log` / `sgsst-mysql-url-safety-green.log`
- `sgsst-mysql-safety-final-test-green.log`
- `sgsst-mysql-safety-real-verify.log` / `sgsst-mysql-safety-real-verify-final.log`
- `sgsst-mysql-safety-missing-env.log`
- `sgsst-mysql-safety-different-database.log`
- `sgsst-mysql-safety-non-local-host.log`
- `sgsst-mysql-safety-results.json`: totais extraídos de XML, recusas, inspeções e cleanup, **PASS**.
- `sgsst-mysql-safety-reports/`: cópias dos quatro relatórios JUnit XML da execução final aprovada.

Relatórios finais também em `backend/target/surefire-reports/` e `backend/target/failsafe-reports/`. Uma execução intermediária do teste expandido falhou ao habilitar binding JDBC automático artificialmente com classe inexistente; os casos parametrizados foram alinhados à configuração mínima de DataSource, mas isso não provava isolamento do bootstrap real. A regressão original de URL ainda habilita JDBC auto-configuração artificialmente; veja a distinção entre as execuções finais abaixo. Não há bloqueio pendente; Windows continua não executado.

## Revalidação final — isolamento do contexto completo (06/10/2026)

Correção restrita a `MySqlConnectionIT.java`: raiz explícita `IntegrationConfig` mudou de `@TestConfiguration` para `@Configuration(proxyBeanMethods = false)`. `ProbeConfig` continua `@TestConfiguration` importada explicitamente; validação estrita `MYSQL_IT_*`, allowlist JDBC, `DriverManagerDataSource` e JPA explícito foram preservados. Nenhum código/configuração de produção mudou.

A nova regressão usa o **contexto completo efetivamente inicializado por `@SpringBootTest`**, não um runner parcial. Inspeciona ausência de beans `SgsstApplication`, `DataSourceAutoConfiguration`, `JdbcTemplateAutoConfiguration`, `DataSourceTransactionManagerAutoConfiguration`, `SqlInitializationAutoConfiguration`, `HibernateJpaAutoConfiguration` e `JpaRepositoriesAutoConfiguration`. Também exige ausência de repositórios/inicializadores SQL e exatamente um `DriverManagerDataSource`.

Executado em `backend/` com `JAVA_HOME=/home/marciocoelho/.hermes/cache/scratch/sgsst-jdk17` e MySQL **8.4.11 real**, container próprio `sgsst-mysql-context-isolation`, armazenamento tmpfs e publicação somente em `127.0.0.1:13306`:

| Execução | Resultado real |
| --- | --- |
| RED: `./mvnw -B -Pmysql-it -Dit.test=MySqlConnectionIT#fullIntegrationContextDoesNotDiscoverProductionRootOrDatabaseAutoConfiguration verify` | 29 rápidos passam; **1 integração, 1 falha de asserção, 0 erros/pulados**. Detectou a raiz de produção e todas as seis auto-configurações proibidas; log também mostra descoberta Boot e varredura de repositórios. |
| GREEN: mesmo comando após mudar somente a anotação da raiz | 29 rápidos + **1 integração passam**, 0 falhas/erros/pulados. |
| Final: `./mvnw -B clean -Pmysql-it verify` com propriedades conflitantes | **29 rápidos + 4 integrações passam**, 0 falhas/erros/pulados. |
| Contexto real ainda mais hostil: `./mvnw -B -Pmysql-it failsafe:integration-test failsafe:verify` | **4 integrações passam**, 0 falhas/erros/pulados, inclusive com `SPRING_DATASOURCE_TYPE=not.a.DataSource`. |
| Failsafe com `MYSQL_IT_*` ausentes, banco `sgsst` ou host `example.org` | Três execuções recusadas obrigatoriamente pela validação; nenhuma troca de banco ou teste pulado. |

Propriedades conflitantes incluíram URL/usuário/senha de produção, URL/classe/JNDI/propriedades Hikari, JNDI de datasource, URL de conexão Hibernate, DDL JPA e `SPRING_SQL_INIT_MODE=always` com script existente que criaria `sgsst_test.unrequested_sql_init`. A URL Hikari apontava ao banco de sentinela **também descartável no mesmo container**, nunca a um banco importante. A conta de integração recebeu privilégios somente em `sgsst_test.*`.

**Distinção necessária:** uma tentativa intermediária de `verify` com `SPRING_DATASOURCE_TYPE=not.a.DataSource` falhou no teste rápido antigo que deliberadamente habilita `DataSourceAutoConfiguration` no seu runner artificial. Não foi falha do contexto de integração. O `verify` final omitiu apenas essa variável, e depois todos os quatro casos de integração foram repetidos com ela incluída. Nenhum teste foi enfraquecido ou pulado; o log intermediário foi preservado.

Prova final: asserção `MYSQL_IT_CONTEXT_ISOLATION PASS` nos logs e XML; nenhuma descoberta `Found @SpringBootConfiguration` nem varredura `Bootstrapping Spring Data JPA repositories` nos logs das integrações aprovadas. JPA continuou usando somente `JpaProbe`, confirmado pelo metamodelo real. Após fechar o contexto, **zero tabelas em `sgsst_test`**, logo nem probe nem tabela do script SQL hostil permaneceram. Sentinela `disposable_sentinel.keep_me` manteve exatamente a linha `1 / preserve-context-isolation`. JAR inspecionado sem classes de teste; nenhuma credencial temporária encontrada nos fontes.

Cleanup em `finally`: os containers próprios das tentativas foram removidos com `podman rm -f -v`; `podman container exists sgsst-mysql-context-isolation` confirmou ausência. Script SQL hostil removido; credenciais aleatórias foram passadas em memória, sem arquivo de credenciais. Relatórios aprovados foram copiados antes da finalização. Sem commit, push ou staging adicional.

### Evidências finais de isolamento

Base: `/home/marciocoelho/.hermes/cache/scratch/`.

- `sgsst-mysql-context-red.log` / `sgsst-mysql-context-green.log`
- `sgsst-mysql-context-real-verify.log`: tentativa intermediária recusada pelo runner JDBC artificial.
- `sgsst-mysql-context-real-verify-final.log`: 29 + 4 aprovados.
- `sgsst-mysql-context-hostile-full-context.log`: 4 integrações com todas as propriedades conflitantes.
- `sgsst-mysql-context-missing-env.log`, `sgsst-mysql-context-different-database.log`, `sgsst-mysql-context-non-local-host.log`.
- `sgsst-mysql-context-results.json`: totais XML, sentinela, ausência de tabelas, JAR, segredos e cleanup, **PASS**.
- `sgsst-mysql-context-reports/`: quatro XML JUnit aprovados, também disponíveis em `backend/target/{surefire,failsafe}-reports/`.

Esta iteração não repetiu os testes HTTP externos do JAR da fase inicial; verificou o JAR por inspeção e a API por MockMvc sobre MySQL real. Windows permanece não executado. Escopo continua somente tarefa 02/base; nenhuma funcionalidade CRUD, autenticação ou segurança de produção adicionada.
