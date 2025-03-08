import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Theme } from '../../model/theme';
import { Words } from '../../model/words';
import { JapaneseWord } from '../../model/JapaneseWord';
import { ChineseWord } from '../../model/ChineseWord';
import { KoreanWord } from '../../model/KoreanWord';
import { ArabicWord } from '../../model/ArabicWords';
import { DevanagariWord } from '../../model/DevanagariWord';
import { ArmenianWord } from '../../model/ArmenianWord';
import { GeorgianWord } from '../../model/GeorgianWord';
import { ThaiWord } from '../../model/ThaiWord';
import { GreekWord } from '../../model/GreeKWord';
import { Representation } from '../../model/representation';
type AvailableType = keyof JapaneseWord | keyof ChineseWord | keyof KoreanWord | keyof ArabicWord | keyof DevanagariWord | keyof GreekWord | keyof ThaiWord | keyof GeorgianWord | keyof ArmenianWord;

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private apiUrl = environment.apiUrl + '/words/';  // Remplace par l'URL de ton API backend

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les thèmes
  getwordsByTheme(theme: Theme): Observable<Words[]> {
    console.log(`${this.apiUrl}search?theme=${theme.name}&language=${theme.language}`);

    return this.http.get<Words[]>(`${this.apiUrl}search?theme=${theme.name}&language=${theme.language}`);

  }

  getWordByTheme(theme: Theme): Observable<Words[]> {
    return this.getwordsByTheme(theme).pipe(
      map(data => {
        this.generateChoices(data);
        return data;
      })
    );
  }
  /**
 * This method retrieves the representation of a word for a specific language.
 * It uses a mapping between the language and the corresponding key in the `representation`
 * property of the `Words` object. Then, it calls a generic method to obtain the available representation
 * types for the given word.
 *
 * @param word - The word for which we want to get the representation.
 * @returns An object containing two properties:
 *  - `representation`: The representation object corresponding to the word's language.
 *  - `availableTypes`: An array of available representation types for the word.
 */
  getRepresentation(word: Words) {
    // Mapping languages to corresponding keys in the representation object
    const languageMapping: { [key: string]: keyof Words['representation'] } = {
      japonais: 'japaneseWord',
      Chinois: 'chineseWord',
      Coréen: 'koreanWord',
      Arabe: 'arabicWord',
      Cyrillique: 'cyrillicWord',
      Devanagari: 'devanagariWord',
      Grec: 'greekWord',
      Thai: 'thaiWord',
      Georgian: 'georgianWord',
      Arménien: 'armenianWord'
    };

    // Retrieve the corresponding language key from the languageMapping
    const languageKey = languageMapping[word.theme.language];

    // If the language is not in the mapping, return a default value
    if (!languageKey) {
      console.warn(`Unknown language: ${word.theme.language}`);
      return { representation: {}, availableTypes: [] };
    }

    // Retrieve the representation corresponding to the language
    const representation = word.representation[languageKey];

    // Retrieve the available types with the generic method
    const availableTypes = this.getWordRepresentation(word, languageKey);

    return { representation, availableTypes };
  }


  /**
 * This method generates choices for each word based on the given words array.
 * It selects a random word for each target word and creates a list of choices for each word.
 * The choices include the word from the target language, along with shuffled words chosen from the other words.
 *
 * @param words - An array of words from/in which the choices will be generated.
 */
  generateChoices(words: Words[]) {
    let randomKey: AvailableType;
    let length: number;
    let shuffledWords: Words[];

    words.forEach(word => {
      const wordsWithoutWord = words.filter(w => w !== word); // Filter out the current word to avoid selecting it in the choices.

      // Call getRepresentation once to get the representation and available types for the word
      const { representation: wordRepresentation, availableTypes: wordAvailableTypes } = this.getRepresentation(word);

      // If no available types exist for the word, log a warning and skip this word
      if (wordAvailableTypes.length === 0) {
        console.warn(`No representation available for the word: ${word}`);
        return;
      }

      // Select a random representation type from the available types
      randomKey = wordAvailableTypes[Math.floor(Math.random() * wordAvailableTypes.length)];

      // Assign the corresponding choice to the word
      if (wordRepresentation[randomKey]) word.choices = [wordRepresentation[randomKey]!];

      // Determine the number of choices: 3 choices maximum, or the remaining words if less than 3
      length = Math.min(3, wordsWithoutWord.length);

      // Shuffle the remaining words randomly and take the first 3 words
      shuffledWords = wordsWithoutWord.sort(() => 0.5 - Math.random()).slice(0, length);

      // For each shuffled word, get its representation and add it to the choices
      shuffledWords.forEach(otherWord => {
        const { representation: otherWordRepresentation } = this.getRepresentation(otherWord);
        randomKey = wordAvailableTypes[Math.floor(Math.random() * wordAvailableTypes.length)];

        const otherLanguageWord = otherWordRepresentation[randomKey];

        if (otherLanguageWord) word.choices.push(otherLanguageWord);
      });
    });

    console.log(words); // Log the words with generated choices for debugging
  }


  /**
 * This method generates the available keys for a given representation object.
 * It returns an array of keys that can be used to access different properties
 * of a word's representation.
 *
 * @param word - The word for which we want to get the representation keys.
 * @param representationKey - The specific key of the representation object in `word.representation`.
 * @returns An array of available keys in the representation object.
 */
  getWordRepresentation(word: Words, representationKey: keyof Words['representation']) {
    // Retrieve the corresponding representation object
    const representation = word.representation[representationKey];

    // Return the keys of this object (rather than the whole object)
    return Object.keys(representation) as (keyof typeof representation)[];
  }

  removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
