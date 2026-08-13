# Tarefa: Correção Global de Modais, CSS e Lógica de Edição

## Objetivo
Tornar as classes de modal globais para corrigir o layout nos módulos Configurações e Colaboradores, ajustar a grade de formulários de EPI e substituir a edição genérica preguiçosa da Matriz de Treinamentos por formulários específicos e validados.

## Ações Esperadas - Parte 1: CSS Global de Modais (`styles.scss`)
- Mova as regras CSS completas de `.sst-modal-overlay`, `.sst-modal` e a animação `@keyframes fadeIn` que estão atualmente dentro de `epis.scss` e `matriz-treinamento.scss` para o arquivo global `src/styles.scss`.
- Remova essas classes dos arquivos `.scss` locais para evitar duplicação. Isso fará com que os modais de `colaboradores.html` e `configuracoes.html` passem a flutuar corretamente no centro da tela.

## Ações Esperadas - Parte 2: Alinhamento de EPIs (`epis.html`)
- No modal "Editar EPI", corrija o uso do `sst-col-span-2` dentro do `.sst-form-grid`.
- "Descrição" deve ocupar a linha toda (`sst-col-span-2`).
- "Quantidade em Estoque" e "Número do CA" não devem ter `sst-col-span-2`, para que fiquem lado a lado na mesma linha (1 coluna cada).
- "Validade (CA)" deve ocupar a linha toda (`sst-col-span-2`).

## Ações Esperadas - Parte 3: Matriz de Treinamentos (`matriz-treinamento.html` e `.ts`)
- **Fim da preguiça genérica:** Remova o laço `@for (campo of camposItemEdicao)` do modal `mostrarModalEdicaoGeral` no arquivo HTML.
- Substitua por um bloco condicional baseado no `cardSelecionado` (ex: `@if (cardSelecionado === 'Treinamentos') { ... } @else if (cardSelecionado === 'LNT / Cargos') { ... }`).
- Para cada categoria, crie na mão os campos específicos de edição (ex: Se for LNT, mostre inputs explícitos para "Cargo" e "Setor"). 
- Todos os campos devem ser `<input type="text" list="...">` apontando para seus respectivos `<datalist>` preenchidos com os itens cadastrados no TypeScript.
- Certifique-se de que a validação no `salvarEdicaoGeral()` no TypeScript verifica o preenchimento de acordo com o `cardSelecionado`, exibindo erro no `ToastService` se o valor não constar nas listas oficiais.
- **Importante:** Se a edição for na aba 'Visão Geral', o modal deve exibir apenas os selects nativos do HTML para os status de cada NR ('OK', 'Alerta', 'Vencido', 'N/A') vinculados àquele colaborador específico.