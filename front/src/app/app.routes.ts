import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { DetallePeliculaComponent } from './components/detalle-pelicula/detalle-pelicula.component';
import { AgregarPeliculaComponent } from './components/agregar-pelicula/agregar-pelicula.component';
import { EditarPeliculaComponent } from './components/editar-pelicula/editar-pelicula.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard] },
  { path: 'pelicula/:id', component: DetallePeliculaComponent, canActivate: [authGuard] },
  { path: 'agregar-pelicula', component: AgregarPeliculaComponent, canActivate: [authGuard] },
  { path: 'editar-pelicula/:id', component: EditarPeliculaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];