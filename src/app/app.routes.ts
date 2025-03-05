import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ExercisesComponent } from './components/exercises/exercises.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'exercises', component: ExercisesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }  // Redirection vers 'home' par défaut

];
