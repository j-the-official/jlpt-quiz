import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { QuestionType, QUESTION_TYPES } from '../models/question-type.enum';
import { Question, QuestionBank } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private http = inject(HttpClient);
  private cache = new Map<QuestionType, Observable<QuestionBank>>();

  loadQuestions(type: QuestionType): Observable<QuestionBank> {
    if (!this.cache.has(type)) {
      const info = QUESTION_TYPES.find(t => t.type === type);
      if (!info) throw new Error(`Unknown question type: ${type}`);
      const obs = this.http.get<QuestionBank>(info.dataFile).pipe(shareReplay(1));
      this.cache.set(type, obs);
    }
    return this.cache.get(type)!;
  }

  getQuestions(type: QuestionType, options?: {
    year?: number;
    shuffle?: boolean;
    excludeIds?: string[];
  }): Observable<Question[]> {
    return this.loadQuestions(type).pipe(
      map(bank => {
        let questions = [...bank.questions];
        if (options?.year) {
          questions = questions.filter(q => q.year === options.year);
        }
        if (options?.excludeIds?.length) {
          const excludeSet = new Set(options.excludeIds);
          questions = questions.filter(q => !excludeSet.has(q.id));
        }
        if (options?.shuffle) {
          for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
          }
        }
        return questions;
      }),
    );
  }

  getQuestionById(type: QuestionType, id: string): Observable<Question | undefined> {
    return this.loadQuestions(type).pipe(
      map(bank => bank.questions.find(q => q.id === id)),
    );
  }
}
