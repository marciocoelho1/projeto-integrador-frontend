import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGGED_KEY = 'usuario_logado';

  // Salva a sessão do usuário
  setSession(): void {
    localStorage.setItem(this.LOGGED_KEY, 'true');
  }

  // Encerra a sessão
  logout(): void {
    localStorage.removeItem(this.LOGGED_KEY);
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_KEY) === 'true';
  }
}