import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-padrao',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout-padrao.html',
  styleUrls: ['./layout-padrao.scss'],
})
export class LayoutPadrao {
  private readonly router = inject(Router);

  // Lógica do menu transferida para o layout
  protected readonly menuLateral = [
    { label: 'Dashboard', rota: '/dashboard' },
    { label: 'Colaboradores', rota: '/colaboradores' },
    { label: 'Matriz de Treinamentos', rota: '/treinamentos' },
    { label: 'EPIs', rota: '/epis' },
    { label: 'Cadastros', rota: '/cadastros' },
    { label: 'Ajuda e Suporte', rota: '/ajuda' },
    { label: 'Configurações', rota: '/configuracoes' },
  ];
  
  protected readonly rotaAtual = '/configuracoes';

  protected navegarMenuGlobal(rota: string): void {
    console.log('Navegando para:', rota);
    // this.router.navigate([rota]);
  }

  protected actionSair(): void { 
    console.log('Fazendo logout...'); 
  }
}