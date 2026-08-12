import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGGED_KEY = 'usuario_logado';
  private readonly ROLE_KEY = 'usuario_perfil'; 

  
  setSession(perfil: string): void {
    localStorage.setItem(this.LOGGED_KEY, 'true');
    localStorage.setItem(this.ROLE_KEY, perfil);
  }

  logout(): void {
    localStorage.removeItem(this.LOGGED_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_KEY) === 'true';
  }

  
  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
}