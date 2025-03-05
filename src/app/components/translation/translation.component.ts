import { Component, Input, input, OnInit } from '@angular/core';
import { Exercice } from '../../model/exercice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})
export class TranslationComponent implements OnInit {
  @Input() exercices: Exercice[] = [];

  ngOnInit(): void {
    console.log("here", this.exercices);

  }
  check() {
    console.log("check", this.exercices);
  }
};

