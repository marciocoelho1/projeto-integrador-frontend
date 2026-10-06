# Base Java/MySQL — tarefa 02

Java **17**, Spring Boot **3.5.16**, Web, Spring Data JPA, Validation e MySQL, seguindo as aulas. Maven Wrapper **3.9.16** incluído: não precisa instalar Maven global. Angular permanece na raiz. Não há CRUD, tabela de loja, seed, autenticação, Flyway, CI ou Docker obrigatório.

**Somente demonstração local e dados fictícios.** A API não tem autenticação. Não publicar na internet nem alterar `server.address=127.0.0.1` para acesso externo. CORS não é autenticação.

## 1. Pré-requisitos e banco

Instale Java 17 (confira `java -version`; `JAVA_HOME` deve apontar ao JDK), MySQL local e seu cliente. Inicie o MySQL. Os primeiros comandos do Wrapper precisam de internet para baixar Maven/dependências.

Dentro de `backend/`, abra uma sessão administrativa local com senha solicitada pelo cliente, sem colocá-la na linha de comando:

```sh
mysql -h 127.0.0.1 -P 3306 -u root -p
```

No cliente MySQL (mesmo procedimento Windows/Linux):

```sql
SOURCE sql/criar-banco.sql;
CREATE USER 'sgsst_app'@'localhost' IDENTIFIED BY 'SUBSTITUA_POR_SENHA_LOCAL_FORTE';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP, REFERENCES
  ON sgsst.* TO 'sgsst_app'@'localhost';
```

Substitua a senha **somente na sua sessão local**; não use a conta root na aplicação. Se o servidor identificar a conexão TCP como `127.0.0.1` em vez de `localhost`, crie/conceda os mesmos privilégios para `'sgsst_app'@'127.0.0.1'`. Não use host `%` para um banco compartilhado na rede. Conta já existente: combine com o administrador; não recrie/redefina uma conta usada por outros projetos.

`sql/criar-banco.sql` contém apenas `CREATE DATABASE IF NOT EXISTS sgsst`, com UTF-8. Nenhuma tabela de domínio é criada por esta base. JPA usará `ddl-auto=update` quando os colegas adicionarem entidades, **apenas para esta demonstração local**. Não é migração para produção.

## 2. Configuração local (escolha uma opção)

### A — Arquivo ignorado pelo Git (Windows ou Linux)

Copie `application-local.properties.example` para `application-local.properties` dentro de `backend/` e ajuste porta, usuário e senha no novo arquivo. Nunca edite o exemplo com credenciais reais. O arquivo local, `.env` e `target/` estão ignorados por `backend/.gitignore`.

```sh
# Linux
cp application-local.properties.example application-local.properties
chmod 600 application-local.properties
```

```powershell
# Windows PowerShell
Copy-Item application-local.properties.example application-local.properties
```

O Spring importa o arquivo a partir do diretório atual: rode os comandos dentro de `backend/`. `.env` **não é carregado automaticamente**. Não misture as opções: propriedades explícitas do arquivo importado prevalecem sobre os valores `DB_*` usados no arquivo-base.

### B — Variáveis de ambiente

Linux/Bash (a senha não aparece na tela nem no histórico):

```sh
export DB_URL='jdbc:mysql://127.0.0.1:3306/sgsst?connectTimeout=3000&socketTimeout=5000'
export DB_USERNAME='sgsst_app'
read -rsp 'Senha local MySQL: ' DB_PASSWORD; printf '\n'
export DB_PASSWORD
./mvnw spring-boot:run
# Ao terminar, Ctrl+C e: unset DB_PASSWORD
```

Windows/PowerShell:

```powershell
$env:DB_URL = 'jdbc:mysql://127.0.0.1:3306/sgsst?connectTimeout=3000&socketTimeout=5000'
$env:DB_USERNAME = 'sgsst_app'
$senha = Read-Host 'Senha local MySQL' -AsSecureString
$env:DB_PASSWORD = [System.Net.NetworkCredential]::new('', $senha).Password
Remove-Variable senha
.\mvnw.cmd spring-boot:run
# Ao terminar, Ctrl+C e: Remove-Item Env:DB_PASSWORD
```

Valores padrão: MySQL `127.0.0.1:3306/sgsst`, usuário `sgsst_app`, senha vazia (não existe senha pronta no repositório). Informe sua senha. Se o MySQL usa outra porta, ajuste `DB_URL` ou o arquivo local; preserve os timeouts. Não exponha seu banco pela rede.

## 3. Executar e conferir a conexão

Na pasta `backend/`, com configuração pronta:

```sh
./mvnw spring-boot:run                 # Linux
# Windows: .\mvnw.cmd spring-boot:run
```

Em outro terminal, acesse `http://localhost:8080/api/health` (ou `curl http://127.0.0.1:8080/api/health`). Este endpoint executa **SELECT 1 no MySQL a cada chamada**, sem revelar URL, usuário, senha ou exceção:

- **200**: `{"status":"UP","database":"UP"}`.
- **503**: `{"status":"DOWN","database":"DOWN"}` quando a consulta falha.

Um servidor HTTP iniciado não prova conexão saudável: confira o status 200. Banco parado, banco inexistente, porta errada ou senha inválida precisam ser corrigidos. Ao adicionar entidades, falhas de configuração/DDL também podem impedir a inicialização do Spring; consulte o terminal local, sem compartilhar segredos. Health prova conexão, não valida os CRUDs ainda ausentes.

API: `127.0.0.1:8080`. CORS mapeia **`/api/**`** e permite somente a origem `http://localhost:4200` e métodos GET/POST/PUT/DELETE/OPTIONS, sem credenciais. `http://127.0.0.1:4200` é outra origem: abra o Angular em `localhost:4200`. Para o frontend, em outro terminal na raiz do repo: `npm start`.

Para gerar e executar o JAR (ainda dentro de `backend/`):

```sh
./mvnw clean package
java -jar target/sgsst-0.0.1-SNAPSHOT.jar
# Windows: .\mvnw.cmd clean package; o comando java é igual
```

## 4. Testes sem banco e integração real opt-in

```sh
./mvnw test                     # Linux: testes MockMvc/estrutura, sem MySQL
# Windows: .\mvnw.cmd test
```

Não há H2, banco falso ou container obrigatório. Os testes rápidos de HTTP/CORS substituem somente o acesso JDBC; os testes de segurança inspecionam o `DataSource` sem abrir conexão. **Não são evidência de conexão MySQL**. A execução atual tem 29 testes rápidos (8 de HTTP/estrutura e 21 de proteção da configuração).

Para a integração real, um administrador deve criar um banco **descartável e dedicado** `sgsst_test` em MySQL local e conceder ao usuário de teste os mesmos privilégios somente em `sgsst_test.*`. Não use dados importantes nesse banco. O teste recusa URL não-local ou outro nome de banco antes de abrir conexão. Use `jdbc:mysql://localhost:PORTA/sgsst_test` ou `jdbc:mysql://127.0.0.1:PORTA/sgsst_test`; os únicos parâmetros de URL aceitos são `connectTimeout`/`socketTimeout` numéricos e `useSSL`/`allowPublicKeyRetrieval` booleanos. Outros parâmetros são recusados para impedir caminhos alternativos de conexão. O contexto de integração usa uma raiz explícita `IntegrationConfig` com `@Configuration` comum (não `@TestConfiguration`, que ainda permitia ao bootstrap descobrir a aplicação). A regressão roda no contexto completo de `@SpringBootTest` e confirma ausência de `SgsstApplication`, auto-configurações JDBC/JPA/SQL-init não solicitadas, repositórios e inicializadores SQL. `application.properties` e seu import de `application-local.properties` não são carregados; um único `DriverManagerDataSource` é construído explicitamente com `MYSQL_IT_*`, sem binding de `spring.datasource.*`, Hikari ou JNDI. A configuração JPA também é explícita, sem binding de `spring.jpa.*`, e registra somente `JpaProbe`. A entidade existe apenas em `src/test`, cria/remove somente `sgsst_base_probe` nesse banco com `create-drop` e nunca entra no JAR. Os quatro testes de integração verificam isolamento do contexto completo, MySQL real/saúde, persistir/consultar/atualizar/excluir em transações diferentes e rejeição de senha errada. Resultado final: **29 rápidos + 4 de integração**, sem falhas/erros/pulados; execução hostil, sentinela descartável e limpeza estão documentadas em `VERIFICACAO.md`.

Linux/Bash (se já definiu `DB_USERNAME`/`DB_PASSWORD`):

```sh
export MYSQL_IT_URL='jdbc:mysql://127.0.0.1:3306/sgsst_test?connectTimeout=3000&socketTimeout=5000'
export MYSQL_IT_USERNAME="$DB_USERNAME"
export MYSQL_IT_PASSWORD="$DB_PASSWORD"
./mvnw -Pmysql-it verify
unset MYSQL_IT_PASSWORD
```

Windows/PowerShell (mesma configuração de senha da seção 2):

```powershell
$env:MYSQL_IT_URL = 'jdbc:mysql://127.0.0.1:3306/sgsst_test?connectTimeout=3000&socketTimeout=5000'
$env:MYSQL_IT_USERNAME = $env:DB_USERNAME
$env:MYSQL_IT_PASSWORD = $env:DB_PASSWORD
.\mvnw.cmd -Pmysql-it verify
Remove-Item Env:MYSQL_IT_PASSWORD
```

Se usou arquivo local em vez das variáveis `DB_*`, defina `MYSQL_IT_USERNAME` e solicite `MYSQL_IT_PASSWORD` com o mesmo procedimento de senha acima. As variáveis `MYSQL_IT_*` são obrigatórias: `-Pmysql-it` sem banco/configuração falha, não pula testes nem troca MySQL por H2. Use `verify`, não apenas `test`, para executar Failsafe. Relatórios em `target/surefire-reports/` e `target/failsafe-reports/`.

## 5. Onde cada colega implementa

Tudo fica em `src/main/java/br/com/senac/sgsst/` (não `br.com.senac.loja`):

| Pasta | Responsabilidade |
| --- | --- |
| `model/` | Entidades `Colaborador`, `Treinamento`, `Epi` |
| `repository/` | Interfaces `JpaRepository` de cada entidade |
| `service/` | Regras e operações do CRUD; já há saúde do banco |
| `dto/` | Request com Validation e Response, sem dependência de ProdutoForm |
| `api/` | RestController `/api/colaboradores`, `/api/treinamentos`, `/api/epis` |
| `config/` | Configuração compartilhada; CORS já pronto |

Pedro Dimas: `Colaborador*`; Pedro Serejo: `Treinamento*`; Simão: `Epi*`. Clara usa os serviços Angular, sem precisar alterar Java. Não alterar POM/configuração comum sem combinar com Marcio. Seguir `../docs/integracao/contrato-proposto.md` e o exemplo de Produto das aulas, sem copiar loja, templates, controllers de página ou seeds. Esta tarefa entrega apenas a base; as três rotas CRUD ainda não existem.
