import { Routes } from '@angular/router';
import { Login } from './tela-login/login';
import { Configuracoes } from './tela-configuracoes/configuracoes';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login},
    { path: 'configuracoes', component: Configuracoes }
];
