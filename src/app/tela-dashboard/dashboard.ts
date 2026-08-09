import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  // Alertas exibidos no topo (Atenção Requerida)
  protected readonly alertas = [
    { tipo: 'EPI', mensagem: '12 Botinas de Segurança vencem esta semana.', criticidade: 'alta' },
    { tipo: 'Treinamento', mensagem: 'NR-35 pendente para 5 colaboradores da Logística.', criticidade: 'media' },
    { tipo: 'Certificação', mensagem: 'Renovação do PPRA concluída.', criticidade: 'baixa' }
  ];

  // Gráfico 1: Certificações
  protected readonly certificacoes = {
    ativas: 142,
    vencidas: 18
  };

  // Gráfico 2: EPIs
  protected readonly epis = {
    aEntregar: 25,
    emEstoque: 140,
    proximoVencimento: 12
  };

  // Gráfico 3: Reciclagens
  protected readonly reciclagens = {
    concluidas: 42,
    pendentes: 18,
    total: 60,
    porcentagem: 70
  };

  protected exportarRelatorio(): void {
    console.log('Exportando relatório do Dashboard...');
  }
}