# SGSST - Sistema de Gestão de Saúde e Segurança do Trabalho

Sistema web desenvolvido como Projeto Integrador para o curso do Senac, voltado ao gerenciamento dos processos de Segurança do Trabalho do Essenza Supermercados Ltda. 

A plataforma centraliza o controle do quadro de colaboradores, matriz de treinamentos, gestão de estoque e entrega de EPIs, além de fornecer visões analíticas via dashboard e controle de acesso por perfil de usuário.

---

## Tecnologias Utilizadas

- **Framework Web:** Angular (v22)
- **Linguagem:** TypeScript
- **Estilização:** SCSS (Design System proprietário com CSS Variables e BEM)
- **Gerenciamento de Estado:** Angular Signals (`signal`, `computed`)
- **Processamento de Arquivos:** SheetJS (`xlsx`) para leitura de planilhas CSV e Excel
- **Arquitetura:** Standalone Components e Novo Control Flow (`@if`, `@for`, `@switch`)

---

## Funcionalidades do Sistema

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
- **Node.js** (versão 18 ou superior)
- **Angular CLI** instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

### Passo a Passo

1. Instale as dependências da aplicação:
   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

3. Acesse a aplicação navegando para `http://localhost:4200/`

---

## Credenciais de Teste

| Perfil | Usuário | Senha | Rota Inicial |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `123456` | `/dashboard` |
| **Colaborador** | `colaborador` | `123456` | `/area-colaborador` |