import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageThemeService } from '../../services/langage-theme/language-theme.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Theme } from '../../model/theme';
import { ExercisesComponent } from '../exercises/exercises.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, ExercisesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [LanguageThemeService]
})
export class HomePageComponent {
  title = 'Bienvenue sur la page d\'accueil';
  selectedTheme: Theme = { id: 1, name: '', language: '' };     // Variable pour stocker le thème sélectionné
  themes: Theme[] = [];
  filteredThemes: Theme[] = [];
  languages: any = [];
  constructor(private themeService: LanguageThemeService, private router: Router) { }

  ngOnInit(): void {
    this.loadThemesAndLanguages();//aoaak,
  }

  loadThemesAndLanguages(): void {
    this.themeService.getThemes().subscribe(
      data => {
        console.log(data);
        this.languages = [... new Set(data.map(theme => theme.language))];
        this.themes = data;
        console.log(this.themes, "language", this.languages);

      },
      error => {
        console.error('Erreur lors du chargement des thèmes', error);
      }
    );
  }
  onLanguageChange(event: Event) {
    // Filtrer les thèmes selon le langage sélectionné
    const target = event.target as HTMLSelectElement;
    const language = target.value;

    // Filtrer les thèmes selon le langage sélectionné
    this.filteredThemes = this.themes.filter(theme => theme.language === language);
  }

  onThemesChange(even: Event) {
    const target = event?.target as HTMLSelectElement;
    const tempTheme = this.themes.find(t => t.id === parseInt(target.value));

    if (tempTheme) {
      this.selectedTheme = { ...tempTheme };
    }
  }

  // Méthode appelée lorsque l'utilisateur clique sur le bouton
  startExercise() {
    // Vérification que les deux sélections sont faites
    console.log(JSON.stringify(this.selectedTheme) != JSON.stringify({ "id": 1, "name": "", "language": "" }), this.selectedTheme);

    if (JSON.stringify(this.selectedTheme) != JSON.stringify({ "id": 1, "name": "", "language": "" })) {

      // Redirige l'utilisateur vers la page des exercices avec les paramètres sélectionnés
      this.router.navigate(['/exercises'], {
        queryParams: {
          id: this.selectedTheme.id,
          language: this.selectedTheme.language,
          name: this.selectedTheme.name
        }
      });
    } else {
      console.log(this.themes);
      ;
    }
  }
}
