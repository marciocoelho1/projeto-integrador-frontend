import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  senha = '';
  erroLogin = false; // Variável para controlar a mensagem de erro na tela
  
  private router = inject(Router);

  entrar() {
    // Validação estática ("mockada")
    if (this.email === 'admin' && this.senha === '123456') {
      this.erroLogin = false;
      console.log('Login bem-sucedido! Redirecionando...');
      this.router.navigate(['/dashboard']);
    } else {
      this.erroLogin = true;
      console.error('Credenciais inválidas.');
    }
  }
}