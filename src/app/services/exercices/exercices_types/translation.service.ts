import { Injectable } from '@angular/core';
import { Words } from '../../../model/words';
import { Exercice, ExerciceType } from '../../../model/exercice';
import { LANGUAGE_MAPPING } from '../../../constants/representation.constants';
import { Representation } from '../../../model/representation';
import { ScoreService } from '../../score.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private scoreService: ScoreService) { }

  // Mappage avec sous-propriétés pour chaque langue
  languageMapping = LANGUAGE_MAPPING;


  generateTranslation(listWords: Words[]): Exercice[] {
    console.log("generateTranslation", listWords);
    let listExercices: Exercice[] = [];
    // Mélange les mots pour avoir un choix aléatoire
    let shuffledWords = [...listWords].sort(() => Math.random() - 0.5);
    // Prend les 5 premiers mots du tableau mélangé (ou moins si moins de 5 mots)
    shuffledWords = shuffledWords.slice(0, 5);
    shuffledWords.forEach(word => {
      let { value, key } = this.getRepresentation(word);
      let exercice: Exercice = {
        id: word.id,
        question: "Quelle est la traduction de : " + word.translation + " en " + word.theme.language + " ? (en " + " " + key + ")",
        realAnswer: value,
        type: ExerciceType.translation,
        theme: word.theme,
        userAnswer: "",
        isCorrect: "pending"
      };
      listExercices.push(exercice);

    });

    return listExercices;
  }

  getRepresentation(word: Words): { key: string, value: string } {

    const { representation } = word;
    const language = word.theme.language;

    // Récupérer les propriétés à utiliser selon la langue
    const properties = this.languageMapping[language];

    if (!properties) {
      console.warn(`Langue non supportée : ${language}`);
      return { key: "", value: "" };;
    }

    let realAnswer: string = "";

    // Choisir aléatoirement une clé parmi les clés disponibles
    const propertie = properties[Math.floor(Math.random() * properties.length)].split('.');
    let wordType = representation[propertie[0] as keyof Representation];
    let key = propertie[1];
    if (wordType && typeof wordType === 'object') {
      realAnswer = wordType[propertie[1] as keyof typeof wordType];
    } else if (typeof wordType === 'string') {
      realAnswer = wordType;
    } else {
      console.warn("La donnée n'est pas un objet ou est absente.");
    }
    console.log(representation[propertie[0] as keyof Representation], representation, propertie);

    return { key: key, value: realAnswer };;
  }
  correctionTranslation(exercices: Exercice[]): Exercice[] {
    exercices.forEach(exercice => {
      if (exercice.realAnswer === exercice.userAnswer) {
        exercice.isCorrect = true;
        this.scoreService.incrementCurrentSessionScore();
      } else {
        exercice.isCorrect = false;
      }
    });
    console.log(this.scoreService.getScore());

    return exercices;
  }
}
