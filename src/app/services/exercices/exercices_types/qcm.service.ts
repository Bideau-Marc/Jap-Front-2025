import { Injectable } from '@angular/core';
import { Words } from '../../../model/words';
import { Exercice } from '../../../model/exercice';
import { ExerciceType } from '../../../model/exercice';
import { LANGUAGE_MAPPING } from '../../../constants/representation.constants';
import { ScoreService } from '../../score.service';
@Injectable({
  providedIn: 'root'
})
export class QcmService {

  constructor(private scoreService: ScoreService) { }

  generateQcm(listWords: Words[]): Exercice[] {
    let listExercices: Exercice[] = [];

    // Mélange les mots pour avoir un choix aléatoire
    let shuffledWords = [...listWords].sort(() => Math.random() - 0.5);

    // Prend les 5 premiers mots du tableau mélangé (ou moins si moins de 5 mots)
    let selectedWords = shuffledWords.slice(0, 5);

    selectedWords.forEach(word => {
      let qcm: Exercice = {
        id: word.id,
        question: "Quel est la traduction de : " + word.translation + " en " + word.theme.language + " ?",
        realAnswer: this.getRealAnswer(word),
        type: ExerciceType.QCM,
        theme: word.theme,
        userAnswer: "",
        choices: word.choices,
        isCorrect: "pending"
      }
      listExercices.push(qcm);
    });

    console.log(listExercices);
    return listExercices;
  }


  // Mappage avec sous-propriétés pour chaque langue
  languageMapping = LANGUAGE_MAPPING;


  // Fonction améliorée pour générer la réponse réelle
  getRealAnswer(wordData: any): string[] {
    const { representation } = wordData;
    const language = wordData.theme.language;
    console.log(language, representation, wordData.theme.language);

    // Récupérer les propriétés à utiliser selon la langue
    const properties = this.languageMapping[language];

    if (!properties) {
      console.warn(`Langue non supportée : ${language}`);
      return [];
    }

    let realAnswer: string[] = [];

    // Parcourir les propriétés et ajouter les valeurs correspondantes
    properties.forEach((path) => {
      const keys = path.split('.'); // Gérer les chemins imbriqués comme 'japaneseWord.kanji'
      let value = representation;

      // Naviguer dans l'objet en suivant le chemin
      keys.forEach((key) => {
        if (value) {
          value = value[key];
        }
      });

      // Ajouter à realAnswer si la valeur existe
      if (value) {
        realAnswer.push(value);
      }
    });

    return realAnswer;
  };




  correctionQcm(exercices: Exercice[]): Exercice[] {
    exercices.forEach(exercice => {

      if (Array.isArray(exercice.userAnswer)) {
        // Si userAnswer est un tableau, on vérifie que chaque élément est correct
        exercice.isCorrect = exercice.userAnswer.every(answer => exercice.realAnswer.includes(answer));
      } else {
        // Si userAnswer est une string, on vérifie qu'elle est correcte
        console.log('array', exercice.realAnswer.includes(exercice.userAnswer));

        exercice.isCorrect = exercice.realAnswer.includes(exercice.userAnswer);
        if (exercice.isCorrect) this.scoreService.incrementCurrentSessionScore();

      }
    });
    console.log(this.scoreService.getScore());

    return exercices;
  }
}
