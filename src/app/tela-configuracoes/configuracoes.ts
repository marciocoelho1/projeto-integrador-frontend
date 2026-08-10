import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

// 1. ROTAS UNIFICADAS: Tudo aponta para o módulo de "Cadastramentos"
const ROTAS_SISTEMA = {
  novoUsuario: '/cadastramentos/novo-usuario',
  detalhesUsuario: (id: string) => `/cadastramentos/usuario/${id}`,
  editarUsuario: (id: string) => `/cadastramentos/editar-usuario/${id}`,
  resetarSenha: (id: string) => `/cadastramentos/usuario/${id}/senha`,
  matrizAcesso: (id: string) => `/cadastramentos/usuario/${id}/acessos`,
} as const;

// 2. NOMENCLATURA: Alterado de "Conta" para "Usuario"
type StatusUsuario = 'ativo' | 'inativo';

interface UsuarioSst {
  id: string;
  nomeCompleto: string;
  emailCorporativo: string;
  cpf: string;
  grupoId: string;
  status: StatusUsuario;
}

type ChaveModulo = 'sgst_dashboard' | 'sgst_colaboradores' | 'sgst_epis' | 'sgst_treinamentos' | 'sgst_relatorios' | 'sgst_config';

interface ModuloSistema {
  chave: ChaveModulo;
  titulo: string;
  detalhe: string;
}

interface GrupoAcesso {
  id: string;
  nomenclatura: string;
  finalidade: string;
  modulosLiberados: ChaveModulo[];
}

interface RegraAlerta {
  codigo: 'estoqueEpi' | 'vencimentoEpi' | 'treinamentoVencido';
  nomeRegra: string;
  descricaoRegra: string;
  isAtiva: boolean;
}

// 3. ABA ATUALIZADA: 'contas' virou 'usuarios'
type GuiaConfiguracao = 'usuarios' | 'grupos' | 'matriz' | 'globais';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Configuracoes {
  private readonly router = inject(Router);
  protected readonly rotas = ROTAS_SISTEMA;

  protected readonly guiasNavegacao: { id: GuiaConfiguracao; titulo: string }[] = [
    { id: 'usuarios', titulo: 'Usuários do Sistema' }, // Título visual ajustado
    { id: 'grupos', titulo: 'Grupos de Usuários' },
    { id: 'matriz', titulo: 'Matriz de Acessos' },
    { id: 'globais', titulo: 'Configurações Globais' },
  ];

  protected readonly guiaAtual = signal<GuiaConfiguracao>('usuarios');

  protected readonly modulosDisponiveis: ModuloSistema[] = [
    { chave: 'sgst_dashboard', titulo: 'Dashboard SST', detalhe: 'Visão geral e indicadores de saúde e segurança.' },
    { chave: 'sgst_colaboradores', titulo: 'Gestão de Colaboradores', detalhe: 'Acesso à lista e prontuários dos funcionários.' },
    { chave: 'sgst_epis', titulo: 'Controle de EPIs', detalhe: 'Entrega, devolução e gestão de estoque de EPIs.' },
    { chave: 'sgst_treinamentos', titulo: 'Matriz de Treinamentos', detalhe: 'Controle de NRs e capacitações.' },
    { chave: 'sgst_relatorios', titulo: 'Relatórios Gerenciais', detalhe: 'Extração de dados e auditorias.' },
    { chave: 'sgst_config', titulo: 'Administração do Sistema', detalhe: 'Controle total de parâmetros e acessos.' },
  ];

  protected readonly gruposSst = signal<GrupoAcesso[]>([
    {
      id: 'admin_tst',
      nomenclatura: 'Administrador TST',
      finalidade: 'Acesso irrestrito para Técnicos e Engenheiros de Segurança.',
      modulosLiberados: ['sgst_dashboard', 'sgst_colaboradores', 'sgst_epis', 'sgst_treinamentos', 'sgst_relatorios', 'sgst_config'],
    },
    {
      id: 'colaborador',
      nomenclatura: 'Colaborador',
      finalidade: 'Foco exclusivo na entrega e estoque de equipamentos.',
      modulosLiberados: ['sgst_dashboard', 'sgst_epis', 'sgst_relatorios'],
    },
  ]);

  // 4. DADOS UNIFICADOS: Variáveis refatoradas
  protected readonly usuariosCadastrados = signal<UsuarioSst[]>([
    {
      id: 'c1',
      nomeCompleto: 'Clara Aragão',
      emailCorporativo: 'clara.aragao@essenza.com.br',
      cpf: '123.456.789-00',
      grupoId: 'admin_tst',
      status: 'ativo',
    },
    {
      id: 'c2',
      nomeCompleto: 'Simão Ngombo',
      emailCorporativo: 'simao.n@essenza.com.br',
      cpf: '111.222.333-44',
      grupoId: 'admin_tst',
      status: 'ativo',
    },
    {
      id: 'c3',
      nomeCompleto: 'Marcio Coelho',
      emailCorporativo: 'marcio.c@essenza.com.br',
      cpf: '999.888.777-66',
      grupoId: 'colaborador',
      status: 'inativo',
    },
  ]);

  protected readonly termoBusca = signal('');

  protected readonly usuariosFiltrados = computed(() => {
    const termo = this.termoBusca().trim().toLowerCase();
    if (!termo) return this.usuariosCadastrados();
    
    return this.usuariosCadastrados().filter((usuario) => {
      const nome = usuario.nomeCompleto.toLowerCase();
      const cpfMatricula = usuario.cpf.toLowerCase();
      const status = usuario.status.toLowerCase();
      const grupoNome = this.getNomeGrupo(usuario.grupoId).toLowerCase();

      return(
        nome.includes(termo) ||
        cpfMatricula.includes(termo) ||
        status.includes(termo) ||
        grupoNome.includes(termo) 
      );
    });
  });

  protected readonly grupoSelecionadoId = signal<string>('admin_tst');

  protected readonly grupoEmEdicao = computed(
    () => this.gruposSst().find((g) => g.id === this.grupoSelecionadoId()) ?? this.gruposSst()[0]
  );

  protected readonly regrasAlertas = signal<RegraAlerta[]>([
    { codigo: 'estoqueEpi', nomeRegra: 'Ruptura de Estoque (EPI)', descricaoRegra: 'Notificar quando luvas, botas, etc., atingirem estoque mínimo.', isAtiva: true },
    { codigo: 'vencimentoEpi', nomeRegra: 'Validade de CA', descricaoRegra: 'Aviso de vencimento do Certificado de Aprovação (30 dias).', isAtiva: true },
    { codigo: 'treinamentoVencido', nomeRegra: 'Reciclagem de NRs', descricaoRegra: 'Aviso sobre vencimento de NR-35, NR-10, etc.', isAtiva: false },
  ]);

  protected navegarGuia(guia: GuiaConfiguracao): void {
    this.guiaAtual.set(guia);
  }

  protected getNomeGrupo(grupoId: string): string {
    return this.gruposSst().find((g) => g.id === grupoId)?.nomenclatura || 'Indefinido';
  }

  protected irParaMatrizDoGrupo(grupoId: string): void {
    this.grupoSelecionadoId.set(grupoId);
    this.guiaAtual.set('matriz');
  }

  protected alternarAcessoModulo(chave: ChaveModulo): void {
    this.gruposSst.update((lista) =>
      lista.map((grupo) => {
        if (grupo.id !== this.grupoSelecionadoId()) return grupo;
        
        const possui = grupo.modulosLiberados.includes(chave);
        const modulosLiberados = possui
          ? grupo.modulosLiberados.filter((c) => c !== chave)
          : [...grupo.modulosLiberados, chave];
          
        return { ...grupo, modulosLiberados };
      })
    );
  }

  protected alternarRegra(codigo: RegraAlerta['codigo']): void {
    this.regrasAlertas.update((lista) =>
      lista.map((regra) =>
        regra.codigo === codigo ? { ...regra, isAtiva: !regra.isAtiva } : regra
      )
    );
  }

  protected gravarAlteracoesGlobais(): void {
    console.log('Salvando preferências SST...', this.regrasAlertas());
  }

  // 5. MÉTODOS DE AÇÃO: Atualizados para "Usuario"
  actionNovoUsuario(): void {
    console.log('Botão Novo Usuário clicado! Redirecionando...');
    this.router.navigate(['/cadastramentos'], { queryParams: { aba: 'colaborador' } });
  }

  protected actionEditarUsuario(usuario: UsuarioSst): void { 
    this.router.navigateByUrl(this.rotas.editarUsuario(usuario.id)); }
}