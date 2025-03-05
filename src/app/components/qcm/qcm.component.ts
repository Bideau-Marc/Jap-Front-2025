import { Component, Input, OnInit } from '@angular/core';
import { Exercice } from '../../model/exercice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qcm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcm.component.html',
  styleUrl: './qcm.component.css'
})
export class QCMComponent implements OnInit {
  @Input() exercices: Exercice[] = [];

  ngOnInit(): void {
    console.log(this.exercices);

  }
  checkAnswer(exercice: Exercice, answer: string) {
    exercice.userAnswer = answer;
    console.log(exercice);

  }
}
