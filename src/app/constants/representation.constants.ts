// src/app/core/constants/representation.constants.ts
export const LANGUAGE_MAPPING: { [key: string]: string[] } = {
    japonais: ['japaneseWord.kanji', 'japaneseWord.hiragana', 'japaneseWord.katakana', 'japaneseWord.romaji'],
    Chinois: ['chineseWord.sinogramme', 'representation.chineseWord.pinyin'],
    Coréen: ['koreanWord.hangeul', 'koreanWord.romaja'],
    Arabe: ['arabicWord.arabic', 'arabicWord.arabizi'],
    Cyrillique: ['cyrillicWord.cyrillic', 'cyrillicWord.RomanisationCyrillic'],
    Devanagari: ['devanagariWord.devanagari', 'devanagariWord.romanisationDevanagari'],
    Grec: ['greekWord.greek', 'greekWord.romanisationGreek'],
    Thai: ['thaiWord.thai', 'thaiWord.romanisationThai'],
    Georgian: ['georgianWord.georgian', 'georgianWord.romanisationGeorgian'],
    Arménien: ['armenianWord.armenian', 'armenianWord.romanisationArmenian']
}; 