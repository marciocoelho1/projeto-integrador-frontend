import { Routes } from '@angular/router';
import { Login } from './tela-login/login';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login}
];
