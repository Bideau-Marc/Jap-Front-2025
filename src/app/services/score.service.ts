import { Injectable } from '@angular/core';
import { Score } from '../model/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private score: Score;
  constructor() {
    const storedScore = JSON.parse(localStorage.getItem('score') || '0');
    this.score = new Score(storedScore, 0);
  }

  getScore(): Score {
    return this.score;
  }
  // Mettre à jour le score de la session précédente
  incrementCurrentSessionScore() {
    this.score.incrementCurrentSessionScore();

  }

  // Réinitialiser les scores
  resetScores() {
    this.score.reset();
  }

  // Sauvegarder les scores dans le localStorage
  saveScore() {
    localStorage.setItem('score', JSON.stringify(this.score.currentSessionScore));
  }
}
