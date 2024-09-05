import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Accueil', component: HomeComponent },
  { path: 'login', title: 'Connexion', component: LoginComponent },
  { path: 'register', title: 'Inscription', component: RegisterComponent },
  { path: 'playlists', title: 'Mes playlists', component: PlaylistsComponent },
  { path: '**', redirectTo: '/home' },
];
