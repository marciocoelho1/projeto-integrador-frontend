import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout-padrao',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-padrao.html',
  styleUrl: './layout-padrao.scss'
})
export class LayoutPadrao {
  private authService = inject(AuthService);
  
  
  menuAberto = false;

  get userRole(): string {
    return (this.authService.getRole() || '').toLowerCase();
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}