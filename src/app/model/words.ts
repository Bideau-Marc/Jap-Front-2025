import { Representation } from "./representation";
import { Theme } from "./theme";

export interface Words {
    id: number,
    translation: string,
    exemple: string,
    theme: Theme,
    representation: Representation
    choices: string[];//choice for qcm 
}