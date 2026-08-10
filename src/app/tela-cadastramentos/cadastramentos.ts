import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastramentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastramentos.html',
  styleUrls: ['./cadastramentos.scss']
})
export class Cadastramentos implements OnInit {

  private route = inject(ActivatedRoute);
  
  // Define qual aba começa ativa quando a página carrega
  abaAtual: 'colaborador' | 'treinamento' | 'epi' = 'colaborador';

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      if (params['aba']) {
        this.abaAtual = params['aba'] as 'colaborador' | 'treinamento' | 'epi';
      }
    });
  }

  salvarColaborador() {
    console.log('Colaborador salvo!');
    // Integração com serviço backend entrará aqui
  }

  salvarTreinamento() {
    console.log('Treinamento salvo!');
  }

  salvarEPI() {
    console.log('EPI salvo!');
  }
}