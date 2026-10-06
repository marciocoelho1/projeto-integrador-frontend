# Plano simples: três CRUDs até sexta, 09/10/2026

[Project do grupo](https://github.com/users/marciocoelho1/projects/2) · [Guia Git](passo-a-passo.md) · [Campos e URLs combinados](contrato-proposto.md)

## 1. O que vamos entregar

Uma demonstração **local**, com Angular + Java + MySQL, em que seja possível **cadastrar, listar, editar e excluir**:

1. Colaboradores.
2. Treinamentos: apenas o catálogo de cursos.
3. EPIs: apenas cadastro e quantidade informada.

Isso é CRUD, como o exemplo de produtos das aulas. O objetivo é mostrar um dado saindo da tela, sendo salvo no banco e aparecendo novamente ao recarregar.

**Confirmar esse recorte com o professor hoje.** Se ele exigir integração de todas as telas até sexta, este plano reduzido não atende sozinho. Não dá para garantir a entrega completa sem conhecer essa exigência e o tempo disponível dos colegas.

## 2. Divisão entre os cinco

| Pessoa | Sua parte | Arquivos principais |
|---|---|---|
| **Márcio** | Preparar um backend, conexão MySQL e organizar os merges | `backend/pom.xml`, configurações, classe principal e instruções de execução |
| **Pedro Dimas** | CRUD de colaboradores em Java + consulta/edição/exclusão da lista Angular | Classes `Colaborador*`, `colaborador.service.ts`, `tela-colaboradores/*` |
| **Pedro Serejo** | CRUD do catálogo de treinamentos em Java + sua lista Angular | Classes `Treinamento*`, novo `treinamento.service.ts`, somente catálogo em `tela-matriz-treinamento/*` |
| **Simão** | CRUD de EPIs em Java + consulta/edição/exclusão da lista Angular | Classes `Epi*`, `epis.service.ts`, `tela-epis/*` |
| **Clara** | Ligar os três formulários de cadastro aos serviços dos colegas; organizar o ensaio | `tela-cadastramentos/cadastramentos.ts` e `.html` |

A divisão está definida com os nomes do grupo. **Clara é a única que edita os formulários centrais:** isso evita três pessoas mexendo no mesmo arquivo. Ela não precisa criar um quarto CRUD.

## 3. Calendário

| Dia | Resultado esperado |
|---|---|
| **Terça, 06/10** | Confirmar escopo/nome de cada pessoa; Márcio publica a base Java/MySQL e os campos combinados. Os colegas leem o CRUD de Produto das aulas. Clara prepara os campos dos formulários. |
| **Quarta, 07/10** | Pedro Dimas, Pedro Serejo e Simão entregam as APIs e ligam suas listas. Clara liga o botão Salvar de cada cadastro. Cada um testa seu CRUD. Integrar APIs prontas sem esperar a véspera. |
| **Quinta, 08/10** | Juntar branches, testar os três CRUDs no mesmo projeto, corrigir problemas e ensaiar. Nada novo além do combinado. |
| **Sexta, 09/10** | Conferir funcionamento e apresentar a versão ensaiada. Não começar recurso novo. |

Essas são metas, não trabalho já concluído. Se a base não funcionar na terça ou algum CRUD ficar bloqueado na quinta, avisar o grupo e o professor imediatamente.

## 4. O que não fazer nesta semana

Não implementar agora: login real/permissões, recuperação de senha, usuários/grupos, auditoria, dashboard real, prontuário, LNT, certificados, vínculo de treinamento com pessoa, reciclagem/turmas, entrega/assinatura de EPI, importação de planilhas ou suporte.

Também não adicionar ferramentas novas: JWT, Spring Security, Flyway, pipeline de CI ou Docker obrigatório. Usar o MySQL que já sabem executar e `ddl-auto=update` como nas aulas. Cargo/setor ficam como texto; não criar tabelas/relacionamentos adicionais nesta entrega.

Não apagar o frontend já apresentado. **Avisar na tela o que ainda é demonstração e desabilitar ações não integradas que anunciam sucesso.** Login continua demonstrativo; não chamar isso de segurança real. Entrega de EPI deve ficar desabilitada para não dar baixa em saldo apenas no navegador. Histórico e matriz completa não serão apresentados como dados reais.

**Somente máquina local e dados fictícios. Não publicar uma API sem autenticação na internet.**

## 5. Receita que os três CRUDs repetem

`Model → Repository → Service → ApiController → serviço Angular → tela`.

- **Model:** classe que representa a tabela, como `Produto.java`.
- **Repository:** faz acesso ao banco, como `ProdutoRepository`.
- **Service:** organiza cadastrar, buscar, editar e excluir.
- **ApiController:** recebe GET/POST/PUT/DELETE do Angular.
- **Request/Response:** classes dos dados enviados/recebidos, como as já usadas nas aulas.

Os três módulos não dependem entre si. Todos dependem apenas da base que Márcio prepara e dos nomes de campos/URLs combinados em [contrato-proposto.md](contrato-proposto.md).

## 6. Quando dizer que terminou

Para cada módulo, mostrar:

- [ ] Cadastrar pela tela e ver o registro no MySQL.
- [ ] Listar, editar e excluir com confirmação.
- [ ] Recarregar a página e reiniciar o backend sem perder os dados.
- [ ] Campo obrigatório vazio não salva; EPI com quantidade negativa não salva.
- [ ] Erro de conexão não mostra mensagem de cadastro concluído.
- [ ] Branch enviada, PR revisado e integrado na `main`.

As tarefas estão no [backlog curto](backlog.md). Os 30 cartões do plano anterior foram reduzidos a oito tarefas ativas; funções retiradas ficam para depois da entrega, não como tarefas obrigatórias desta semana.

**Este documento é planejamento. O backend ainda precisa ser implementado pelo grupo.**
