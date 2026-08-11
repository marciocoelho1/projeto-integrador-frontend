import { Routes } from '@angular/router';
import { Login } from './tela-login/login';
import { RecuperarSenhaComponent } from './tela-recuperar-senha/recuperar-senha';
import { HelpSupportComponent } from './tela-ajuda-suporte-colaborador/ajuda-suporte-colaborador';
import { Configuracoes } from './tela-configuracoes/configuracoes';
import { LayoutPadrao } from './layout-padrao/layout-padrao';
import { Colaboradores } from './tela-colaboradores/colaboradores';
import { Epis } from './tela-epis/epis'; 
import { Cadastramentos } from './tela-cadastramentos/cadastramentos'; 
import { Dashboard } from './tela-dashboard/dashboard';
import { MatrizTreinamentos } from './tela-matriz-treinamento/matriz-treinamento';
import { AjudaSuporte } from './tela-ajuda-suporte/ajuda-suporte';
import { authGuard } from './auth.guard'; // <--- Importação do guarda de rotas

export const routes: Routes = [
  // Rotas públicas (acessíveis sem login)
  { path: 'login', component: Login },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'ajuda-suporte-colaborador', component: HelpSupportComponent },

  // Rotas protegidas (exigem autenticação)
  {
    path: '',
    component: LayoutPadrao,
    canActivate: [authGuard], // <--- Bloqueia o acesso sem estar logado
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'colaboradores', component: Colaboradores },
      { path: 'epis', component: Epis },
      { path: 'matriz-treinamentos', component: MatrizTreinamentos },
      { path: 'cadastramentos', component: Cadastramentos },
      { path: 'ajuda-suporte', component: AjudaSuporte },
      { path: 'configuracoes', component: Configuracoes },
    ]
  },

  // Redirecionamentos de segurança
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];