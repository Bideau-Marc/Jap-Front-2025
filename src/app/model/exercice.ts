import { Theme } from './theme';

export interface Exercice {
    id: number;
    question: string; // What is the corresponding form of "tanuki" in french?
    type: ExerciceType; // QCM, Fill-in-the-blank, translation ...
    choices?: string[]; // ["狸", "ウシ", "鹿", "ニワトリ"]
    realAnswer: string | string[]; // "狸" or ["tanuki", "狸"]
    userAnswer: string | string[]; // "狸" or ["tanuki", "狸"]
    theme: Theme; // { id: 1, name: "Animaux", language: "japonais" }
    isCorrect?: boolean | 'pending';
}

export enum ExerciceType {
    QCM = 'QCM',
    'Fill-in-the-blank' = 'Fill-in-the-blank',
    translation = 'translation'
}
