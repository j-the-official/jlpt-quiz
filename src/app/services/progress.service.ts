import { Injectable, signal, computed } from '@angular/core';
import { QuestionType } from '../models/question-type.enum';
import { UserProgress, QuestionTypeProgress, QuestionAttempt } from '../models/progress.model';

const STORAGE_KEY = 'jlpt-n1-progress';

function createEmptyTypeProgress(type: QuestionType): QuestionTypeProgress {
  return { type, totalAttempted: 0, totalCorrect: 0, attempts: [], wrongQuestionIds: [] };
}

function createEmptyProgress(): UserProgress {
  const progress: Record<string, QuestionTypeProgress> = {};
  for (const type of Object.values(QuestionType)) {
    progress[type] = createEmptyTypeProgress(type);
  }
  return { version: 1, lastActivity: Date.now(), progress };
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private state = signal<UserProgress>(this.loadFromStorage());

  readonly progressByType = computed(() => this.state().progress);

  readonly overallStats = computed(() => {
    const p = this.state().progress;
    let total = 0, correct = 0;
    for (const tp of Object.values(p)) {
      total += tp.totalAttempted;
      correct += tp.totalCorrect;
    }
    return { total, correct, accuracy: total > 0 ? correct / total : 0 };
  });

  readonly weakAreas = computed(() => {
    const p = this.state().progress;
    return Object.values(p)
      .filter(tp => tp.totalAttempted >= 3 && (tp.totalCorrect / tp.totalAttempted) < 0.6)
      .sort((a, b) => (a.totalCorrect / a.totalAttempted) - (b.totalCorrect / b.totalAttempted));
  });

  getTypeProgress(type: QuestionType): QuestionTypeProgress {
    return this.state().progress[type] ?? createEmptyTypeProgress(type);
  }

  getTypeAccuracy(type: QuestionType): number {
    const tp = this.getTypeProgress(type);
    return tp.totalAttempted > 0 ? tp.totalCorrect / tp.totalAttempted : 0;
  }

  recordAttempt(questionId: string, type: QuestionType, selectedIndex: number, correct: boolean): void {
    const current = this.state();
    const typeProgress = { ...(current.progress[type] ?? createEmptyTypeProgress(type)) };

    const attempt: QuestionAttempt = {
      questionId,
      selectedIndex,
      correct,
      timestamp: Date.now(),
    };

    typeProgress.totalAttempted++;
    if (correct) {
      typeProgress.totalCorrect++;
      typeProgress.wrongQuestionIds = typeProgress.wrongQuestionIds.filter(id => id !== questionId);
    } else {
      if (!typeProgress.wrongQuestionIds.includes(questionId)) {
        typeProgress.wrongQuestionIds = [...typeProgress.wrongQuestionIds, questionId];
      }
    }
    typeProgress.attempts = [...typeProgress.attempts, attempt];

    const newProgress = { ...current.progress, [type]: typeProgress };
    this.state.set({ ...current, lastActivity: Date.now(), progress: newProgress });
    this.saveToStorage();
  }

  resetProgress(): void {
    this.state.set(createEmptyProgress());
    this.saveToStorage();
  }

  private loadFromStorage(): UserProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return createEmptyProgress();
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
  }
}
