import { Representation } from "./representation"
import { Theme } from "./theme"

export interface Exercices {
    id: string;
    type: ExerciceType;
    question: string;
    correctAnswer: boolean; // Ou un tableau si plusieurs bonnes réponses possibles
    choices?: string[];
    blank?: string;
    //hints?: string[];
    userAnswer?: string; // Réponse de l'utilisateur
}
enum ExerciceType {
    QCM = 'qcm',
    FillInTheBlank = 'fillInTheBlank',
    Traduction = 'traduction',
}