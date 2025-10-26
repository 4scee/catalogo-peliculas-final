import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-pelicula.component.html',
  styles: ''
})
export class DetallePeliculaComponent implements OnInit {
  pelicula: any = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMovieDetails();
  }

  loadMovieDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.errorMessage = 'ID de película no válido';
      this.isLoading = false;
      return;
    }

    this.movieService.getMovie(+id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.checkOwnership();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 404) {
          this.errorMessage = 'Película no encontrada';
        } else {
          this.errorMessage = 'Error al cargar los detalles de la película';
        }
      }
    });
  }

  checkOwnership(): void {
    const currentUser = this.authService.getUser();
    if (currentUser && this.pelicula && this.pelicula.user) {
      this.isOwner = currentUser.id === this.pelicula.user.id;
    }
  }

  eliminarPelicula(): void {
    if (!confirm('¿Está seguro que desea eliminar esta película?')) {
      return;
    }

    this.movieService.deleteMovie(this.pelicula.id).subscribe({
      next: () => {
        this.router.navigate(['/catalogo']);
      },
      error: (error) => {
        alert('Error al eliminar la película');
        console.error('Error:', error);
      }
    });
  }

  editarPelicula(): void {
    this.router.navigate(['/editar-pelicula', this.pelicula.id]);
  }

  volverAlCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }

  getDefaultImage(): string {
    return 'https://via.placeholder.com/400x600?text=Imagen+no+disponible';
  }
}