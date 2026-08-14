import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../service/toast.service';

export interface SupportRequest {
  type: string;
  description: string;
  user: string;
  status: string;
}

@Component({
  selector: 'app-ajuda-suporte-colaborador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajuda-suporte-colaborador.html',
  styleUrls: ['./ajuda-suporte-colaborador.scss']
})
export class HelpSupportComponent {
  private toast = inject(ToastService);

  currentUser: string = 'Marcio Coelho Elias Junior';
  ticketType: string = 'Solicitar Ajuda';
  ticketDescription: string = '';

  requests: SupportRequest[] = [
    {
      type: 'Ajuda',
      description: 'Dúvida sobre renovação de NR-10',
      user: 'Marcio Coelho Elias Junior',
      status: 'Em andamento'
    }
  ];

  handleSubmit(): void {
    if (!this.ticketDescription.trim()) {
      this.toast.error('Preencha a descrição da solicitação.');
      return;
    }

    const newRequest: SupportRequest = {
      type: this.ticketType,
      description: this.ticketDescription.trim(),
      user: this.currentUser,
      status: 'Em andamento'
    };

    this.requests.unshift(newRequest);
    this.ticketDescription = '';
    this.toast.success('Solicitação enviada com sucesso!');
  }
}