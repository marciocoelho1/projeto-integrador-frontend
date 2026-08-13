import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CardResumo {
  titulo: string;
  total?: number | string;
  icone: string;
}

interface Treinamento {
  nome: string;
  classificacao: string;
  nr: string;
  cargaHoraria: string;
  status: 'Ativo' | 'Inativo';
}

interface CertificacaoColaborador {
  colaborador: string;
  cargo: string;
  treinamento: string;
  certificacao: string;
  validade: string;
  status?: 'Ativa' | 'Vencida' | 'Alerta';
}

interface CargoLnt {
  cargo: string;
  setor: string;
  treinamentosObrigatorios: string;
  status: string;
}

interface ReciclagemItem {
  colaborador: string;
  cargo: string;
  treinamento: string;
  prazoMaximo: string;
  status: string;
}

interface MatrizCruzadaItem {
  colaborador: string;
  cargo: string;
  nr06: 'OK' | 'Alerta' | 'Vencido' | 'N/A';
  nr11: 'OK' | 'Alerta' | 'Vencido' | 'N/A';
  nr12: 'OK' | 'Alerta' | 'Vencido' | 'N/A';
  nr17: 'OK' | 'Alerta' | 'Vencido' | 'N/A';
  nr35: 'OK' | 'Alerta' | 'Vencido' | 'N/A';
}

@Component({
  selector: 'app-matriz-treinamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriz-treinamento.html',
  styleUrl: './matriz-treinamento.scss'
})
export class MatrizTreinamentos {
  private router = inject(Router);

  cardSelecionado: string = 'Visão Geral';

  resumos: CardResumo[] = [
    { titulo: 'Visão Geral', icone: '📊' },
    { titulo: 'LNT / Cargos', total: 14, icone: '📋' },
    { titulo: 'Treinamentos', total: 8, icone: '🎓' },
    { titulo: 'Certificações', total: 45, icone: '🏅' },
    { titulo: 'Reciclagens', total: 7, icone: '🔄' }
  ];

  treinamentos: Treinamento[] = [
    { nome: 'NR-06 Uso Adequado e Guarda de EPIs', classificacao: 'Obrigatório', nr: 'NR-06', cargaHoraria: '4h', status: 'Ativo' },
    { nome: 'NR-11 Operação Segura de Empilhadeira e Transpaleteira', classificacao: 'Específico', nr: 'NR-11', cargaHoraria: '16h', status: 'Ativo' },
    { nome: 'NR-12 Segurança em Máquinas (Fatiadores/Serras de Fita)', classificacao: 'Obrigatório', nr: 'NR-12', cargaHoraria: '8h', status: 'Ativo' },
    { nome: 'NR-17 Ergonomia para Operadores de Checkout', classificacao: 'Obrigatório', nr: 'NR-17', cargaHoraria: '4h', status: 'Ativo' },
    { nome: 'NR-35 Trabalho em Altura e Manutenção de Gôndolas', classificacao: 'Específico', nr: 'NR-35', cargaHoraria: '8h', status: 'Ativo' },
    { nome: 'NR-23 e Brigada de Incêndio e Evacuação', classificacao: 'Obrigatório', nr: 'NR-23', cargaHoraria: '8h', status: 'Ativo' },
    { nome: 'Boas Práticas de Manipulação de Alimentos', classificacao: 'Setorial', nr: 'RDC 216', cargaHoraria: '6h', status: 'Ativo' },
    { nome: 'Noções de Primeiros Socorros no Varejo', classificacao: 'Recomendado', nr: 'Geral', cargaHoraria: '4h', status: 'Ativo' }
  ];

  certificacoes: CertificacaoColaborador[] = [
    { colaborador: 'Carlos Eduardo Silva', cargo: 'Operador de Empilhadeira', treinamento: 'NR-11 Operação Segura de Empilhadeira', certificacao: '15/01/2025', validade: '14/01/2027', status: 'Ativa' },
    { colaborador: 'Maria Joana Oliveira', cargo: 'Açougueira', treinamento: 'NR-12 Segurança em Máquinas (Açougue)', certificacao: '10/02/2024', validade: '09/02/2026', status: 'Vencida' },
    { colaborador: 'Roberto Alves', cargo: 'Operador de Caixa', treinamento: 'NR-17 Ergonomia para Checkout', certificacao: '05/08/2025', validade: '04/08/2027', status: 'Ativa' },
    { colaborador: 'Ana Paula Souza', cargo: 'Repositora', treinamento: 'NR-35 Trabalho em Altura', certificacao: '20/03/2024', validade: '19/03/2026', status: 'Alerta' },
    { colaborador: 'Fernando Costa', cargo: 'Padeiro', treinamento: 'NR-12 Segurança em Máquinas (Padaria)', certificacao: '11/11/2024', validade: '10/11/2026', status: 'Ativa' },
    { colaborador: 'Juliana Mendes', cargo: 'Operadora de Caixa', treinamento: 'NR-06 Uso Adequado de EPIs', certificacao: '01/09/2025', validade: '31/08/2026', status: 'Ativa' }
  ];

  cargosLnt: CargoLnt[] = [
    { cargo: 'Açougueiro', setor: 'Açougue', treinamentosObrigatorios: 'NR-06, NR-12, Boas Práticas', status: 'Ativo' },
    { cargo: 'Operador de Caixa', setor: 'Frente de Loja', treinamentosObrigatorios: 'NR-06, NR-17', status: 'Ativo' },
    { cargo: 'Repositor', setor: 'Mercearia', treinamentosObrigatorios: 'NR-06, NR-11 (Manual), NR-35', status: 'Ativo' },
    { cargo: 'Padeiro / Confeiteiro', setor: 'Padaria', treinamentosObrigatorios: 'NR-06, NR-12, Boas Práticas', status: 'Ativo' },
    { cargo: 'Operador de Empilhadeira', setor: 'Estoque / Logística', treinamentosObrigatorios: 'NR-06, NR-11', status: 'Ativo' },
    { cargo: 'Fiscal de Prevenção de Perdas', setor: 'Frente de Loja', treinamentosObrigatorios: 'NR-06, Brigada de Incêndio', status: 'Ativo' },
    { cargo: 'Auxiliar de Limpeza', setor: 'Higienização', treinamentosObrigatorios: 'NR-06 (Químicos), Boas Práticas', status: 'Ativo' }
  ];

  reciclagens: ReciclagemItem[] = [
    { colaborador: 'Maria Joana Oliveira', cargo: 'Açougueira', treinamento: 'NR-12 Segurança em Máquinas', prazoMaximo: '28/02/2026', status: 'Vencido' },
    { colaborador: 'Ana Paula Souza', cargo: 'Repositora', treinamento: 'NR-35 Trabalho em Altura', prazoMaximo: '19/03/2026', status: 'Próximo do Vencimento' },
    { colaborador: 'Lucas Fontes', cargo: 'Operador de Empilhadeira', treinamento: 'NR-11 Operação de Empilhadeira', prazoMaximo: '05/04/2026', status: 'Pendente' },
    { colaborador: 'Carlos Eduardo Silva', cargo: 'Operador de Empilhadeira', treinamento: 'NR-06 Uso Adequado de EPIs', prazoMaximo: '15/04/2026', status: 'Agendado' },
    { colaborador: 'Fernando Costa', cargo: 'Padeiro', treinamento: 'Boas Práticas de Manipulação', prazoMaximo: '30/04/2026', status: 'Pendente' }
  ];

  matrizCruzada: MatrizCruzadaItem[] = [
    { colaborador: 'Carlos Eduardo Silva', cargo: 'Operador de Empilhadeira', nr06: 'OK', nr11: 'OK', nr12: 'N/A', nr17: 'N/A', nr35: 'N/A' },
    { colaborador: 'Maria Joana Oliveira', cargo: 'Açougueira', nr06: 'OK', nr11: 'N/A', nr12: 'Vencido', nr17: 'N/A', nr35: 'N/A' },
    { colaborador: 'Roberto Alves', cargo: 'Operador de Caixa', nr06: 'OK', nr11: 'N/A', nr12: 'N/A', nr17: 'OK', nr35: 'N/A' },
    { colaborador: 'Ana Paula Souza', cargo: 'Repositora', nr06: 'OK', nr11: 'N/A', nr12: 'N/A', nr17: 'N/A', nr35: 'Alerta' },
    { colaborador: 'Fernando Costa', cargo: 'Padeiro', nr06: 'OK', nr11: 'N/A', nr12: 'OK', nr17: 'N/A', nr35: 'N/A' },
    { colaborador: 'Lucas Fontes', cargo: 'Operador de Empilhadeira', nr06: 'OK', nr11: 'Alerta', nr12: 'N/A', nr17: 'N/A', nr35: 'N/A' },
    { colaborador: 'Juliana Mendes', cargo: 'Operadora de Caixa', nr06: 'OK', nr11: 'N/A', nr12: 'N/A', nr17: 'OK', nr35: 'N/A' }
  ];

  selecionarCard(card: string): void {
    this.cardSelecionado = card;
  }

  navegarParaCadastro(): void {
    const mapaAbas: Record<string, string> = {
      'LNT / Cargos': 'lnt',
      'Treinamentos': 'treinamento',
      'Certificações': 'certificacao',
      'Reciclagens': 'reciclagem'
    };
    const aba = mapaAbas[this.cardSelecionado] || 'treinamento';
    this.router.navigate(['/cadastramentos'], { queryParams: { aba } });
  }

  exportarMatriz(): void {
    const linhas = [
      'Colaborador,Cargo,NR-06,NR-11,NR-12,NR-17,NR-35',
      ...this.matrizCruzada.map(m => `"${m.colaborador}","${m.cargo}","${m.nr06}","${m.nr11}","${m.nr12}","${m.nr17}","${m.nr35}"`)
    ];
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `matriz-conformidade-treinamentos-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
