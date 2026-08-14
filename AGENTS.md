# Repository Guidelines

## Stack e convenções Angular

- Angular 22 com TypeScript 6, componentes standalone, Router, HttpClient, RxJS, Bootstrap 5 e SheetJS (`xlsx`).
- Mantenha telas em `src/app/tela-*`, componentes reutilizáveis em `src/app/componentes` e serviços em `src/app/service`. Rotas e providers ficam em `app.routes.ts` e `app.config.ts`.
- Preserve arquivos separados por componente (`.ts`, `.html` e `.scss`), use Signals para estado reativo local e o control flow moderno (`@if`, `@for`, `@switch`).
- Use kebab-case em arquivos e diretórios, PascalCase em classes/tipos e camelCase em propriedades e métodos. Seletores Angular usam o prefixo `app-`.
- Siga o TypeScript estrito dos `tsconfig*.json`. Use dois espaços, aspas simples, largura de 100 caracteres e as regras de `.editorconfig` e `.prettierrc`.
- Reutilize variáveis e utilitários de `src/styles.scss`; mantenha estilos locais no SCSS do componente e siga o padrão BEM existente.

## Comandos de build e teste

- `npm ci`: instala as dependências registradas no lockfile.
- `npm start`: inicia o servidor de desenvolvimento em `http://localhost:4200`.
- `npm run build`: gera o build de produção e valida os limites de bundle do Angular.
- `npm run watch`: recompila continuamente em modo de desenvolvimento.
- `npm test`: executa os testes unitários com o builder Angular/Vitest e jsdom.
- `npx prettier --check <arquivos>`: verifica a formatação dos arquivos alterados.

## Regras de edição

- Faça mudanças focadas; não reformate arquivos fora do escopo.
- Preserve alterações já existentes no worktree e não sobrescreva trabalho do usuário.
- Coloque testes `*.spec.ts` próximos ao código testado. Cubra regressões, serviços, guards e comportamento relevante da interface com `TestBed` quando necessário.
- Não inclua segredos ou credenciais. `.env`, `node_modules/`, `dist/` e `coverage/` não devem ser versionados.
- Preserve textos em UTF-8, tipagem explícita quando ela aumentar a clareza e acessibilidade semântica nos templates.

## Critérios de conclusão

Uma alteração está concluída quando atende ao pedido sem efeitos colaterais conhecidos, está formatada, compila com `npm run build` e passa em `npm test`. Testes devem ser adicionados ou atualizados quando o comportamento mudar. Informe qualquer verificação não executada, falha preexistente ou risco remanescente.

## Alterações que exigem autorização

Não altere dependências ou `package-lock.json`, configurações Angular/TypeScript, limites de bundle, contratos de serviços, autenticação, guards, permissões, estrutura de rotas, variáveis globais de estilo ou ativos de marca sem autorização explícita. Não remova testes, funcionalidades ou dados de teste para fazer uma validação passar. Não execute operações destrutivas de Git nem descarte mudanças locais sem autorização.
