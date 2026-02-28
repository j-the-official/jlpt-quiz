import { QuestionType } from './question-type.enum';

interface QuestionBase {
  id: string;
  type: QuestionType;
  year: number;
  month: number;
  questionNumber: number;
  explanation?: string;
  tags?: string[];
}

export interface Mondai1Question extends QuestionBase {
  type: QuestionType.MONDAI_1;
  sentence: string;
  targetWord: string;
  targetReading: string;
  choices: [string, string, string, string];
  correctIndex: number;
}

export interface Mondai2Question extends QuestionBase {
  type: QuestionType.MONDAI_2;
  sentence: string;
  choices: [string, string, string, string];
  correctIndex: number;
}

export interface Mondai3Question extends QuestionBase {
  type: QuestionType.MONDAI_3;
  sentence: string;
  targetWord: string;
  choices: [string, string, string, string];
  correctIndex: number;
}

export interface Mondai4Question extends QuestionBase {
  type: QuestionType.MONDAI_4;
  targetWord: string;
  sentenceChoices: [string, string, string, string];
  correctIndex: number;
}

export interface Mondai5Question extends QuestionBase {
  type: QuestionType.MONDAI_5;
  sentence: string;
  choices: [string, string, string, string];
  correctIndex: number;
}

export interface Mondai6Question extends QuestionBase {
  type: QuestionType.MONDAI_6;
  sentenceTemplate: string;
  starPosition: number;
  fragments: [string, string, string, string];
  correctOrder: [number, number, number, number];
  correctStarIndex: number;
}

export interface Mondai7Blank {
  blankNumber: number;
  choices: [string, string, string, string];
  correctIndex: number;
  explanation?: string;
}

export interface Mondai7Question extends QuestionBase {
  type: QuestionType.MONDAI_7;
  passageTitle?: string;
  passage: string;
  blanks: Mondai7Blank[];
}

export type Question =
  | Mondai1Question
  | Mondai2Question
  | Mondai3Question
  | Mondai4Question
  | Mondai5Question
  | Mondai6Question
  | Mondai7Question;

export interface QuestionBank {
  type: QuestionType;
  version: number;
  lastUpdated: string;
  questions: Question[];
}
