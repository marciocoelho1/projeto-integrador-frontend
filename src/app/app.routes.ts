import { Routes } from '@angular/router';
import { Login } from './tela-login/login';
import { Configuracoes } from './tela-configuracoes/configuracoes';
import { LayoutPadrao } from './layout-padrao/layout-padrao';
import { Colaboradores } from './tela-colaboradores/colaboradores';

export const routes: Routes = [
    // localhost:4200 redireciona para tela de login
    {path: '', redirectTo: 'login', pathMatch: 'full'},

    // Rota de Login (sem layout padrão)
    {path : 'login', component: Login},

    // Rotas do Sistema (com Menu Lateral e Cabeçalho)
    {path: '', component: LayoutPadrao, children: [
        {path: 'colaboradores', component: Colaboradores},
        {path: 'configuracoes', component: Configuracoes}
    ]}
];