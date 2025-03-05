import { JapaneseWord } from "./JapaneseWord";
import { ChineseWord } from "./ChineseWord";
import { KoreanWord } from "./KoreanWord";
import { ArabicWord } from "./ArabicWords";
import { CyrillicWord } from "./CyrillicWord";
import { DevanagariWord } from "./DevanagariWord";
import { GreekWord } from "./GreeKWord";
import { ThaiWord } from "./ThaiWord";
import { GeorgianWord } from "./GeorgianWord";
import { ArmenianWord } from "./ArmenianWord";
export interface Representation {

    // id: number,
    chineseWord: ChineseWord,
    japaneseWord: JapaneseWord,
    koreanWord: KoreanWord,
    arabicWord: ArabicWord,
    latin: string,
    cyrillicWord: CyrillicWord,
    devanagariWord: DevanagariWord,
    greekWord: GreekWord,
    thaiWord: ThaiWord,
    georgianWord: GeorgianWord,
    armenianWord: ArmenianWord,
    // word: string
}
