import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CardResumo {
  titulo: string;
  total: number;
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
  treinamento: string;
  certificacao: string;
  validade: string;
  status?: string;
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

  resumos: CardResumo[] = [
    { titulo: 'LNT / Cargos', total: 68, icone: '📋' },
    { titulo: 'Treinamentos', total: 68, icone: '🎓' },
    { titulo: 'Certificações', total: 68, icone: '🏅' },
    { titulo: 'Reciclagens', total: 68, icone: '🔄' }
  ];

  treinamentos: Treinamento[] = [
    { nome: 'NR-35 Trabalho em Altura', classificacao: 'Obrigatório', nr: 'NR-35', cargaHoraria: '8h', status: 'Ativo' },
    { nome: 'NR-10 Segurança em Eletricidade', classificacao: 'Obrigatório', nr: 'NR-10', cargaHoraria: '40h', status: 'Ativo' },
    { nome: 'Noções de Primeiros Socorros', classificacao: 'Recomendado', nr: '-', cargaHoraria: '4h', status: 'Inativo' }
  ];

  certificacoes: CertificacaoColaborador[] = [
    { colaborador: 'Sonia Maria', treinamento: 'NR-35 Trabalho em Altura', certificacao: '28/05/2024', validade: '27/05/2026', status: 'Vencida' },
    { colaborador: 'Genivaldo Francisco', treinamento: 'NR-10 Segurança em Eletricidade', certificacao: '02/06/2024', validade: '01/06/2026', status: 'Vencida' },
    { colaborador: 'Roberto Carlos', treinamento: 'Noções de Primeiros Socorros', certificacao: '12/11/2023', validade: '11/11/2025' }
  ];

  actionNovoTreinamento(): void {
    this.router.navigate(['/cadastramentos'], { queryParams: { aba: 'treinamento' } });
  }

}