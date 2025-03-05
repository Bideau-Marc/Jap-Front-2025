import { Component, OnInit } from '@angular/core';
import { Theme } from '../../model/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from '../../services/words/words.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Words } from '../../model/words';
import { Exercice, ExerciceType } from '../../model/exercice';
import { ExercicesService } from '../../services/exercices/exercices.service';
import { ExerciceFillInTheBlankComponent } from '../exercice-fill-in-the-blank/exercice-fill-in-the-blank.component';
import { QCMComponent } from '../qcm/qcm.component';
import { TranslationComponent } from '../translation/translation.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, ExerciceFillInTheBlankComponent, QCMComponent, TranslationComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
  providers: [WordsService]
})
export class ExercisesComponent implements OnInit {
  idtheme: number = 0;
  nametheme: string = "";
  languagetheme: string = "";
  theme!: Theme;
  words!: Words[];
  exercices: Exercice[] = [];
  typeExercice!: ExerciceType;
  ExerciceType = ExerciceType;
  corrected: boolean = false;
  replayed: boolean = false; // boolean for restarting exercises
  constructor(private route: ActivatedRoute, private wordsService: WordsService, private exercicesService: ExercicesService, private router: Router) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(({ id, name, language }) => {
      this.idtheme = id;
      this.nametheme = name;
      this.languagetheme = language;
      this.theme = { id: this.idtheme, name: this.nametheme, language: this.languagetheme };
      this.wordsService.getWordByTheme(this.theme).subscribe(words => {
        this.words = words


      })
    });

  }

  selectExercise(type: ExerciceType) {
    this.typeExercice = type;
    console.log(this.typeExercice, this.exercices);
    this.exercices = this.exercicesService.generateExos(this.typeExercice, this.words);
    console.log(this.exercices, this.exercicesService.generateExos(this.typeExercice, this.words));

  }
  isAllAnswered(): boolean {
    if (this.exercices.length === 0) { return false; }
    // Vérifie que chaque exercice a une réponse non vide
    return this.exercices.every(exercice => {
      if (Array.isArray(exercice.userAnswer)) {
        // Si userAnswer est un tableau, on vérifie qu'il n'est pas vide
        return exercice.userAnswer.length > 0;
      } else {
        // Si userAnswer est une string, on vérifie qu'elle n'est pas vide
        return exercice.userAnswer && exercice.userAnswer.trim() !== '';
      }
    });
  }
  goToCorrection() {
    this.exercicesService.correctionExercices(this.typeExercice, this.exercices);
    this.corrected = true;
  }

  replay() {
    this.exercices = this.exercicesService.generateExos(this.typeExercice, this.words);
    this.corrected = false;

  }
  changeExerciceType() {
    this.replayed = true;
    this.corrected = false;
    this.corrected = false;
    this.exercices = [];
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
}
