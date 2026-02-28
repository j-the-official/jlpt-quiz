import { QuestionType } from './question-type.enum';

export interface QuestionAttempt {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  timestamp: number;
}

export interface QuestionTypeProgress {
  type: QuestionType;
  totalAttempted: number;
  totalCorrect: number;
  attempts: QuestionAttempt[];
  wrongQuestionIds: string[];
}

export interface UserProgress {
  version: number;
  lastActivity: number;
  progress: Record<string, QuestionTypeProgress>;
}

export interface WrongAnswerEntry {
  questionId: string;
  questionType: QuestionType;
  wrongCount: number;
  lastWrong: number;
  lastReviewed: number;
  nextReview: number;
}
