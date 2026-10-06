# SGSST - Sistema de Gestão de Saúde e Segurança do Trabalho

Sistema web desenvolvido como Projeto Integrador para o curso do Senac, voltado ao gerenciamento dos processos de Segurança do Trabalho do Essenza Supermercados Ltda. 

A plataforma centraliza o controle do quadro de colaboradores, matriz de treinamentos, gestão de estoque e entrega de EPIs, além de fornecer visões analíticas via dashboard e controle de acesso por perfil de usuário.

---

## Planejamento da integração backend/banco

**Plano reduzido para sexta-feira, 09/10/2026:** integrar somente os CRUDs de colaboradores, catálogo de treinamentos e EPIs, seguindo as aulas Java. A base Java/MySQL de Marcio está em `backend/`, com [instruções de execução](backend/README.md). Os três CRUDs ainda serão implementados pelos respectivos integrantes. A base está na branch `feat/base-backend-mysql`, aguardando revisão e merge na `main`. As outras telas e o login continuam protótipo/demonstração. Somente execução local com dados fictícios, sem publicar API sem autenticação.

- **Marcio:** base Java/MySQL e coordenação dos merges.
- **Pedro Dimas:** CRUD de colaboradores e sua lista.
- **Pedro Serejo:** CRUD do catálogo de treinamentos e sua lista.
- **Simão:** CRUD de EPIs e sua lista.
- **Clara:** os três formulários de cadastro e organização do ensaio.

- [GitHub Project público — SGSST](https://github.com/users/marciocoelho1/projects/2)
- [Análise do frontend e backend das aulas](docs/integracao/analise.md)
- [Divisão dos cinco integrantes e roadmap](docs/integracao/roadmap.md)
- [Campos e URLs dos CRUDs — confirmar com o grupo](docs/integracao/contrato-proposto.md)
- [Backlog com dependências e critérios de aceite](docs/integracao/backlog.md)
- [Entrega da base de Marcio e próximos passos](docs/integracao/entrega-marcio.md)
- [Passo a passo: clone, integração, commit, branch e PR](docs/integracao/passo-a-passo.md)

Para o trabalho de integração, seguir o passo a passo: Node 24, `npm ci`, scripts locais e uma branch por integrante.

## Tecnologias Utilizadas

- **Framework Web:** Angular (v22)
- **Linguagem:** TypeScript
- **Estilização:** SCSS (Design System proprietário com CSS Variables e BEM)
- **Gerenciamento de Estado:** Angular Signals (`signal`, `computed`)
- **Processamento de Arquivos:** SheetJS (`xlsx`) para leitura de planilhas CSV e Excel
- **Arquitetura:** Standalone Components e Novo Control Flow (`@if`, `@for`, `@switch`)

---

## Telas e funcionalidades do protótipo

**A lista abaixo descreve a interface existente, não recursos persistidos ou autenticação real.** Nesta etapa somente a base Java/MySQL foi preparada; os CRUDs e sua integração Angular continuam nas tarefas 03–06.

### Perfil Administrador / Técnico de SST
- **Dashboard Analítico:** Indicadores de certificações ativas/vencidas, nivelamento de estoque de EPIs e progresso de reciclagens.
- **Gestão de Colaboradores:** Consulta, filtragem por múltiplos campos e visualização da situação cadastral do funcionário.
- **Matriz de Treinamentos:** Mapeamento de capacitações por NR (Norma Regulamentadora) e acompanhamento de validades.
- **Controle de EPIs:** Gerenciamento de estoque de equipamentos, edição de C.A. (Certificado de Aprovação) e registro de entregas com dedução automática do saldo em estoque.
- **Cadastramentos:** Central de cadastro para novos colaboradores, treinamentos e equipamentos.
- **Importação em Massa:** Carga de dados via arquivos `.csv`, `.xlsx` e `.xls` com tabela de pré-visualização antes da confirmação.
- **Configurações e Auditoria:** Gestão de usuários, permissões de acesso por grupo, regras de negócio globais e histórico detalhado de logs do sistema.
- **Ajuda e Suporte:** Painel para recebimento e acompanhamento de chamados internos.

### Perfil Colaborador
- **Área do Colaborador:** Painel simplificado para consulta individual de certificações vigentes, materiais de estudo pendentes e EPIs sob posse.
- **Ajuda e Suporte:** Canal direto para abertura de chamados e dúvidas operacionais.

---

## Estrutura de Pastas Principais

```text
src/
├── app/
│   ├── componentes/          # Componentes globais (ex: Toast)
│   ├── layout-padrao/        # Shell da aplicação (Header/Sidebar)
│   ├── service/              # Serviços de negócio, auth e auditoria
│   ├── tela-ajuda-suporte/   # Suporte perfil Admin
│   ├── tela-ajuda-suporte-colaborador/ # Suporte perfil Colaborador
│   ├── tela-area-colaborador/# Dashboard perfil Colaborador
│   ├── tela-cadastramentos/  # Formulários de cadastro
│   ├── tela-colaboradores/   # Tabela e gestão de colaboradores
│   ├── tela-configuracoes/   # Matriz de acesso e logs
│   ├── tela-dashboard/       # Indicadores gerais
│   ├── tela-epis/            # Estoque e entregas de EPIs
│   ├── tela-importacao-massa/# Leitor de planilhas CSV/XLSX
│   ├── tela-login/           # Autenticação de usuários
│   ├── tela-matriz-treinamento/ # Controle de NRs
│   ├── tela-recuperar-senha/ # Fluxo de recuperação de conta
│   ├── app.routes.ts         # Mapeamento de rotas e rotas filhas
│   └── auth.guard.ts         # Proteção de rotas autenticadas
└── styles.scss               # Tokens globais, CSS Reset e utilitários
```

---

## Como Executar o Projeto

### Pré-requisitos
- **Node.js 24** (no mínimo 24.15.0) e npm, compatíveis com o Angular deste repositório.
- Não é necessário Angular CLI global: usar os scripts locais abaixo.
- Java 17 e MySQL para o backend: seguir [backend/README.md](backend/README.md), criar seu banco local e configurar suas próprias credenciais.

### Passo a Passo

1. Instale as dependências da aplicação:
   ```bash
   npm ci
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm start
   ```

3. Acesse a aplicação navegando para `http://localhost:4200/`

---

## Credenciais de Teste

| Perfil | Usuário | Senha | Rota Inicial |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `123456` | `/dashboard` |
| **Colaborador** | `colaborador` | `123456` | `/area-colaborador` |