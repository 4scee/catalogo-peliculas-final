import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styles: ''
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }
}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
        if (isPlatformBrowser(this.platformId)) {
          this.isLoggedIn = false;
          this.user = null;
        }
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}