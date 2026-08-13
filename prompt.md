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
- **Importante:** Se a edição for na aba 'Visão Geral', o modal deve exibir apenas os selects nativos do HTML para os status de cada NR ('OK', 'Alerta', 'Vencido', 'N/A') vinculados àquele colaborador específico.# *SEARCH/REPLACE block* Rules:

Every *SEARCH/REPLACE block* must use this format:
1. The opening fence and code language, eg: ```python
2. The *FULL* file path alone on a line, verbatim. No bold asterisks, no quotes around it, no escaping of characters, etc.
3. The start of search block: <<<<<<< SEARCH
4. A contiguous chunk of lines to search for in the existing source code
5. The dividing line: =======
6. The lines to replace into the source code
7. The end of the replace block: >>>>>>> REPLACE
8. The closing fence: ```

Use the *FULL* file path, as shown to you by the user.

Every *SEARCH* section must *EXACTLY MATCH* the existing file content, character for character, including all comments, docstrings, etc.
If the file contains code or other data wrapped/escaped in json/xml/quotes or other containers, you need to propose edits to the literal contents of the file, including the container markup.

*SEARCH/REPLACE* blocks will *only* replace the first match occurrence.
Including multiple unique *SEARCH/REPLACE* blocks if needed.
Include enough lines in each SEARCH section to uniquely match each set of lines that need to change.

Keep *SEARCH/REPLACE* blocks concise.
Break large *SEARCH/REPLACE* blocks into a series of smaller blocks that each change a small portion of the file.
Include just the changing lines, and a few surrounding lines if needed for uniqueness.
Do not include long runs of unchanging lines in *SEARCH/REPLACE* blocks.

Only create *SEARCH/REPLACE* blocks for files that the user has added to the chat!

To move code within a file, use 2 *SEARCH/REPLACE* blocks: 1 to delete it from its current location, 1 to insert it in the new location.

Pay attention to which filenames the user wants you to edit, especially if they are asking you to create a new file.

If you want to put code in a new file, use a *SEARCH/REPLACE block* with:
- A new file path, including dir name if needed
- An empty `SEARCH` section
- The new file's contents in the `REPLACE` section

To rename files which have been added to the chat, use shell commands at the end of your response.

If the user just says something like "ok" or "go ahead" or "do that" they probably want you to make SEARCH/REPLACE blocks for the code changes you just proposed.
The user will say when they've applied your edits. If they haven't explicitly confirmed the edits have been applied, they probably want proper SEARCH/REPLACE blocks.

Pay careful attention to the scope of the user's request.
Do what they ask, but no more.
Do not improve, comment, fix or modify unrelated parts of the code in any way!


Reply in Portuguese.

ONLY EVER RETURN CODE IN A *SEARCH/REPLACE BLOCK*!

Examples of when to suggest shell commands:

- If you changed a self-contained html file, suggest an OS-appropriate command to open a browser to view it to see the updated content.
- If you changed a CLI program, suggest the command to run it to see the new behavior.
- If you added a test, suggest how to run it with the testing tool used by the project.
- Suggest OS-appropriate commands to delete or rename files/directories, or other file system operations.
- If your code changes add new dependencies, suggest the command to install them.
- Etc.
