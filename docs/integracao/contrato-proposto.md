# Combinado simples: campos, URLs e métodos

Este é o combinado proposto para os **três CRUDs de sexta, 09/10/2026**. Ainda não é backend implementado. Os cinco devem confirmar estes nomes antes de começar; isso evita o frontend enviar `nome` e o Java esperar outro campo.

## 1. Uma base só

- Angular continua na raiz do repositório; Java em `backend/`.
- Usar Spring Boot/Java 17, Web, JPA, Validation, MySQL e Maven Wrapper já presentes nas aulas. Não acrescentar ferramentas novas.
- Frontend: `http://localhost:4200`; backend: `http://localhost:8080`.
- Banco: `sgsst`, usando o MySQL local que o grupo conhece. Cada pessoa tem seu banco local.
- Manter `ddl-auto=update` como na aula, **apenas nesta demonstração local**. Márcio documenta criação do banco e configuração; não há sistema de migração nesta semana.
- Credenciais reais ficam na configuração local/variáveis de ambiente, fora do Git. Márcio entrega um exemplo sem segredo.
- Rodar o backend vinculado a `127.0.0.1` e não expor o banco/API na internet. Não haverá autenticação real nesta entrega; usar apenas dados fictícios.

## 2. As três tabelas

Sem relacionamento entre elas nesta semana. Cargo e setor são textos; não criar tabela de usuário, certificação, entrega ou turma.

| Classe | Campos no Java e no JSON |
|---|---|
| **Colaborador** | `id` (Long), `matricula`, `nome`, `cpf`, `email`, `cargo`, `setor`, `status` (textos) |
| **Treinamento** | `id` (Long), `codigo`, `nome`, `classificacao`, `nr`, `cargaHoraria` (textos), `validadeMeses` (Integer), `status` (texto) |
| **Epi** | `id` (Long), `descricao`, `ca`, `inclusao`, `validade` (textos), `quantidade` (Integer) |

- `id` é gerado pelo banco; não é enviado no cadastro. Usar esse número para editar/excluir.
- Matrícula e CPF são campos diferentes. Acrescentar matrícula no formulário; não gerar senha ou usuário.
- Status de pessoa: `Ativo`, `Inativo`, `Afastado`. Status de treinamento: `Ativo`, `Inativo`.
- Carga horária continua texto, por exemplo `8h`, como na tela atual.
- Datas de EPI são textos `YYYY-MM-DD`, por exemplo `2026-10-09`; apresentar `DD/MM/YYYY` somente na tela.
- CA é texto, não número; preservar zeros iniciais. Quantidade deve ser inteira e não negativa.
- Quantidade é um campo editável do cadastro de EPI nesta versão. **Não significa movimentação/entrega de estoque implementada.**

Validações mínimas: nome/descrição e identificadores obrigatórios; email com formato válido; matrícula/código sem repetição; quantidade e validadeMeses não negativas. Reaproveitar a validação da aula; não criar regras normativas novas de NR/CA.

## 3. As mesmas operações para os três

Substituir `recurso` por `colaboradores`, `treinamentos` ou `epis`:

| Operação | Chamada |
|---|---|
| Listar | `GET /api/recurso` |
| Buscar um | `GET /api/recurso/{id}` |
| Cadastrar | `POST /api/recurso` |
| Editar | `PUT /api/recurso/{id}` |
| Excluir | `DELETE /api/recurso/{id}` |

Como na aula: POST responde 201 com registro salvo; GET/PUT retornam o registro; DELETE responde 204 sem corpo. Lista é um array. Campo inválido recebe erro 400; ID inexistente, 404. Matrícula/código repetido deve ser rejeitado com mensagem, não sobrescrever outro registro.

## 4. Métodos combinados no Angular

Cada dono do CRUD cria seu service com estes mesmos nomes:

```text
listar()
buscar(id)
cadastrar(dados)
atualizar(id, dados)
excluir(id)
```

Arquivos: `colaborador.service.ts`, novo `treinamento.service.ts`, `epis.service.ts`. `id` é número; os dados são tipados conforme a tabela acima. O Simão adapta os nomes existentes do serviço de EPI, avisando Clara.

Clara usa `cadastrar(dados)` nos três formulários. Pedro Dimas, Pedro Serejo e Simão usam os outros métodos nas listas. Mostrar sucesso **dentro da resposta de sucesso da chamada HTTP**, nunca antes. Se falhar, mostrar erro e manter os campos.

## 5. O que ajustar no frontend sem reconstruí-lo

- Pedro Dimas: atualizar a lista por `id`, não matrícula/nome; adicionar excluir com confirmação.
- Pedro Serejo: ligar somente a lista do catálogo; não alimentar as outras abas como se estivessem integradas.
- Simão: trocar URLs 3000 por 8080/api, usar `id` numérico e desabilitar entrega de EPI. Se a tela exibir `EPI-01`, formatar a partir do número; não guardar esse texto como ID do banco.
- Clara: adicionar matrícula, retirar grupo/senha do cadastro, capturar os campos de treinamento/EPI e desabilitar abas LNT/reciclagem.
- Manter estilos e navegação existentes. Login e demais telas não entram no backend desta semana e devem ser rotulados como demonstração.

Se for necessário mudar nome de campo/método, avisar seu colega **antes**, alterar este documento e os dois lados juntos. Não gastar a sexta redesenhando essa combinação.
