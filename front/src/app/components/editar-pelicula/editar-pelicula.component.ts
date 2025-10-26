import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-pelicula.component.html',
  styles: ''
})
export class EditarPeliculaComponent implements OnInit, OnDestroy {
  pelicula = {
    id: 0,
    nombre: '',
    sinopsis: '',
    anio: new Date().getFullYear(),
    imagen: ''
  };

  isLoading: boolean = true;
  isSaving: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovieData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMovieData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id || isNaN(+id)) {
      this.errorMessage = 'ID de película no válido';
      this.isLoading = false;
      return;
    }

    const sub = this.movieService.getMovie(+id).subscribe({
      next: (data) => {
        this.pelicula = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.status === 404 
          ? 'Película no encontrada' 
          : 'Error al cargar los datos de la película';
      }
    });

    this.subscriptions.add(sub);
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    const sub = this.movieService.updateMovie(this.pelicula.id, this.pelicula).subscribe({
      next: (response) => {
        this.isSaving = false;
        this.successMessage = 'Película actualizada exitosamente';
        
        setTimeout(() => {
          this.router.navigate(['/pelicula', this.pelicula.id]);
        }, 1500);
      },
      error: (error) => {
        this.isSaving = false;
        this.handleError(error);
      }
    });

    this.subscriptions.add(sub);
  }

  private isFormValid(): boolean {
    if (this.pelicula.anio < 1900 || this.pelicula.anio > new Date().getFullYear() + 5) {
      this.errorMessage = `El año debe estar entre 1900 y ${new Date().getFullYear() + 5}`;
      return false;
    }

    if (!this.isValidUrl(this.pelicula.imagen)) {
      this.errorMessage = 'Por favor ingresa una URL válida para la imagen';
      return false;
    }

    if (this.pelicula.nombre.trim().length < 2) {
      this.errorMessage = 'El nombre debe tener al menos 2 caracteres';
      return false;
    }

    if (this.pelicula.sinopsis.trim().length < 10) {
      this.errorMessage = 'La sinopsis debe tener al menos 10 caracteres';
      return false;
    }

    return true;
  }

  private isValidUrl(url: string): boolean {
    try {
      const newUrl = new URL(url);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }

  private handleError(error: any): void {
    if (error.error?.errors) {
      const errors = error.error.errors;
      this.errorMessage = Object.values(errors)[0] as string || 'Error al actualizar la película';
    } else {
      this.errorMessage = error.error?.message || 'Error al actualizar la película';
    }
  }

  onCancel(): void {
    this.router.navigate(['/pelicula', this.pelicula.id]);
  }

  get imagePreview(): string {
    return this.pelicula.imagen || 'https://via.placeholder.com/300x450?text=Imagen+no+disponible';
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}