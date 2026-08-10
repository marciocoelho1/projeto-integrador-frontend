import { Routes } from '@angular/router';
import { Login } from './tela-login/login';
import { Configuracoes } from './tela-configuracoes/configuracoes';
import { LayoutPadrao } from './layout-padrao/layout-padrao';
import { Colaboradores } from './tela-colaboradores/colaboradores';
import { Epis } from './tela-epis/epis'; 
import { Cadastramentos } from './tela-cadastramentos/cadastramentos'; 
import { Dashboard } from './tela-dashboard/dashboard';
import { MatrizTreinamentos } from './tela-matriz-treinamento/matriz-treinamento';
import { AjudaSuporte } from './tela-ajuda-suporte/ajuda-suporte';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: '',
    component: LayoutPadrao,
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

  { path: '**', redirectTo: 'dashboard' }
];