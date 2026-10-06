# Passo a passo do grupo — sem complicação

Prazo: **sexta-feira, 09/10/2026**. Objetivo: três CRUDs locais, seguindo as aulas Java. Veja sua parte no [roadmap](roadmap.md).

**Esta revisão só muda o planejamento. Ainda não existe o backend do SGSST neste PR.** Os comandos Java abaixo serão usados depois que Márcio entregar a pasta `backend/` e suas instruções.

## 1. Preparar seu computador

- Git e acesso de colaborador ao repositório: aceitar o convite de Márcio.
- Node **24, no mínimo 24.15.0**, para o Angular atual; npm.
- Java **17** e MySQL, como nas aulas. Usar o Maven Wrapper entregue na base; não precisa instalar Maven global nem Docker se não usa isso em aula.

Configure seu autor de commits, trocando os exemplos:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email-do-github"
```

Cada aluno usa sua conta GitHub. Não enviar senha/token para colega nem colocar no código. Se o Git pedir autenticação, usar o gestor de credenciais, GitHub CLI ou SSH já configurado; nunca credencial de Márcio.

## 2. Clonar uma vez

```bash
git clone https://github.com/marciocoelho1/projeto-integrador-frontend.git
cd projeto-integrador-frontend
npm ci
```

Se já clonou, não precisa clonar de novo. Confirme com Márcio que o PR de documentação e, depois, o da base Java foram revisados e integrados na `main`.

## 3. Atualizar e criar sua branch

Com seus arquivos anteriores salvos/commitados:

```bash
git status
git switch main
git pull --ff-only origin main
git switch -c feat/colaboradores
```

Escolha **uma** branch correspondente à sua parte:

| Pessoa | Nome sugerido |
|---|---|
| Márcio | `feat/base-backend` |
| Aluno 2 | `feat/colaboradores` |
| Aluno 3 | `feat/treinamentos` |
| Aluno 4 | `feat/epis` |
| Aluno 5 | `feat/cadastros` |

O exemplo de comando cria a branch do Aluno 2. Os demais substituem o nome. Se a sua branch já existe, use `git switch nome-da-sua-branch` em vez de criá-la outra vez. Confira `git branch --show-current`.

Se `git status` mostrar trabalho não salvo, **pare e preserve esse trabalho antes de trocar de branch**. Não use `reset --hard` para resolver.

## 4. Fazer só sua parte

- **Márcio:** base Java/MySQL, configurações e README de execução.
- **Aluno 2:** classes Java de colaborador, serviço Angular e tela da lista.
- **Aluno 3:** classes Java de treinamento, serviço Angular e catálogo da tela.
- **Aluno 4:** classes Java de EPI, serviço Angular e tela da lista.
- **Aluno 5:** somente os três formulários de `tela-cadastramentos` e ligação aos serviços dos colegas.

Os Alunos 2–4 repetem o exemplo de Produto: Model, Repository, Service, Request/Response e ApiController. Para cada classe nova, conferir nome do arquivo/classe, imports, `@Entity`, rota e campos.

**Não editar arquivo de colega sem conversar.** Só o Aluno 5 altera o TS/HTML central de cadastramentos. Só Márcio altera POM/configuração comum/dependências. Cargo/setor continuam texto; nenhuma pessoa precisa criar login, certificado ou entrega de EPI.

Os nomes dos campos, URLs e métodos já estão no [combinado](contrato-proposto.md). O Aluno 5 prepara formulários em paralelo, mas a gravação só poderá ser testada quando as APIs estiverem disponíveis.

## 5. Rodar o projeto

**Depois da base pronta:** iniciar seu MySQL e seguir o README de Márcio para criar `sgsst` e configurar sua conexão local. Não copiar a senha do colega nem enviar credenciais para o Git.

Terminal 1, na raiz do clone:

```bash
cd backend
./mvnw spring-boot:run
```

No Windows, usar `./mvnw.cmd spring-boot:run`.

Terminal 2, na raiz do clone:

```bash
npm start
```

Abrir `http://localhost:4200`. Backend usa `http://localhost:8080`. Se o terminal não estiver na raiz, voltar para a pasta correta antes de rodar os comandos.

Os dois terminais ficam abertos. Usar dados fictícios e execução local; não publicar a API sem autenticação. O login que já existe é apenas demonstração, não segurança real.

## 6. Testar antes de enviar

No seu cadastro: **cadastrar → listar → editar → recarregar → reiniciar backend → excluir**. Verificar também na tabela do MySQL. Campo vazio/quantidade negativa não deve salvar.

Na raiz do frontend:

```bash
npm run build
npm test -- --watch=false
```

Depois que houver backend, no terminal da pasta `backend`:

```bash
./mvnw test
```

Windows: `./mvnw.cmd test`. Esse comando só testa o que existir de teste; **não substitui testar os botões e o banco**. Se houver falha, anotar o erro e pedir ajuda antes do merge. Nunca mostrar toast de sucesso se o servidor não salvou.

## 7. Commitar e subir a SUA branch

Volte à raiz do clone. Veja o que mudou:

```bash
git status
git diff
git branch --show-current
```

Adicione os arquivos da sua parte, substituindo o caminho do exemplo:

```bash
git add caminho/do/seu/arquivo
git diff --cached
git commit -m "feat: integrar CRUD de colaboradores"
git push -u origin HEAD
```

Repita `git add` para os outros arquivos necessários. Antes de commitar, conferir que não há senha, `.env`, `node_modules`, `dist` ou `target`. O texto do commit deve descrever seu módulo. `HEAD` publica a branch atual; **confira que ela não é `main`**.

## 8. Abrir o pedido de revisão no GitHub

1. Abrir o repositório e clicar **Compare & pull request**.
2. Escolher base `main` e sua branch em compare.
3. Escrever o que fez, como executar e o que realmente testou.
4. Pedir revisão de outro colega. Márcio organiza a ordem dos merges; o PR de Márcio também recebe revisão de outro aluno.

Exemplo de descrição:

```text
Minha parte: CRUD de colaboradores.
Teste: cadastrei, consultei, editei, recarreguei e excluí.
Resultado do build/testes:
Falta fazer / problemas:
```

No [Project](https://github.com/users/marciocoelho1/projects/2), mudar **A fazer → Fazendo → Pronto**. Só marcar Pronto depois de testar e integrar o PR. Se estiver travado, escrever o motivo no cartão e avisar o grupo. Os números 01–08 são cartões de planejamento, não números de Issues.

## 9. Pegar o que os colegas integraram

Com seu trabalho já commitado, na sua branch:

```bash
git fetch origin
git merge origin/main
```

Rodar os testes novamente e fazer `git push`. Se aparecer conflito, **não escolher tudo de um lado nem apagar o código do colega**. Resolver com o dono do arquivo. Se não souber continuar, `git merge --abort` cancela esse merge para vocês discutirem.

## 10. Depois que seu PR foi integrado

Com seus arquivos salvos:

```bash
git switch main
git pull --ff-only origin main
```

Na quinta, os cinco testam essa mesma versão. Na sexta, apresentam a versão ensaiada, sem função nova de última hora.

**Três regras para não quebrar o projeto:** branch própria; um dono por arquivo compartilhado; revisão/teste antes de integrar na `main`.
