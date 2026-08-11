import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface SupportRequest {
  type: string;
  description: string;
  user: string;
  status: string;
}

@Component({
  selector: 'app-ajuda-suporte-colaborador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ajuda-suporte-colaborador.html',
  styleUrl: './ajuda-suporte-colaborador.scss'
})
export class HelpSupportComponent {
  currentUser: string = 'João da Silva';
  ticketType: string = 'Solicitar Ajuda';
  ticketDescription: string = '';

  requests: SupportRequest[] = [
    {
      type: 'Ajuda',
      description: 'Dúvida sobre renovação de NR-10',
      user: 'João da Silva',
      status: 'Em andamento'
    }
  ];

  handleSubmit(): void {
    if (!this.ticketDescription.trim()) return;

    const newRequest: SupportRequest = {
      type: this.ticketType,
      description: this.ticketDescription.trim(),
      user: this.currentUser,
      status: 'Em andamento'
    };

    this.requests.unshift(newRequest);
    this.ticketDescription = '';
  }
}