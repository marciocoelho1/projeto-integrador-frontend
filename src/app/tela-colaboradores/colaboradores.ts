import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Colaborador {
  matricula: string;
  nome: string;
  cargo: string;
  setor: string;
  status: 'Ativo' | 'Inativo' | 'Afastado';
}

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colaboradores.html',
  styleUrls: ['./colaboradores.scss']
})
export class Colaboradores implements OnInit {
  termoBusca: string = '';
  private router = inject(Router); 

  colaboradores: Colaborador[] = [
    { matricula: '123.456.789-00', nome: 'Carlos Eduardo Silva', cargo: 'Operador de Empilhadeira', setor: 'Estoque', status: 'Ativo' },
    { matricula: '111.222.333-44', nome: 'Maria Joana Oliveira', cargo: 'Açougueira', setor: 'Açougue', status: 'Ativo' },
    { matricula: '999.888.777-66', nome: 'Roberto Alves', cargo: 'Operador de Caixa', setor: 'Frente de Loja', status: 'Afastado' },
    { matricula: '444.555.666-77', nome: 'Ana Paula Souza', cargo: 'Repositora', setor: 'Mercearia', status: 'Ativo' },
    { matricula: '888.777.666-55', nome: 'Fernando Costa', cargo: 'Padeiro', setor: 'Padaria', status: 'Inativo' }
  ];

  constructor() {}

  ngOnInit(): void {}

  get colaboradoresFiltrados(): Colaborador[] {
    const termo = this.termoBusca.trim().toLowerCase();
    if (!termo) {
      return this.colaboradores;
    }

    return this.colaboradores.filter((c) => {
      const nome = c.nome.toLowerCase();
      const cpfMatricula = c.matricula.toLowerCase();
      const cargo = c.cargo.toLowerCase();
      const setor = c.setor.toLowerCase();
      const status = c.status.toLowerCase();

      return (
        nome.includes(termo) ||
        cpfMatricula.includes(termo) ||
        cargo.includes(termo) ||
        setor.includes(termo) ||
        status.includes(termo)
      );
    });
  }

  actionVerDetalhes(colaborador: Colaborador): void {
    console.log('Visualizando dados de:', colaborador.nome);
  }

  actionNovoColaborador(): void {
    console.log('Navegando para o cadastro de novo colaborador...');
    this.router.navigate(['/cadastramentos'], { queryParams: { aba: 'colaborador' } });
  }
}