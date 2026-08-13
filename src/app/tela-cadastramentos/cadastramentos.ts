import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { AuditService } from '../service/audit.service';

@Component({
  selector: 'app-cadastramentos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastramentos.html',
  styleUrls: ['./cadastramentos.scss']
})
export class Cadastramentos implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  private auditService = inject(AuditService); 
  
  
  abaAtual: 'colaborador' | 'treinamento' | 'epi' | 'lnt' | 'certificacao' | 'reciclagem' = 'colaborador';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['aba']) {
        this.abaAtual = params['aba'] as 'colaborador' | 'treinamento' | 'epi' | 'lnt' | 'certificacao' | 'reciclagem';
      }
    });
  }

  salvarColaborador() {
    console.log('Colaborador salvo!');
    this.toast.success('Colaborador cadastrado com sucesso!');
    
    this.auditService.registrarAcao('Marcio Coelho', 'Cadastramentos', 'CRIACAO', 'Cadastrou novo colaborador');
  }

  salvarTreinamento() {
    console.log('Treinamento salvo!');
    this.toast.success('Novo Treinamento adicionado com sucesso!');
    
    this.auditService.registrarAcao('Marcio Coelho', 'Cadastramentos', 'CRIACAO', 'Cadastrou novo treinamento');
  }

  salvarEPI() {
    console.log('EPI salvo!');
    this.toast.success('Novo EPI adicionado com sucesso!');
    
    this.auditService.registrarAcao('Marcio Coelho', 'Cadastramentos', 'CRIACAO', 'Cadastrou novo EPI no estoque');
  }

  salvarLnt() {
    console.log('LNT / Cargo salvo!');
    this.toast.success('Novo LNT / Cargo salvo com sucesso!');
    this.auditService.registrarAcao('Marcio Coelho', 'Cadastramentos', 'CRIACAO', 'Cadastrou novo LNT / Cargo');
  }

  salvarCertificacao() {
    console.log('Certificação salva!');
    this.toast.success('Nova Certificação cadastrada com sucesso!');
    this.auditService.registrarAcao('Marcio Coelho', 'Cadastramentos', 'CRIACAO', 'Cadastrou nova certificação');
  }

  salvarReciclagem() {
    console.log('Reciclagem salva!');
    this.toast.success('Nova Reciclagem agendada com sucesso!');
    this.auditService.registrarAcao('Marcio Coelho', 'Cadastramentos', 'CRIACAO', 'Cadastrou nova reciclagem');
  }
}
