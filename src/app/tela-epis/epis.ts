import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Epi {
  id: string;
  descricao: string;
  quantidade: number;
  inclusao: string;
  validade: string;
  ca: string;
}

interface EntregaEpi {
  colaborador: string;
  epi: string;
  data: string;
  assinatura: string;
}

@Component({
  selector: 'app-epis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './epis.html',
  styleUrls: ['./epis.scss']
})
export class Epis {
  private router = inject(Router);
  termoBusca: string = '';

  // Mock de dados da tabela de EPIs (Baseado no wireframe)
  epis: Epi[] = [
    { id: 'EPI-01', descricao: 'Capacete de Segurança', quantidade: 45, inclusao: '01/02/2026', validade: '03/02/2028', ca: '12345' },
    { id: 'EPI-02', descricao: 'Luva de Vaqueta', quantidade: 84, inclusao: '03/02/2026', validade: '03/02/2028', ca: '89765' },
    { id: 'EPI-03', descricao: 'Óculos de Segurança', quantidade: 100, inclusao: '03/02/2026', validade: '03/02/2028', ca: '23456' },
    { id: 'EPI-04', descricao: 'Protetor Auricular', quantidade: 200, inclusao: '03/02/2026', validade: '03/02/2028', ca: '14752' },
    { id: 'EPI-05', descricao: 'Roupa Térmica', quantidade: 30, inclusao: '03/02/2026', validade: '03/02/2028', ca: '36579' }
  ];

  // Mock de dados da tabela de Entregas Registradas
  entregas: EntregaEpi[] = [
    { colaborador: 'João Souza', epi: 'Capacete de Segurança', data: '01/06/2026', assinatura: 'João Souza' },
    { colaborador: 'Maria José', epi: 'Óculos de Segurança', data: '01/06/2026', assinatura: 'Maria José' }
  ];

  get episFiltrados(): Epi[] {
    if (!this.termoBusca) return this.epis;
    const termo = this.termoBusca.toLowerCase();
    return this.epis.filter(e => 
      e.descricao.toLowerCase().includes(termo) || 
      e.id.toLowerCase().includes(termo) ||
      e.ca.includes(termo)
    );
  }

  actionNovoEPI(): void {
    this.router.navigate(['/cadastramentos'], { queryParams: { aba: 'epi' } });
  }
}