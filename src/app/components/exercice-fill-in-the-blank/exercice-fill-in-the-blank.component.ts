import { Component, Input } from '@angular/core';
import { Exercice } from '../../model/exercice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercice-fill-in-the-blank',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercice-fill-in-the-blank.component.html',
  styleUrl: './exercice-fill-in-the-blank.component.css'
})
export class ExerciceFillInTheBlankComponent {
  @Input() exercices: Exercice[] = [];


}
