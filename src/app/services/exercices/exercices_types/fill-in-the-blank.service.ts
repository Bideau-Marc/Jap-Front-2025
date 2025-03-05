import { Injectable } from '@angular/core';
import { Exercice, ExerciceType } from '../../../model/exercice';
import { Words } from '../../../model/words';
import { LANGUAGE_MAPPING } from '../../../constants/representation.constants';
import { ScoreService } from '../../score.service';

@Injectable({
  providedIn: 'root'
})
export class FillInTheBlankService {

  constructor(private scoreService: ScoreService) { }
  // Mappage avec sous-propriétés pour chaque langue
  languageMapping = LANGUAGE_MAPPING;
  generateFillInTheBlank(listWords: Words[]): Exercice[] {
    let listExercices: Exercice[] = [];
    let shuffledWords = [...listWords].sort(() => Math.random() - 0.5);
    // Prend les 5 premiers mots du tableau mélangé (ou moins si moins de 5 mots)
    shuffledWords = shuffledWords.slice(0, 5);
    shuffledWords.forEach(word => {
      let { key, value } = this.getRealAnswer(word);
      console.log("obj", key, value);
      let fillInTheBlank: Exercice = {
        id: word.id,
        question: word.exemple + " : (en  " + key + ")",
        realAnswer: value,
        type: ExerciceType['Fill-in-the-blank'],
        theme: word.theme,
        userAnswer: "",
        isCorrect: "pending"
      }
      listExercices.push(fillInTheBlank);

    });

    console.log(listExercices);
    return listExercices;
  }

  correctionFillInTheBlank(exercices: Exercice[]): Exercice[] {
    exercices.forEach(exercice => {
      console.log(exercice.realAnswer, exercice.userAnswer);

      if (exercice.realAnswer === exercice.userAnswer) {
        exercice.isCorrect = true;
        this.scoreService.incrementCurrentSessionScore();
      } else {
        exercice.isCorrect = false;
      }
    });
    return exercices;
  }

  // Fonction améliorée pour générer la réponse réelle
  getRealAnswer(wordData: any): { key: string, value: string } {
    const { representation } = wordData;
    const language = wordData.theme.language;

    // Récupérer les propriétés à utiliser selon la langue
    const properties = this.languageMapping[language];

    if (!properties) {
      console.warn(`Langue non supportée : ${language}`);
      return { key: "", value: "" };
    }

    let keyPropertie = "";
    const randomIndex = Math.floor(Math.random() * properties.length);
    // Récupération des clés "objet"/"key"
    const [parentKey, childKey] = properties[randomIndex].split('.');
    keyPropertie = childKey;

    // Vérification et récupération de la valeur
    const parentObject = representation[parentKey];
    const value = parentObject ? parentObject[childKey] : undefined;

    if (value && keyPropertie) {
      return { key: keyPropertie, value: value };
    }
    console.warn(`erreur lors de la récupération de la valeur pour la clé ${keyPropertie}`);
    return { key: "", value: "" };
  };
}
