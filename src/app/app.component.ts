import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Score } from './model/score';
import { ScoreService } from './services/score.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'site_jap';
  score: Score = new Score(0, 0);

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    // Initialisation de la variable score dans ngOnInit
    this.score = this.scoreService.getScore();
  }

  ngOnDestroy(): void {
    // Sauvegarde des données avant destruction
    if (this.score) {
      this.scoreService.saveScore();
    }
  }
}
