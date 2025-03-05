import { Injectable } from '@angular/core';
import { Exercice, ExerciceType } from '../../model/exercice';
import { Words } from '../../model/words';
import { QcmService } from './exercices_types/qcm.service';
import { FillInTheBlankService } from './exercices_types/fill-in-the-blank.service';
import { TranslationService } from './exercices_types/translation.service';

@Injectable({
  providedIn: 'root'
})
export class ExercicesService {
  readonly nbExos: number = 5;
  constructor(private qcmService: QcmService, private fillInTheBlankService: FillInTheBlankService, private translationService: TranslationService) { }

  generateExos(type: ExerciceType, words: Words[]): Exercice[] {
    console.log("generateExos", type, words);

    switch (type) {
      case ExerciceType.QCM:
        return this.qcmService.generateQcm(words);
        break;
      case ExerciceType['Fill-in-the-blank']:
        return this.fillInTheBlankService.generateFillInTheBlank(words);
        break;
      case ExerciceType.translation:
        let a = this.translationService.generateTranslation(words);
        console.log("a", a);
        return a;
        break;
      default:
        break;
    }
    return [];
  }


  correctionExercices(type: ExerciceType, exercices: Exercice[]): Exercice[] {
    console.log("correctionExercices", type, exercices);

    switch (type) {
      case ExerciceType.QCM:
        return this.qcmService.correctionQcm(exercices);
        break;
      case ExerciceType['Fill-in-the-blank']:
        return this.fillInTheBlankService.correctionFillInTheBlank(exercices);
        break;
      case ExerciceType.translation:
        return this.translationService.correctionTranslation(exercices);
        break;
      default:
        break;
    }
    return [];
  }
}
