import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service'; // <--- Importação do serviço de autenticação

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  senha = '';
  erroLogin = false;
  
  private router = inject(Router);
  private authService = inject(AuthService); // <--- Injeção do AuthService

  entrar() {
    if (this.email === 'admin' && this.senha === 'trabalho09') {
      this.erroLogin = false;
      this.authService.setSession(); // <--- Registra o login no localStorage
      console.log('Login bem-sucedido! Redirecionando...');
      this.router.navigate(['/dashboard']);
    } else {
      this.erroLogin = true;
      console.error('Credenciais inválidas.');
    }
  }

  irParaRecuperarSenha(event: Event) {
    event.preventDefault(); // Evita recarregar a página
    this.router.navigate(['/recuperar-senha']);
  }
}