import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styles: ''
})
export class RegisterComponent {
  user = {
    nombre: '',
    email: '',
    password: '',
    password_confirmation: '',
    imagen_perfil: ''
  };
  
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        if (error.error && error.error.errors) {
          // Manejar errores de validación del backend
          const errors = error.error.errors;
          if (errors.email) {
            this.errorMessage = errors.email[0];
          } else if (errors.password) {
            this.errorMessage = errors.password[0];
          } else if (errors.nombre) {
            this.errorMessage = errors.nombre[0];
          } else {
            this.errorMessage = 'Error en el registro';
          }
        } else {
          this.errorMessage = error.error?.message || 'Error en el registro';
        }
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertir la imagen a base64 para enviarla al backend
        this.user.imagen_perfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}