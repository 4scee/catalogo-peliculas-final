import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-agregar-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-pelicula.component.html',
  styles: ''
})
export class AgregarPeliculaComponent {
  pelicula = {
    nombre: '',
    sinopsis: '',
    anio: new Date().getFullYear(),
    imagen: ''
  };

  // Variables para usar en la plantilla
  currentYear: number = new Date().getFullYear();
  maxYear: number = this.currentYear + 5;

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private movieService: MovieService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validación adicional (usa this.maxYear)
    if (this.pelicula.anio < 1900 || this.pelicula.anio > this.maxYear) {
      this.errorMessage = `El año debe ser válido (entre 1900 y ${this.maxYear})`;
      this.isLoading = false;
      return;
    }

    if (!this.isValidUrl(this.pelicula.imagen)) {
      this.errorMessage = 'Por favor ingresa una URL válida para la imagen';
      this.isLoading = false;
      return;
    }

    this.movieService.createMovie(this.pelicula).subscribe({
      next: (response) => {
        this.successMessage = 'Película agregada exitosamente';
        this.isLoading = false;
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/catalogo']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error && error.error.errors) {
          const errors = error.error.errors;
          if (errors.nombre) {
            this.errorMessage = errors.nombre[0];
          } else if (errors.sinopsis) {
            this.errorMessage = errors.sinopsis[0];
          } else if (errors.anio) {
            this.errorMessage = errors.anio[0];
          } else if (errors.imagen) {
            this.errorMessage = errors.imagen[0];
          } else {
            this.errorMessage = 'Error al agregar la película';
          }
        } else {
          this.errorMessage = error.error?.message || 'Error al agregar la película';
        }
      }
    });
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/catalogo']);
  }

  // Vista previa de la imagen
  get imagePreview(): string {
    return this.pelicula.imagen || 'https://via.placeholder.com/300x450?text=Imagen+de+la+Película';
  }
}