import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

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
  
  constructor(private authService: AuthService){}

  entrar(){
    this.authService.login({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (res) => {
        console.log('Resposta da API:', res);
        this.authService.salvarToken(res.access_token);
      },
      error: () => {
        console.log('Erro no login');
      }
    });
  }
}
