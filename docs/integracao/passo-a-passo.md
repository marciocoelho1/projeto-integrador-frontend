# Passo a passo — clone, integração, commit, branch e PR

Guia para os **cinco integrantes do SGSST**. Leia [roadmap](roadmap.md) e [contrato proposto](contrato-proposto.md) antes de escrever código.

**Estado desta entrega:** o frontend existe e foi testado; o backend ainda será criado no G02. Comandos da seção 5 só se aplicam depois do bootstrap estar mergeado. Não copiar o frontend do professor, nem sobrescrever o Angular com o projeto das aulas.

## 1. Preparação de cada integrante

1. Criar/usar sua conta GitHub; informar login a Márcio.
2. Aceitar o convite como colaborador do repositório. Sem acesso de escrita não será possível publicar branch neste repositório. Márcio confirma também permissão de edição do Project; leitura pública não implica edição.
3. Instalar Git, **Node 24 LTS >=24.15.0**, npm na versão combinada (o `package.json` atual declara `npm@11.16.0`) e, para o backend, **JDK 17**. Maven global não será necessário se G02 entregar Wrapper. MySQL local ou Docker conforme README criado no G02.
4. Não instalar Angular CLI global para este fluxo; usar os scripts npm da versão do repositório.
5. Confirmar no terminal:

```bash
git --version
node --version
npm --version
java -version
```

Configurar nome/email de autor, substituindo valores pelos seus dados:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email-associado-ao-github"
```

Não compartilhar senha/token em chat, PR, `.env`, screenshot ou commit. Autenticação do GitHub deve usar GitHub CLI (`gh auth login`), gestor de credenciais ou SSH configurado, nunca senha da conta digitada como senha de Git.

## 2. Clonar uma vez e conferir o remoto

Em uma pasta escolhida para estudos:

```bash
git clone https://github.com/marciocoelho1/projeto-integrador-frontend.git
cd projeto-integrador-frontend
git remote -v
git branch --show-current
git status
npm ci
npm run build
npm test -- --watch=false
npm start
```

`npm start` fica aberto servindo o frontend em `http://localhost:4200`. Abra outro terminal para Git/testes. Use `npm ci` em vez de atualizar todas as dependências por conta própria; lockfile só muda em tarefa específica e revisada.

A análise encontrou 19 testes passando com Node 24. Com Node 26.7.0, quatro testes falharam por `localStorage` no ambiente de testes; não contornar removendo os testes nem usando esse resultado como prova de defeito de negócio. Conferir primeiro a versão combinada.

## 3. Escolher tarefa e criar sua branch

1. Abrir [Project](https://github.com/users/marciocoelho1/projects/2).
2. Selecionar cartão do seu papel que tenha dependências satisfeitas. Anotar objetivo/aceite e revisão. Não começar integração em cartão bloqueado sem conversar.
3. Atualizar a base **com diretório limpo**:

```bash
git status
git switch main
git fetch origin
git pull --ff-only origin main
```

Se `git status` mostrar alterações, não trocar/apagar à força. Commitar o trabalho relevante na branch atual ou guardar temporariamente:

```bash
git stash push -u -m "trabalho temporario antes de atualizar a base"
```

Depois, recuperar na branch adequada com `git stash pop` e resolver qualquer conflito. Nunca usar `git reset --hard` para “facilitar” a atualização.

Criar branch de **uma tarefa**, incluindo seu nome/login e ID. Exemplos de convenção; os nomes reais devem ser substituídos:

| Papel | Exemplo de branch | Começo do trabalho |
|---|---|---|
| M1 — Márcio | `feat/marcio-g02-base-backend` | Base e contrato, antes das integrações dos colegas |
| M2 — Pessoas | `feat/seu-login-p01-colaboradores` | Após G02; P02 também depende de G03/A01 |
| M3 — Treinamentos | `feat/seu-login-t01-treinamentos` | Após G02/G03; vínculos dependem de P01 |
| M4 — EPIs | `feat/seu-login-e01-epis` | Após G02/G03; entregas dependem de P01/A01 |
| M5 — Suporte/visões | `feat/seu-login-s01-suporte` | Após G02/A01; visões aguardam contratos de T/E/P |

Exemplo executável depois de substituir `seu-login`:

```bash
git switch -c feat/seu-login-p01-colaboradores
```

Marcar cartão **Em andamento** e registrar branch. Uma tarefa/branch ativa por pessoa. Não abrir cinco branches concorrentes alterando o mesmo formulário coletivo.

## 4. O que cada membro implementa em sua tarefa

### M1 — Márcio

- Aprovar contrato/escopo/nomes no G01; publicar `backend/`, Compose/env/example, erros JSON, SQL/migrações e comandos reais de execução no G02.
- Extrair formulários e separar serviços/modelos compartilhados no G03.
- Implementar acesso/admin, padronizar dependências/CI e coordenar permissões/proteção de main.
- Submeter seus próprios PRs à revisão de um colega; não aprovar sozinho sua alteração.

### M2 — Pessoas

- Entity/DDL/FK/DTO/repository/service/controller de pessoa/cargo/setor.
- Validar identificadores, email, duplicidade e inativação; atualizar por ID.
- Integrar formulário/lista; prontuário consulta certificados e entregas dos donos; adapter de importação só em etapa aprovada.
- Não escrever novo login nem duplicar histórico por nome.

### M3 — Treinamentos

- Entregar primeiro catálogo e LNT, depois participação/certificado e matriz calculada.
- Integrar cada modal/formulário de verdade; duração/datas/IDs conforme contrato.
- Criar testes de vencimento e vínculos. Turmas/reciclagens/materiais/importação em F3, com ajuda de M5 em testes.
- Não editar o catálogo de cargos de M2 sem acordo.

### M4 — EPIs

- Entity/DDL/DTO/regras de catálogo/estoque/movimento/entrega.
- Baixa+entrega atômicas, quantidade inteira positiva, sem saldo negativo, controle de concorrência.
- Integrar formulário/lista/entrega por IDs; contrato de aceite/importação apenas se aprovado.
- Não usar nome livre de colaborador como vínculo nem inventar assinatura digital.

### M5 — Suporte e visões

- Unificar chamados dos dois perfis, com dono vindo da sessão e estados reais.
- Montar área `/me` e dashboard consumindo contratos dos demais; sem dados pessoais de todos filtrados só no browser.
- Orquestrar protocolo de importação, deixando regra de cada domínio com M2/M3/M4.
- Coordenar roteiro de homologação/evidências; ajudar M3 em testes sem editar simultaneamente seu arquivo principal.

Para **qualquer módulo**, seguir: migration/entidade → repository → service/regra → DTO/controller → testes da API → serviço HTTP Angular → tela → testes negativos e persistência. Comparar aceite do cartão durante o desenvolvimento.

## 5. Executar frontend/backend e banco após G02

**Não executar esta seção como se `backend/` já existisse.** Primeiro confirmar o merge G02 e seguir seu README de ambiente, env, migrações, seeds e Compose. Não existe neste PR `.env.example`, banco ou proxy implementado.

- Cada integrante cria sua configuração local a partir do example entregue pelo G02; os arquivos com segredos ficam ignorados no Git. Conferir com `git status` antes de qualquer commit.
- Iniciar banco conforme README; conferir porta/usuário/perfil local. A base das aulas possui divergência 3307/3306: não copiar configurações conflitantes.
- No terminal do backend, com Wrapper presente:

```bash
cd backend
./mvnw verify
./mvnw spring-boot:run
```

No Windows/PowerShell, usar `./mvnw.cmd verify` e `./mvnw.cmd spring-boot:run`.

Em outro terminal, na raiz:

```bash
npm ci
npm start
```

O bootstrap deve configurar o proxy `/api` usado por `npm start`, ou documentar expressamente o comando de start correspondente. Evitar editar URL em todas as telas.

Não usar banco de outro colega. Se schema/migration falhar, registrar erro e falar com o dono; nunca apagar volume/banco alheio. Não enviar dados reais de colaboradores para testar.

## 6. Testar antes de commitar

Na raiz:

```bash
npm run build
npm test -- --watch=false
```

Depois de G02, também:

```bash
cd backend
./mvnw verify
```

Voltar à raiz do clone antes dos comandos Git seguintes. Registrar no PR quais comandos realmente passaram e cenário manual: persistência após reload/restart; 400/401/403/404/409 relevantes; homônimos, duplicidades ou estoque concorrente conforme módulo. Compilar não é o mesmo que testar.

Se não conseguir iniciar banco/testar API, manter PR draft/bloqueado e explicar. Não escrever “testado” com base em resultado esperado.

## 7. Atualizar sua branch com a main e resolver conflitos

Com trabalho salvo/commitado:

```bash
git fetch origin
git merge origin/main
```

Este guia usa **merge da main na branch de tarefa** para não exigir force push de estudantes. Se houver conflito:

1. `git status` lista arquivos conflitantes.
2. Abrir cada arquivo, entender ambas as alterações e remover marcadores `<<<<<<<`, `=======`, `>>>>>>>` preservando o comportamento correto.
3. Se envolver contrato, migration, dependência ou domínio de colega, resolver junto com o dono. Não escolher automaticamente “aceitar tudo meu”.
4. Adicionar os arquivos resolvidos e concluir o merge:

```bash
git add caminho/do/arquivo-resolvido
git commit
```

5. Rodar novamente build/testes; depois push. Se não souber resolver ainda, `git merge --abort` cancela esse merge e permite discutir sem sobrescrever a main.

Após mudanças de lockfile, rodar `npm ci`. Após mudança de migration, usar o mecanismo documentado no G02.

## 8. Commitar só o que pertence à tarefa

```bash
git status
git diff
git add caminho/do/arquivo1 caminho/do/arquivo2
git diff --cached
git diff --cached --check
git commit -m "feat(pessoas): cadastrar colaborador por ID"
```

Os caminhos são exemplos: substituir pelos arquivos da sua tarefa. Evitar `git add .` sem inspeção. Não versionar `.env`, senhas/tokens, `node_modules`, `dist`, `target`, dumps reais nem configurações pessoais da IDE.

Mensagens sugeridas: `feat(epis): registrar entrega atomica`, `fix(auth): negar acesso sem permissao`, `test(treinamentos): cobrir vencimento`, `docs: atualizar execucao local`. Commits pequenos e explicáveis.

## 9. Subir a própria branch e abrir PR

```bash
git branch --show-current
git push -u origin HEAD
```

O comando publica **a branch atual**, não a main. Conferir seu nome antes de executar. Se o remoto negar acesso, verificar convite/login; não tentar contornar com credencial do líder.

No GitHub, clicar **Compare & pull request**: base `main`, compare sua branch. Ou, com GitHub CLI autenticado:

```bash
gh pr create --base main --draft --title "feat(pessoas): integrar cadastro de colaborador"
```

O CLI solicita descrição; não submeter texto dizendo que testes passaram se não passaram. Enquanto incompleto, manter draft. Quando pronto, usar **Ready for review**, marcar cartão **Em revisão**, incluir link do PR e solicitar colega revisor.

Modelo de descrição:

```text
Cartão: P01 (rascunho do Project; não é número de Issue)
Objetivo:
Arquivos/domínios alterados:
Contrato/migration alterados:
Como executar e testar:
Comandos executados e resultados:
Evidência manual / persistência / autorização:
Dependências ou limitações:
```

P01/G02/etc. são IDs do planejamento, **não números de Issues**: não usar `Closes #P01`. Se um cartão for convertido em Issue depois, usar seu número real.

## 10. Revisão, correções e merge

- Revisor confere contrato, schema, regra, dados/segredos, acesso, testes e preservação do frontend; não apenas o print.
- Autor responde comentários, corrige na mesma branch, retesta e envia `git push`; o PR atualiza automaticamente.
- CI e aprovação precisam estar reais/verdes. Márcio coordena merge de PRs dependentes em ordem; não mergear draft/incompleto.
- **Ninguém faz push direto na main**, nem `git push --force` em branch de colega/main. Não usar `npm audit fix --force` para resolver indiscriminadamente a auditoria.
- Concluir cartão apenas após merge e aceite com evidência. “Subi a branch” não significa “entreguei a tarefa”.

## 11. Depois do merge

Somente com alterações locais preservadas e PR realmente mergeado:

```bash
git switch main
git pull --ff-only origin main
```

Depois criar a próxima branch a partir dessa main. Apagar a branch remota pelo botão do PR após merge, se desejado. Se usar squash merge, `git branch -d` pode recusar apagar a branch local porque os commits foram reescritos; deixá-la é seguro. Não aplicar `-D` automaticamente sem confirmar que tudo foi integrado.

## 12. Checklist final do integrante

- [ ] Sou o responsável real do cartão; dependências satisfeitas.
- [ ] Branch própria por tarefa, baseada na main atualizada.
- [ ] Só alterei meu módulo/arquivos combinados.
- [ ] Contrato, schema, API, tela e testes atendem o aceite.
- [ ] Não há segredo/dado pessoal real versionado.
- [ ] Build/testes passam; fluxo persiste e falhas não produzem falso sucesso.
- [ ] Branch publicada, PR com evidências e revisão de outro integrante.
- [ ] Merge confirmado; cartão concluído com link/resultados; próxima tarefa sai da main.

Se não houver permissão de escrita no repositório, alternativa é fork+PR, mas só adotar após combinar com Márcio: muda o remoto de publicação e a organização deste guia.
